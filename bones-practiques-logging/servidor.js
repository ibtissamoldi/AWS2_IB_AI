// servidor.js · API de l'inventari de l'aula
// GET /material[?estat=...]   GET /material/<id>   POST /prestecs

const crypto = require("node:crypto");

const http = require("node:http");
const material = require("./material");
const logger = require("./logger");

const PORT = Number(process.env.PORT ?? 3000);
const TOKEN = process.env.TOKEN ?? "aula-2026";

// A l'arrencada es pot llegir amb *Sync: encara no hi ha cap petició esperant
let inventari = material.llegir();

function enviar(res, status, dades) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(dades));
}

// Els errors amb status són culpa de la petició (400, 404, 409...); la resta, un error nostre
function enviarError(req, res, err) {
  if (err.status) {
    enviar(res, err.status, { error: err.message });
  } else {
    req.log.error({ err }, "error inesperat");
    enviar(res, 500, { error: "Error intern", ref: req.id });
  }
}

function prestec(req, res, cos) {
  if (req.headers.authorization !== `Bearer ${TOKEN}`) {
    return enviar(res, 401, { error: "Cal un token vàlid" });
  }
  const { id, persona } = JSON.parse(cos);
  if (!persona || !persona.email) {
    return enviar(res, 400, { error: "Falta el correu electrònic" });
  }
  // Només es presta a correus del centre
  if (!persona.email.endsWith("@institut.cat")) {
    return enviar(res, 403, { error: "Només per a correus del centre" });
  }
  const nou = material.prestar(inventari, id, persona.nom);
  material.desarAsync(nou, (err) => {
    if (err) return enviarError(req, res, err);
    inventari = nou;
    req.log.info({ id }, "préstec registrat");
    enviar(res, 201, material.cercar(inventari, id));
  });
}

const servidor = http.createServer((req, res) => {
  const inici = performance.now();
  req.id = req.headers["x-request-id"] ?? crypto.randomUUID();
  req.log = logger.child({ reqId: req.id });
  res.setHeader("X-Request-Id", req.id);

  res.on("finish", () => {
    const ms = Math.round(performance.now() - inici);
    const estat = res.statusCode;
    const dades = { metode: req.method, ruta: req.url, estat, ms,
    };

    const nivell = estat >= 500 ? "error" : estat >= 400 ? "warn" : "info";
    req.log[nivell](dades, "petició atesa");
  });

  const url = new URL(req.url, "http://localhost");
  const parts = url.pathname.split("/").filter(Boolean);

  try {
    if (req.method === "GET" && url.pathname === "/material") {
      const estat = url.searchParams.get("estat");
      return enviar(res, 200, estat ? inventari.filter((m) => m.estat === estat) : inventari);
    }
    if (req.method === "GET" && parts[0] === "material" && parts.length === 2) {
      return enviar(res, 200, material.cercar(inventari, parts[1]));
    }
    if (req.method === "POST" && url.pathname === "/prestecs") {
      let cos = "";
      req.on("data", (tros) => (cos += tros));
      req.on("end", () => {
        try {
          prestec(req, res, cos);
        } catch (err) {
          enviarError(req, res, err);
        }
      });
      return;
    }
    enviar(res, 404, { error: "Ruta no trobada" });
  } catch (err) {
    enviarError(req, res, err);
  }
});

servidor.listen(PORT, () => logger.info({ port: PORT }, "servidor escoltant"));

import http from "node:http";
import { llegir, desar, filtrar, cercar, prestar } from "./material.js";

import crypto from "node:crypto";
import logger from "./logger.js";

let llista = llegir();

function enviar(res, status, dades) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(dades));
}

function enviarError(res, err) {
  if (err.status) {
    return enviar(res, err.status, { error: err.message });
  }
  enviar(res, 500, { error: "Error intern" });
}

const servidor = http.createServer((req, res) => {
  const inici = performance.now();

  req.log = logger.child({ reqId: crypto.randomUUID() });
  res.on("finish", () => {
    const estat = res.statusCode;

    let nivell = "info";

    if (estat >= 500) nivell = "error";
    else if (estat >= 400) nivell = "warn";

    const ms = Math.round(performance.now() - inici);

    const dades = {
      metode: req.method,
      ruta: req.url,
      estat,
      ms,
    };

    req.log[nivell](dades, "petició atesa");
  });
  const url = new URL(req.url, "http://localhost");
  const parts = url.pathname.split("/").filter(Boolean);

  try {
    if (req.method === "GET" && url.pathname === "/material") {
      const estat = url.searchParams.get("estat");
      return enviar(res, 200, filtrar(llista, estat));
    }

    if (req.method === "GET" && parts[0] === "material" && parts.length === 2) {
      const element = cercar(llista, parts[1]);
      return enviar(res, 200, element);
    }

    if (req.method === "POST" && url.pathname === "/prestecs") {
      let cos = "";

      req.on("data", (tros) => (cos += tros));

      req.on("end", () => {
        let dades;

        try {
          dades = JSON.parse(cos);
        } catch {
          return enviar(res, 400, { error: "El cos ha de ser JSON" });
        }

        try {
          const novaLlista = prestar(llista, dades.codi, dades.persona);

          desar(novaLlista, (err) => {
            if (err) {
              req.log.error({ err }, "error inesperat");
              return enviar(res, 500, { error: "Error intern" });
            }

            llista = novaLlista;
            req.log.info({ codi: dades.codi }, "préstec desat");
            const element = cercar(llista, dades.codi);
            enviar(res, 201, element);
          });
        } catch (err) {
          enviarError(res, err);
        }
      });

      return;
    }

    enviar(res, 404, { error: "Ruta no trobada" });
  } catch (err) {
    if (!err.status) {
      req.log.error({ err }, "error inesperat");
    }
    enviarError(res, err);
  }
});

servidor.listen(3000, () => {
  logger.info({ port: 3000 }, "servidor en marxa");
});

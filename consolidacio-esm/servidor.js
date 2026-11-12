import http from "node:http";
import { llegir, desar, filtrar, cercar, prestar } from "./material.js";

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
              return enviar(res, 500, { error: "Error intern" });
            }

            llista = novaLlista;
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
    enviarError(res, err);
  }
});
servidor.listen(3000, () => console.log("Servidor en marxa a http://localhost:3000"));

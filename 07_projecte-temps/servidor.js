import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";

import { tempsDe, comparar } from "./meteo.js";
import { logger } from "./logger.js";

function enviarJSON(res, estat, dades) {
  res.writeHead(estat, {
    "Content-Type": "application/json; charset=utf-8",
  });

  res.end(JSON.stringify(dades));
}

const servidor = createServer(async (req, res) => {
  const reqId = randomUUID();
  const inici = performance.now();

  let estat = 500;
  let errorPeticio;

  try {
    const url = new URL(req.url, "http://localhost");

    if (req.method !== "GET") {
      estat = 404;
      enviarJSON(res, estat, {
        error: "Ruta no trobada",
      });
      return;
    }

    const rutaTemps = url.pathname.match(/^\/temps\/(.+)$/);

    if (rutaTemps) {
      let ciutat;

      try {
        ciutat = decodeURIComponent(rutaTemps[1]);
      } catch {
        estat = 400;
        enviarJSON(res, estat, {
          error: "Nom de ciutat no vàlid",
        });
        return;
      }

      const dades = await tempsDe(ciutat);

      estat = 200;
      enviarJSON(res, estat, dades);
      return;
    }

    if (url.pathname === "/compara") {
      const parametre = url.searchParams.get("ciutats");

      const ciutats = parametre
        ? parametre.split(",").map((ciutat) => ciutat.trim())
        : [];

      if (
        ciutats.length < 2 || ciutats.length > 5 || ciutats.some((ciutat) => !ciutat)
      ) {
        estat = 400;
        enviarJSON(res, estat, {
          error: "Cal indicar entre 2 i 5 ciutats",
        });
        return;
      }

      const dades = await comparar(ciutats);

      estat = 200;
      enviarJSON(res, estat, dades);
      return;
    }

    estat = 404;

    enviarJSON(res, estat, {
      error: "Ruta no trobada",
    });
  } catch (err) {
    estat = err.status ?? 500;
    errorPeticio = err;

    const missatge = estat === 500 ? "Error intern" : err.message;

    enviarJSON(res, estat, {
      error: missatge,
    });
  } finally {
    const ms = Math.round(performance.now() - inici);

    const registre = {
      reqId,
      estat,
      ms,
    };

    if (estat >= 500) {
      logger.error({ ...registre, err: errorPeticio }, "Petició HTTP");
    } else if (estat >= 400) {
      logger.warn(registre, "Petició HTTP");
    } else {
      logger.info(registre, "Petició HTTP");
    }
  }
});

const PORT = process.env.PORT ?? 3000;

servidor.listen(PORT, () => {
  console.log(`Servidor escoltant al port ${PORT}`);
});

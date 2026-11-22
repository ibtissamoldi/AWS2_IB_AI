# El temps de la meva ciutat

Este proyecto permite consultar el tiempo actual de diferentes ciudades utilizando la API de Open-Meteo. Tiene un servidor propio que proporciona una API HTTP y un cliente que permite consultar y comparar ciudades desde el terminal.


El proyecto utiliza Node.js 24, módulos ES, fetch, node:http y pino para los registros.
client.js  →  servidor.js  →  meteo.js  →  Open-Meteo

## Com s'executa

1. Instalar las dependencias:

`npm install`

2. Iniciar el servidor:

`npm start`

El servidor estará disponible en:

`http://localhost:3000`

3. Consultar el tiempo de una ciudad:

En otro terminal, ejecutar:

node client.js temps Barcelona

4. Comparar varias ciudades:

node client.js compara Barcelona Girona Lleida

Se pueden comparar entre 2 y 5 ciudades.

5. Ejecutar las pruebas:

npm test

6. Comprobar el formato del código:

npm run lint

7. Probar las rutas de la API:

Con el servidor iniciado, ejecutar:

npm run prova-api

## L'API

La API dispone de las siguientes rutas:

| Ruta | Respostes |
| --- | --- |
| `GET /temps/<ciutat>` | 200: ciudad encontrada. 404: ciudad inexistente. 502: error al consultar Open-Meteo. |
| `GET /compara?ciutats=A,B,C` | 200: las ciudades ordenadas de más caliente a más fría. 400: si no existen entre 2 y 5 ciudades. 404: si alguna ciudad no existe. 502: si Open-Meteo no responde. |
| Qualsevol altra | 404: ruta no encontrada. 500: «Error intern» si ocurre un error inesperado. |

Ejemplo de respuesta JSON de /temps/Barcelona:

{
  "ciutat": "Barcelona",
  "pais": "ES",
  "temperatura": 18,
  "vent": 12,
  "descripcio": "Parcialment ennuvolat"
}
Los valores meteorológicos del ejemplo son ilustrativos y pueden cambiar según el momento de la consulta.

## Estructura

| Fitxer | Què hi ha |
| --- | --- |
| `meteo.js` | Busca las ciudades mediante la API de geolocalización de Open-Meteo y obtiene los datos meteorológicos. También gestiona los errores y compara varias ciudades utilizando Promise.all. |
| `servidor.js` | Crea el servidor HTTP, gestiona las rutas de la API y devuelve las respuestas en formato JSON. |
| `logger.js` | Configura el sistema de registros utilizando Pino. |
| `client.js` | Permite consultar y comparar ciudades desde el terminal mediante peticiones a nuestra propia API. |
| `meteo.test.js` | Contiene pruebas automatizadas de las funciones meteorológicas utilizando un fetch falso. |
| `codis.js` | Traduce el `weather_code` de Open-Meteo a un texto en catalán (viene hecho) |
| `prova-api.js` | Comprueba las rutas de la API con `npm run prova-api` (viene hecho) |
| `exemples/` | Tres modelos para basarse en ellos (vienen hechos) |
| `package.json` · `eslint.config.mjs` | Configuración del proyecto y de ESLint (vienen hechos) |
| `README.md` · `IA.md` | La documentación del proyecto y cómo he usado la IA |

## Decisions

1. Separación de responsabilidades: el cliente se comunica únicamente con nuestro servidor y no directamente con Open-Meteo. Así cada archivo tiene una función concreta y el proyecto está mejor organizado.

2. Uso de Promise.all: cuando comparamos varias ciudades, utilizamos Promise.all para realizar las consultas simultáneamente, en lugar de esperar a que termine cada una antes de empezar la siguiente.

3. Gestión de errores HTTP: utilizamos diferentes códigos de estado para identificar los problemas. Por ejemplo, 404 cuando una ciudad no existe, 400 cuando no se indican entre 2 y 5 ciudades y 502 cuando falla la comunicación con Open-Meteo.
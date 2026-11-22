# Activitat 7 · Com he fet servir la IA

Eina: ChatGPT (GPT-6)

## 1 · El pla (Pas 1)

**El meu prompt**

Tengo un proyecto de Node.js 24 que utiliza ES Modules ("type": "module").

Utilizo node:http para crear el servidor, fetch nativo para realizar peticiones HTTP, pino para los logs y node:test para los tests.

Quiero desarrollar una aplicación llamada "El temps de la meva ciutat".

La aplicación debe consultar el tiempo actual de diferentes ciudades utilizando Open-Meteo. Tendrá una API propia y un cliente que funcionará desde el terminal.

El cliente se comunicará únicamente con mi API, y el archivo meteo.js será el único que realizará peticiones a Open-Meteo.

La aplicación debe permitir consultar el tiempo de una ciudad y comparar entre 2 y 5 ciudades. También debe gestionar los errores y utilizar Promise.all cuando sea necesario.

Propón un plan de trabajo dividido en pasos pequeños. Indica qué archivos debemos crear, qué responsabilidad tendrá cada archivo y qué debemos comprobar en cada paso.

No escribas todavía ningún código. Primero quiero entender cómo organizar el proyecto.

**El pla que m'ha proposat (resum)**

1. Definir una arquitectura modular separando el cliente de terminal, la API propia y el servicio meteorológico.

2. Preparar la configuración del proyecto y organizar los archivos y carpetas.

3. Crear un módulo para gestionar las ciudades y sus coordenadas.

4. Crear meteo.js para consultar Open-Meteo, interpretar los datos y gestionar los errores.

5. Crear logger.js y errors.js para centralizar los registros y los errores.

6. Crear el servidor y las rutas de la API utilizando node:http.

7. Utilizar Promise.all para consultar varias ciudades simultáneamente.

8. Crear el cliente HTTP y los comandos de terminal para consultar y comparar ciudades.

9. Integrar todos los módulos y comprobar que se comunican correctamente.

10. Realizar las pruebas finales, revisar el código y completar la documentación.

La IA también propuso separar el proyecto en carpetas src/, cli/ y test/, y crear diferentes archivos para cada responsabilidad.

**Què n'he canviat i per què**

- He decidido no crear las carpetas src/ y cli/ ni los archivos adicionales cities.js y errors.js, porque ya tenemos una estructura de proyecto y unos archivos concretos que debemos utilizar.

- He decidido mantener un único archivo meteo.test.js, en lugar de crear muchos archivos de tests diferentes.

- Mantendré la separación entre el cliente, el servidor y el servicio meteorológico porque es importante que cada archivo tenga una responsabilidad diferente.

## 2 · Registre de prompts

Com a mínim, cinc files. Decisió: accepto, modifico o rebutjo.

| Pas | Què he demanat | Què m'ha proposat | Decisió | Motiu |
| --- | --- | --- | --- | --- |
| 2 | Cómo organizar y configurar el proyecto Node.js | Crear una estructura de archivos y configurar el proyecto para utilizar módulos ES. | Modifico | He mantenido los archivos y la estructura que ya tenía el proyecto, en lugar de crear carpetas adicionales. |
| 2 | Cómo organizar las responsabilidades de cada archivo | Separar la lógica del servidor, el cliente y las consultas meteorológicas. | Acepto | Así cada archivo tiene una responsabilidad concreta y el código es más fácil de mantener |
| 3 | Cómo obtener los datos de una ciudad y consultar su tiempo. | Utilizar la API de geolocalización de Open-Meteo para encontrar las coordenadas y después consultar el tiempo. | Acepto | 	Permite buscar ciudades y obtener sus datos meteorológicos sin mezclar las responsabilidades |
| 4 | Cómo hacer que el cliente consulte mi propia API desde el terminal. | Utilizar fetch para enviar peticiones HTTP a mi servidor. | Acepto | 	El cliente se comunica únicamente con mi API y no directamente con Open-Meteo. |
| 5 | Cómo probar las funciones de meteo.js sin depender de Internet. | Añadir un parámetro fetchFn para poder utilizar un fetch falso y crear pruebas con node:test. | Acepto |Permite comprobar tanto las respuestas correctas como los errores sin depender de Open-Meteo. |
| 6 | Revisar servidor.js: qué errores no gestiono, de más a menos grave | Una lista de 10 puntos: excepciones en el catch, no se registra el error, sin timeout, handlers de proceso, validación, 405, PORT, cabeceras | Modifico | Acepto registrar el error en el log (punto 2). Rechazo el resto: algunos ya están resueltos en meteo.js o contradicen el enunciado |

## 3 · Una cosa que la IA ha fet malament

*Què va proposar, com te'n vas adonar i com ho vas resoldre.*
La IA inicialmente propuso una gestion de errores que no funcionaba correctamente cuando se buscaba una ciudad inexistente, al ejecutar (npm run prova-api), comprobé que la peticion devolvia un error 500 en lugar de un 404.

Me di cuenta al comparar el resultado obtenido con el resultado esperado. 
Revisamos la gestion de errores en "meteo.js" y el servidor para que las ciudades inexistentes devolvieran el codigo 404.

## 4 · Revisió final (Pas 6)

- **Què ha trobat:**
La IA me dio una lista de 10 puntos, de más a menos grave: (1) el catch del servidor podría lanzar una excepción, (2) no se registra el mensaje del error en el log, (3) falta timeout hacia Open-Meteo, (4) faltan handlers de proceso y cierre ordenado, (5) confío en err.status, (6) una URL malformada da 500, (7) validación de entrada incompleta, (8) debería devolver 405, (9) PORT sin parsear y (10) faltan cabeceras como X-Request-Id. La IA avisó de que no había visto meteo.js.
- **Què he canviat:**
Punto 2: ahora, cuando el estado es 500 o más, el log de pino incluye el error con su mensaje y su stack. Antes solo salían reqId, estat y ms.
- **Què no he canviat i per què:**
Punto 3: ya estaba resuelto, meteo.js usa AbortSignal.timeout(5000) en las dos llamadas y devuelve 502. La IA no había visto ese fichero.
Punto 8: el enunciado dice que cualquier otra ruta devuelve 404 «Ruta no trobada», así que 405 lo contradice.
Puntos 1 y 5: es un riesgo teórico; los errores con status los creo yo en meteo.js con 400, 404 o 502.
Punto 6: es cierto en URLs muy raras, pero el enunciado permite un 500 «Error intern» cuando no sé qué ha pasado.
Puntos 4, 7, 9 y 10: van más allá de lo que teniamos que hacer y añadiría código que no necesito 

## 5 · Què he après

**De Node.js**

- Quina diferència hi ha entre fer `await` un darrere l'altre i fer servir `Promise.all`?
- "await" uno detrás de otro significa que esperamos a que termine una operación para empezar la siguiente, con Promise.all podemos hacer varias operaciones al mismo tiempo y esperar a que todas terminen

He aprendido que Promise.all es útil cuando necesitamos obtener información de varias ciudades, porque no tenemos que esperar a que termine cada consulta por separado

**De treballar amb la IA**

- He aprendido que la IA me puede ayudar a entender cómo funciona el código y a resolver problemas paso a paso

- También he aprendido que no debo copiar todo directamente, sino revisar lo que propone, probarlo y entender por qué funciona

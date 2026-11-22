# Activitat 7 · Com he fet servir la IA

Eina: *quin xatbot has fet servir*
Eina: ChatGPT (GPT-6)

Omple aquest fitxer **mentre treballes**, no al final. Mai hi enganxis claus, contrasenyes ni dades personals.

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

- He modificado la propuesta de las rutas de la API para utilizar: /temps/<ciutat> y /compara?ciutats=A,B,C.

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

## 3 · Una cosa que la IA ha fet malament

*Què va proposar, com te'n vas adonar i com ho vas resoldre.*
La IA propuso una gestión de errores que inicialmente no funcionaba correctamente. Cuando probé la API con una ciudad inexistente, recibí un error 500 en lugar del 404 esperado.

Me di cuenta al ejecutar (npm run prova-api) y comprobar que una de las pruebas fallaba. Revisé la gestión de errores y corregí el código para que se conservara el estado 404 cuando no se encontraba una ciudad.

## 4 · Revisió final (Pas 6)

- **Què ha trobat:**
- **Què he canviat:**
- **Què no he canviat i per què:**

## 5 · Què he après

**De Node.js** (amb les teves paraules, sense la IA)

- Quina diferència hi ha entre fer `await` un darrere l'altre i fer servir `Promise.all`?
-
-

**De treballar amb la IA**

-
-

# Registre d'ús de la IA · Activitat 6

Eina: ChatGPT  Modelo: GPT-6

## 1 · La meva llista (abans de preguntar a la IA)

Quins creus que són els tres tests més importants de `material.js`? Escriu-los abans d'obrir el xat.

1.Comprobar que prestar cambia el estado de un elemento a prestado
2.Comprobar que prestar no modifica la lista original
3.Comprobar que prestar rechaza un elemento que ya está prestado con error 409

## 2 · El prompt

Aquest és el prompt que he utilitzat:

Estoy realizando una actividad de programación con Node.js 24, ES Modules y node.

Quiero que analices el siguiente archivo material.js y me propongas cinco tests importantes para comprobar que sus funciones funcionan correctamente.

[Aquí he puesto el código completo de material.js.]

Requisitos:

Utiliza únicamente node y node/strict.

No utilices herramientas externas.

Utiliza ES Modules, con import y export. No utilices require ni module.exports.

Utiliza solamente las funciones y constantes que existen realmente en material.js.

Indica si cada test es unitario o de integración.

Explica qué comprueba cada test y por qué es importante.

Comprueba tanto los resultados correctos como los posibles errores, incluyendo sus códigos de estado cuando corresponda.

No propongas pruebas que necesiten tener el servidor en funcionamiento.

Escribe el código con un nivel básico, adecuado para un estudiante que está aprendiendo programación.

No quiero que inventes funciones ni que añadas herramientas que no utilizamos en clase.


## 3 · Què proposa la IA i què decideixo

| # | Test proposat | Unitari o d'integració | Decisió (accepto, modifico o rebutjo) | Motiu |
| --- | --- | --- | --- | --- |
| 1 |Comprobar los estados permitidos |Unitario |Rebutjo |Prefiero centrar los tests en el funcionamiento de las funciones del inventario |
| 2 |Filtrar material por estado |Unitario |Rebutjo |He priorizado las tres pruebas de la función prestar(), que son las que había seleccionado inicialmente |
| 3 |Comprobar un estado no válido |Unitario |Rebutjo |Es una prueba útil, pero he decidido centrarme en los préstamos |
| 4 |Buscar un elemento por código |Unitario |Rebutjo |He priorizado comprobar el funcionamiento de los préstamos |
| 5 |Prestar un elemento disponible |Unitario |Modifico |La propuesta es buena, pero separo las comprobaciones en tres tests diferentes para comprobar también que la lista original no cambia y que se genera el error 409 |

## 4 · Els tests que he implementat

| Test | Fitxer | Passa amb npm test? |
| --- | --- | --- |
|prestar marca el elemento como prestado | `material.test.js` |Sí |
|prestar no modifica la lista original | `material.test.js` |Sí |
|prestar rechaza un elemento que no está disponible | `material.test.js` |Sí |

## 5 · Reflexió

- Quin test de la IA no se t'havia acudit?
La IA propuso comprobar que ESTADOS contiene exactamente los tres estados permitidos
No había pensado en comprobar directamente esta constante
- Quina proposta has rebutjat i per què?
He rechazado los tests de filtrar() i cercar() porque he preferido enfocar esta actividad en la función prestar() y comprobar que funciona correctamente en diferentes situaciones
- Has trobat algun error o invent de la IA (una eina que no fem servir, una funció que no existeix, una sintaxi que no és ES Modules…)?

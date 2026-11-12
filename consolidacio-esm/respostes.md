# Respostes · Activitat 6

## Pas 1 · De CommonJS a ES Modules

Fes cada experiment, copia la primera línia de l'error i explica'l amb les teves paraules.

1. A `prova-material.js`, treu l'extensió de l'import (`"./material"`) i executa `node prova-material.js`.
   - Error:Error [ERR_MODULE_NOT_FOUND]: Cannot find module ..... imported from .....
   - Per què:Por qué en ES Modules es obligatorio poner la extensión .js cuando importamos un archivo propio
2. A `material.js`, canvia `import.meta.dirname` per `__dirname`.
   - Error:ReferenceError: __dirname is not defined in ES module scope...
   - Per què:Porque __dirname es de CommonJS y no funciona en ES Modules. En ES Modules usamos import.meta.dirname
3. Crea `prova-require.js` amb la línia `const fs = require("node:fs");` i executa'l.
   - Error:ReferenceError: require is not defined in ES module scope, you can use import instead
   This file is being treated as an ES module because it has a '.js' file extension .....
   - Per què:porque el proyecto utiliza ES Modules y no se puede usar require() en este archivo ".js"
   - Què diu Node que podries fer:Usar import en lugar de require()

## Per pensar

- Quina línia del `package.json` fa que els `.js` d'aquesta carpeta siguin ES Modules?
La línea "type": "module" indica a Node.js que los archivos .js de esta carpeta son ES Modules

- Per què `material.cjs` funciona encara que el `package.json` digui `"type": "module"`?
Porque los archivos con extensión .cjs siempre utilizan CommonJS, independientemente del valor de "type" en el package.json

- Per què `eslint.config.mjs` ja era ES Modules a les activitats anteriors?
Porque los archivos con extensión .mjs siempre utilizan ES Modules, independientemente del package.json
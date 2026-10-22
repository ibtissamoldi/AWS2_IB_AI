# Respostes · Activitat 5

## Pas 1 · Diagnòstic (amb el codi de partida)

### importa.js
- Quins elements s'han importat i quins no? Per què no?
    Elementos importados:
    -Portàtil HP 15 , Monitor Dell 24 polzades, Cable HDMI 3 m, Webcam Logitech C270, Ratolí Logitech M185
    Elementos no importados:
    -Tauleta Lenovo Tab M10:precio invalido porque se usa coma (189,90) en vez de punto, en json coma no se considera como numero float.
    -Projector Optoma HD146X:Json no reconoce el tipo "proyector" porque tiene una validacion de solo unos tipos permitidos (tiene que ser "projector").
    -Elemento no tiene nombre de tipo cable por eso no ha sido importado , el nombre es obligatorio y la linea empieza con un ";".
- Què conté importats.json després de `node importa.js data/compra-octubre.csv > importats.json`?
importats.json contiene todas las lineas de text que esta en "console.log"--->(Iniciant importació...  , Importat ...   ,Error ...,   Fet!)
mas la estructura de JSON
- Amb quin codi de sortida acaba? I sense arguments?
Acaba con codigo de sortda "0" 
sin argumentos:lanca una excepcion (Error: TypeError [ERR_INVALID_ARG_TYPE]:)

### servidor.js
- Una de les peticions de trafic.js acaba amb un 500. Quina és i per què falla?
    -la petecion 10 ,"POST /prestecs" para "Préstec: 9a1c " , porque la petecion solo enviaa el nom ({ nom: "Marta Puig" }), sin el campo email 
- Quina petició ha trigat més? 
    -no he podido saberlo en estos logs no se registra duracion
- Quines dades que no haurien de sortir apareixen al terminal del servidor?
    -Tokens de autorizacion:"authorization":"Bearer aula-2026" y datos personales como nombres y correos electronicos 
    

## Pas 6 · Incidència (logs/produccio.ndjson)
1. Quantes peticions hi ha hagut i amb quin estat han acabat?
2. Petició 3c9e1b2a: quin error hi ha, a quin fitxer i a quina línia?
3. Des de quan hi ha errors 500? Coincideix amb alguna cosa que hagi passat al servidor?
4. Quina ha estat la petició més lenta?
5. Entre les 09:10 i les 09:24 (UTC) hi ha molts 401: què creus que va passar?

## Conclusions
- Què ha canviat entre el Pas 1 i el Pas 6 per poder respondre les mateixes preguntes?

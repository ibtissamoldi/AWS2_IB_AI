const fs = require("node:fs");
const path = require("node:path");

const RUTA = path.join(__dirname, "data", "material.json");

const crypto = require("node:crypto");

const TIPUS = [
    "portatil",
    "tauleta",
    "projector",
    "cable",
    "altres"
];

function llegir() {
    return JSON.parse(fs.readFileSync(RUTA, "utf8"));
}

function desar(llista) {
    fs.writeFileSync(RUTA, JSON.stringify(llista, null, 2));
}

function euros(valor) {
    return new Intl.NumberFormat("ca-ES", {
        style: "currency",
        currency: "EUR"
    }).format(valor);
}

function linia(element) {
    return `${element.nom} · ${element.aula} · ${euros(element.valor)}`;
}

function filtrar(llista, filtres) {
    const clausValides = ["tipus", "estat", "aula"];

    for (const clau of Object.keys(filtres)) {
        if (!clausValides.includes(clau)) {
            throw new Error(
                `Filtre desconegut: ${clau} (vàlids: tipus, estat, aula)`
            );
        }
    }

    return llista.filter((element) =>
        Object.entries(filtres).every(
            ([clau, valor]) => element[clau] === valor
        )
    );
}

function cercar(llista, prefix) {
    return llista.find((element) => element.id.startsWith(prefix));
}

function crear(llista, nom, tipus, aula, valor) {
    if (!nom || !tipus || !aula || valor === undefined) {
        throw new Error("Falten dades");
    }

    if (!TIPUS.includes(tipus)) {
        throw new Error(
            `Tipus no vàlid: ${tipus} (vàlids: ${TIPUS.join(", ")})`
        );
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero) || numero < 0) {
        throw new Error(`Valor no vàlid: ${valor}`);
    }

    const nou = {
        id: crypto.randomUUID(),
        codi: "",
        nom,
        tipus,
        aula,
        valor: numero,
        estat: "disponible",
        dataAlta: new Date().toISOString()
    };

    return [...llista, nou];
}

function prestar(llista, prefix, persona) {
    const element = cercar(llista, prefix);

    if (!element) {
        throw new Error(`No he trobat ${prefix}`);
    }

    if (element.estat !== "disponible") {
        throw new Error(`No es pot prestar: està ${element.estat}`);
    }

    return llista.map((m) =>
        m.id === element.id
            ? {
                ...m,
                estat: "prestat",
                prestatA: persona,
                dataPrestec: new Date().toISOString()
            }
            : m
    );
}

function retornar(llista, prefix) {
    const element = cercar(llista, prefix);

    if (!element) {
        throw new Error(`No he trobat ${prefix}`);
    }

    if (element.estat !== "prestat") {
        throw new Error(`No es pot retornar: està ${element.estat}`);
    }

    return llista.map((m) => {
        if (m.id !== element.id) {
            return m;
        }

        const { prestatA, dataPrestec, ...rest } = m;

        return {
            ...rest,
            estat: "disponible"
        };
    });
}

function estadistiques(llista) {
    const total = llista.reduce((suma, element) => suma + element.valor, 0);

    const perTipus = llista.reduce((resultat, element) => {
        resultat[element.tipus] = (resultat[element.tipus] || 0) + 1;
        return resultat;
    }, {});

    const perEstat = llista.reduce((resultat, element) => {
        resultat[element.estat] = (resultat[element.estat] || 0) + 1;
        return resultat;
    }, {});

    const perAula = llista.reduce((resultat, element) => {
        resultat[element.aula] = (resultat[element.aula] || 0) + 1;
        return resultat;
    }, {});

    const mesValuos = llista.reduce((max, element) =>
        element.valor > max.valor ? element : max
    );

    const avariats = llista.filter(
        (element) => element.estat === "avariat"
    ).length;

    return {
        total: llista.length,
        valorTotal: total,
        valorMitja: total / llista.length,
        perTipus,
        perEstat,
        perAula,
        mesValuos,
        avariats
    };
}

module.exports = {
    TIPUS,
    llegir,
    desar,
    euros,
    linia,
    filtrar,
    cercar,
    crear,
    prestar,
    retornar,
    estadistiques
};
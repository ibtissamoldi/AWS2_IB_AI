function disponibles(llista) {
return llista.filter((m) => m.estat === "disponible");
 }

function valorTotal(llista) {
return llista.reduce((suma, m) => suma + m.valor, 0);
}
 
function perEstat(llista){
    return llista.reduce()
}


module.exports = { disponibles, valorTotal ,perEstat};

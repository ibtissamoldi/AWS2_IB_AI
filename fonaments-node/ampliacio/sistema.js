const os = require("node:os");

const sistema = os.platform();
const maquina = os.hostname();
const cpuNuclis = os.cpus().length;
const memoriaGB = (os.totalmem() / (1024 ** 3)).toFixed(1);
const nodeVersion = process.version;
const carpeta = process.cwd();
const minutsEnces = Math.floor(os.uptime() / 60);

console.log(`Sistema: ${sistema}`);
console.log(`Màquina: ${maquina}`);
console.log(`CPU:     ${cpuNuclis} nuclis lògics`);
console.log(`Memòria: ${memoriaGB} GB`);
console.log(`Node:    ${nodeVersion}`);
console.log(`Carpeta: ${carpeta}`);
console.log(`Encès des de fa ${minutsEnces} minuts`);

console.log("\n--- Extra: Vista amb console.table() ---");
console.table({
  Sistema: sistema,
  Màquina: maquina,
  CPU: `${cpuNuclis} nuclis lògics`,
  Memòria: `${memoriaGB} GB`,
  Node: nodeVersion,
  Carpeta: carpeta,
  "Encès (minuts)": minutsEnces
});
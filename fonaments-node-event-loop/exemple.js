const fs = require("node:fs");
setImmediate(() => console.log("fase check: setImmediate"));
// callback amb l'error primer: (err, dades)
fs.readFile(__filename, (err, dades) => {
if (err) return console.error(err.message);
console.log(`fase poll: llegits ${dades.length} bytes`);
});
console.log("codi síncron");
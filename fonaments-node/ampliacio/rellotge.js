let tics = 0;

const intervalId = setInterval(() => {
  const hora = new Date().toLocaleTimeString("ca-ES");
  console.log(hora);
  tics++;

  if (tics === 5) {
    clearInterval(intervalId);
    console.log("Fi");
  }
}, 1000);


process.on("SIGINT", () => {
  clearInterval(intervalId);
  console.log("\nAdeu! Has aturat el rellotge.");
  process.exit(0);
});
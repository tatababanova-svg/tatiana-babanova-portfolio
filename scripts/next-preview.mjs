import { spawn } from "node:child_process";

const forwarded = process.argv.slice(2);
let hostname = "0.0.0.0";
let port = "3000";

for (let index = 0; index < forwarded.length; index += 1) {
  if (forwarded[index] === "--host" && forwarded[index + 1]) hostname = forwarded[++index];
  if (forwarded[index] === "--port" && forwarded[index + 1]) port = forwarded[++index];
}

const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "--hostname", hostname, "--port", port],
  { stdio: "inherit" },
);

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

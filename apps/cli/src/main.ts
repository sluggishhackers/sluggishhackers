import program from "./commander";
import epeople from "./client/epeople";

console.log("HELLO WORLD");
program
  .name("epp")
  .description("CLI to automate fetch & download from epeople.go.kr")
  .version("0.0.1")
  .addCommand(epeople, { isDefault: true });

program.parse();

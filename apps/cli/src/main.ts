import program from "./commander";
import epeople from "./client/epeople";
import bokjiro from "./client/bokjiro";
import openwatch from "./client/openwatch";
program
  .name("epp")
  .description("CLI to automate fetch & download from epeople.go.kr")
  .version("0.0.1")
  .addCommand(epeople, { isDefault: true })
  .addCommand(bokjiro, { isDefault: false })
  .addCommand(openwatch, { isDefault: false });

program.parse();

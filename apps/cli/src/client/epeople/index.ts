import { Command } from "commander";
import fetch from "./commands/fetch";
import sync from "./commands/sync";

const command = new Command();

command
  .name("epeople")
  .description("CLI to automate fetch & download from epeople.go.kr")
  .version("0.0.1");
sync.initailize(command);
fetch.initailize(command);

export default command;

import { Command } from "commander";
import { CLIENT } from "../contants";
import fetch from "./commands/fetch";
import sync from "./commands/sync";

const command = new Command();

command
  .name(CLIENT.SCORT)
  .description("CLI to automate fetch & download from portal.scourt.go.kr")
  .version("0.0.1");

fetch.initailize(command);
sync.initailize(command);

export default command;

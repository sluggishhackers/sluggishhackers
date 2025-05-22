import { Command } from "commander";
import parse from "./commands/parse";
import { CLIENT } from "../contants";

const command = new Command();

command
  .name(CLIENT.OPENWATCH)
  .description("CLI to automate fetch & download from epeople.go.kr")
  .version("0.0.1");
parse.initailize(command);

export default command;

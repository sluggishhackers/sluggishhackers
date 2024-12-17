import { Command } from "commander";
import fetch from "./commands/fetch";
import { CLIENT } from "../contants";

const command = new Command();

command
  .name(CLIENT.BOKJIRO)
  .description("CLI to automate fetch & download from bokjiro.go.kr")
  .version("0.0.1");

fetch.initailize(command);

export default command;

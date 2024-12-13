import axios from "axios";
import { Option } from "commander";
import { EpeopleClient } from "../client";
import { ISubCommand } from "../../../interface";

class SyncCommand implements ISubCommand {
  name: string;
  description: string;

  constructor() {
    this.name = "sync";
    this.description =
      "sync data from epeople.go.kr to remote database (supabase)";
  }

  initailize(command) {
    command
      .command(this.name)
      .description(this.description)
      .addOption(options.username)
      .addOption(options.password)
      .addOption(options.dateFrom)
      .addOption(options.dateTo)
      .action(action);

    return command;
  }
}

export const commandName = "sync";
export const commandDescription =
  "sync data from epeople.go.kr to remote database (supabase)";

export const options = {
  username: new Option("-u, --username <username>", "username"),
  password: new Option("-p, --password <password>", "password"),
  dateFrom: new Option("--dateFrom <yyyy-MM-dd>", "date to search from"),
  dateTo: new Option("--dateTo <yyyy-MM-dd>", "date to search to"),
};

export const action = async (args: any): Promise<void> => {
  const httpClient = axios.create({
    withCredentials: true,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0",
    },
  });

  const client = new EpeopleClient({ httpClient });
  await client.login({
    username: args.username,
    password: args.password,
  });

  let hasMore = true;
  let page = 1;
  const pageSize = 300;

  const items = [];
  while (hasMore) {
    const itemsFromList = await client.fetchItems({
      page,
      pageSize,
      query: args.query,
      dateFrom: args.dateFrom,
      dateTo: args.dateTo,
    });

    if (itemsFromList.length < pageSize) {
      hasMore = false;
    }

    page++;
  }
};

export default new SyncCommand();

import axios from "axios";
import { Option } from "commander";
import { EpeopleClient } from "../client";
import { ISubCommand } from "../../../interface";

class FetchCommand implements ISubCommand {
  name: string;
  description: string;
  private action: () => void | Promise<void>;
  private options: Record<string, Option>;

  constructor() {
    this.name = "fetch";
    this.description =
      "sync data from epeople.go.kr to remote database (supabase)";
    this.options = {
      username: new Option("-u, --username <username>", "username"),
      password: new Option("-p, --password <password>", "password"),
      dateFrom: new Option("--dateFrom <yyyy-MM-dd>", "date to search from"),
      dateTo: new Option("--dateTo <yyyy-MM-dd>", "date to search to"),
      query: new Option("-q, --query <검색어>", "date to search to"),
    };
  }

  initailize(command) {
    command
      .command(this.name)
      .description(this.description)
      .addOption(this.options.username)
      .addOption(this.options.password)
      .addOption(this.options.dateFrom)
      .addOption(this.options.dateTo)
      .addOption(this.options.query)
      .action(action);

    return command;
  }
}

export default new FetchCommand();

const action = async (args: any): Promise<void> => {
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

  const itemsFromList = await client.fetchItems({
    page: 1,
    pageSize: 10,
    query: args.query,
    dateFrom: args.dateFrom,
    dateTo: args.dateTo,
  });

  const items = [];
  for (const _item of itemsFromList) {
    const item = await client.fetchItem(_item);
    items.push(item);
  }

  console.log(items);
};

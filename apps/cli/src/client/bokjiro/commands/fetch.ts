import axios from "axios";
import { Option } from "commander";
import { BokjiroClient } from "../client";
import { ISubCommand } from "../../../interface";

class FetchCommand implements ISubCommand {
  name: string;
  description: string;
  private action: () => void | Promise<void>;
  private options: Record<string, Option>;

  constructor() {
    this.name = "fetch";
    this.description = "fetch data from bokjiro.go.kr";
    this.options = {
      page: new Option("-p, --page <page>", "page number"),
      query: new Option("-q, --query <검색어>", "search term"),
    };
  }

  initailize(command) {
    command
      .command(this.name)
      .description(this.description)
      .addOption(this.options.page)
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

  const client = new BokjiroClient({ httpClient });
  const itemsFromList = await client.fetchItems({
    page: 1,
    query: args.query,
  });

  const items = [];
  for (const _item of itemsFromList) {
    const item = await client.fetchItem(_item);
    items.push(item);
  }

  console.log(items);
};

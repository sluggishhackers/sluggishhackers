import { Option } from "commander";
import { ISubCommand } from "../../../interface";
import * as scourt from "@odc/crawlers/scourt";

class FetchCommand implements ISubCommand {
  name: string;
  description: string;
  private action: () => void | Promise<void>;
  private options: Record<string, Option>;

  constructor() {
    this.name = "fetch";
    this.description = "fetch data from portal.scourt.go.kr";
    this.options = {
      page: new Option("-p, --page <page>", "page number to fetch"),
      keyword: new Option("-k, --keyword <keyword>", "keyword to fetch"),
    };
  }

  initailize(command) {
    command
      .command(this.name)
      .description(this.description)
      .addOption(this.options.page)
      .addOption(this.options.keyword)
      .action(action);

    return command;
  }
}

export default new FetchCommand();

const action = async (args: any): Promise<void> => {
  const response = await scourt.scourtCases({
    page: args.page,
    keyword: args.keyword,
  });

  console.log(response);
  return;
};

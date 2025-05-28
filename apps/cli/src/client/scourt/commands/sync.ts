import { Option } from "commander";
import { ISubCommand } from "../../../interface";
import * as scourt from "@odc/crawlers/scourt";
import prisma from "../../../utils/prisma";
import { makeUniqIdFromCsNoLstCtt } from "../serializer";

class SyncCommand implements ISubCommand {
  name: string;
  description: string;
  private action: () => void | Promise<void>;
  private options: Record<string, Option>;

  constructor() {
    this.name = "sync";
    this.description = "sync data from portal.scourt.go.kr with database";
  }

  initailize(command) {
    command.command(this.name).description(this.description).action(action);

    return command;
  }
}

export default new SyncCommand();

const action = async (args: any): Promise<void> => {
  let page = 279;
  let hasMore = true;

  while (hasMore) {
    console.log(`fetching page ${page}`);
    let rowsFromWebsite = await scourt.scourtCases({
      page,
    });

    if (rowsFromWebsite.length === 0) {
      hasMore = false;
      console.log(`no more pages`);
      break;
    }

    console.log(`found ${rowsFromWebsite.length} rows`);

    page++;

    for (const row of rowsFromWebsite) {
      await prisma.scourtCase.upsert({
        where: {
          csNoLstCtt: makeUniqIdFromCsNoLstCtt(row.csNoLstCtt),
        },
        create: {
          ...row,
          csNoLstCtt: makeUniqIdFromCsNoLstCtt(row.csNoLstCtt),
        },
        update: {
          ...row,
          csNoLstCtt: makeUniqIdFromCsNoLstCtt(row.csNoLstCtt),
        },
      });
    }
  }

  return;
};

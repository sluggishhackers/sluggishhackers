import { Option } from "commander";
import { ISubCommand } from "../../../interface";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import { createReadStream, createWriteStream } from "fs";
import { splitStocks } from "@odc/parsers";

class SyncCommand implements ISubCommand {
  name: string;
  description: string;
  private action: () => void | Promise<void>;
  private options: Record<string, Option>;

  constructor() {
    this.name = "sync";
    this.description = "sync data from various sources with database";
  }

  initailize(command) {
    command
      .command(this.name)
      .description(this.description)
      .addOption(options.input)
      .addOption(options.output)
      .action(action);

    return command;
  }
}

export default new SyncCommand();

export const options = {
  input: new Option("-i, --input <input>", "path to CSV file to process"),
  output: new Option("-o, --output <path>", "path to save processed CSV file"),
};

const action = async (args: any): Promise<void> => {
  await processCSV(args.input, args.output);
  return;
};

async function processCSV(
  inputPath: string,
  outputPath: string
): Promise<void> {
  console.log(inputPath, outputPath);
  const parser = createReadStream(inputPath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  );

  const records: any[] = [];
  for await (const record of parser) {
    if (record.kind === "증권" && record.detail) {
      console.log(record);
      const stocks = splitStocks(record.detail);
      for (const stock of stocks) {
        const newRecord = {
          id: record.id,
          date: record.date,
          type: record.type,
          kind: record.kind,
          nationalAssemblyMemberId: record.nationalAssemblyMemberId,
          affiliation: record.affiliation,
          affiliationType: record.affiliationType,
          detail: stock.name,
          amount: stock.amount,
          change: stock.change,
          relation: record.relation,
          reason: record.reason,
        };
        records.push(newRecord);
      }
    } else {
      const newRecord = {
        id: record.id,
        date: record.date,
        type: record.type,
        kind: record.kind,
        nationalAssemblyMemberId: record.nationalAssemblyMemberId,
        detail: record.detail,
        amount: null,
        change: null,
        relation: record.relation,
        affiliation: record.affiliation,
        affiliationType: record.affiliationType,
        reason: record.reason,
      };
      records.push(newRecord);
    }
  }

  const stringifier = stringify({
    header: true,
    columns: [
      "id",
      "date",
      "relation",
      "type",
      "kind",
      "nationalAssemblyMemberId",
      "detail",
      "amount",
      "change",
      "affiliation",
      "affiliationType",
      "reason",
    ],
  });

  const outputStream = createWriteStream(outputPath);
  stringifier.pipe(outputStream);

  for (const record of records) {
    stringifier.write(record);
  }

  stringifier.end();

  return new Promise((resolve, reject) => {
    outputStream.on("finish", resolve);
    outputStream.on("error", reject);
  });
}

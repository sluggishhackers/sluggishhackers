import { AxiosInstance } from "axios";
import { Command } from "commander";

export type HttpClient = AxiosInstance;

export interface IAuth {
  login(username: string, password: string): void;
}

export interface IClient {
  _csrf?: string;
  httpClient: HttpClient;

  fetchItems?(params: {
    page?: number;
    pageSize?: number;
    query?: string;
    dateTo?: string;
    dateFrom?: string;
  }): Promise<unknown>;

  fetchItem?(params: Record<string, string>): Promise<unknown>;
}

export interface ISubCommand {
  name: string;
  description?: string;

  initailize: (command: Command) => Command;
}

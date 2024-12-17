import { AxiosInstance } from "axios";
import { HttpClient, IClient } from "../../interface";
import { CivilComplaint } from "./interface";
import epeople from "@slg/crawlers/epeople";

export class EpeopleClient implements IClient {
  _csrf?: string;
  httpClient: HttpClient;

  constructor({ httpClient }: { httpClient: AxiosInstance }) {
    this.httpClient = httpClient;
  }

  async login({ username, password }: { username: string; password: string }) {
    const response = await epeople.login({
      axios: this.httpClient,
      username,
      password,
    });

    this._csrf = response.csrf;
    this.httpClient = response.axios;
  }

  async fetchItems(params: {
    page?: number;
    pageSize?: number;
    query?: string;
    dateTo?: string;
    dateFrom?: string;
  }) {
    return epeople.fetchItems({
      axios: this.httpClient,
      csrf: this._csrf,
      page: params.page,
      pageSize: params.pageSize,
      query: params.query,
      dateTo: params.dateTo,
      dateFrom: params.dateFrom,
    });
  }

  async fetchItem(item: CivilComplaint): Promise<CivilComplaint> {
    return epeople.fetchItem({
      axios: this.httpClient,
      csrf: this._csrf,
      item,
    });
  }
}

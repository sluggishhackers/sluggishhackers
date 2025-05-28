import { AxiosInstance } from "axios";
import { Agent } from "https";
import bokjiro, { ServerSideServiceFromList } from "@odc/crawlers/bokjiro";
import { HttpClient, IClient } from "../../interface";

export class BokjiroClient implements IClient {
  _csrf?: string;
  httpClient: HttpClient;

  constructor({ httpClient }: { httpClient: AxiosInstance }) {
    this.httpClient = httpClient;
  }

  async fetchItems(
    params: {
      page?: number;
      query?: string;
    },
    options?: {
      httpsAgent: Agent;
    }
  ) {
    return bokjiro.fetchItems(
      {
        page: params.page,
        query: params.query,
      },
      options
    );
  }

  async fetchItem(item: ServerSideServiceFromList) {
    return bokjiro.fetchItem({
      wlfareInfoId: item.WLFARE_INFO_ID,
      wlfareInfoReldBztpCd: item.WLFARE_GDNC_TRGT_KCD,
    });
  }
}

import { AxiosInstance } from "axios";
import { HttpClient, IClient } from "../../interface";

export class OpenwatchClient implements IClient {
  _csrf?: string;
  httpClient: HttpClient;

  constructor({ httpClient }: { httpClient: AxiosInstance }) {
    this.httpClient = httpClient;
  }
}

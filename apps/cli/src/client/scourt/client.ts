import { AxiosInstance } from "axios";
import { HttpClient, IClient } from "../../interface";

export class ScourtClient implements IClient {
  httpClient: HttpClient;

  constructor({ httpClient }: { httpClient: AxiosInstance }) {
    this.httpClient = httpClient;
  }
}

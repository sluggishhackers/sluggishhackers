import axios from "axios";
import * as https from "https";
import { ServerSideServiceFromList } from "./bokjiro.type";
import * as parser from "./parser";

export type * from "./bokjiro.type";

const fetchItems = async (
  {
    query,
    page,
  }: {
    query?: string;
    page: number;
  },
  options?: {
    httpsAgent?: https.Agent;
  }
): Promise<ServerSideServiceFromList[]> => {
  const { data } = await axios.post(
    "https://www.bokjiro.go.kr/ssis-tbu/TWAT52005M/twataa/wlfareInfo/selectWlfareInfo.do",
    {
      dmScr: {
        curScrId: "tbu/app/twat/twata/twataa/TWAT52005M",
        befScrId: "",
      },
      dmSearchParam: {
        tabId: "1",
        orderBy: "date",
        page,
        favoriteKeyword: "Y",
        searchTerm: query || "",
        jjim: "",
      },
    },
    {
      httpsAgent: options?.httpsAgent,
    }
  );

  return parser.list(data);
};

const fetchItem = async (
  {
    wlfareInfoId,
    wlfareInfoReldBztpCd,
  }: {
    wlfareInfoId: string;
    wlfareInfoReldBztpCd: "01" | "02" | "03";
  },
  options?: {
    httpsAgent: https.Agent;
  }
) => {
  let url = "moveTWAT52011M.do";
  switch (wlfareInfoReldBztpCd) {
    case "02": {
      url = "moveTWAT52011M.do";
      break;
    }
    case "03": {
      url = "moveTWAT52015M.do";
      break;
    }
  }

  const { data } = await axios.get(
    `https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/${url}?wlfareInfoId=${wlfareInfoId}&wlfareInfoReldBztpCd=${wlfareInfoReldBztpCd}`,
    {
      httpsAgent: options?.httpsAgent,
    }
  );

  return parser.detail(data);
};

export default {
  fetchItem,
  fetchItems,
};

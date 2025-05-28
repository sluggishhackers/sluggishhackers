import axios from "axios";
import * as https from "https";
import {
  ScourtCaseOnList,
  ServerSideScourtCases,
  ServerSideScourtCaseSummary,
} from "./scourt.type";

export const scourtCaseSummary = async ({
  jisCntntsSrno,
  jdcpctCtxtDvsCd,
}: {
  jisCntntsSrno: number;
  jdcpctCtxtDvsCd: string;
}): Promise<string> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const query = {
    dma_searchParam: { jisCntntsSrno, jdcpctCtxtDvsCd },
  };

  const result = await axios.post(
    `https://portal.scourt.go.kr/pgp/pgp1011/selectJdcpctSumrInf.on`,
    query,
    {
      httpsAgent,
    }
  );

  const response: ServerSideScourtCaseSummary = result.data;

  if (response?.status !== 200) {
    return "";
  }

  return response.data.dlt_sumrInf.map((item) => item.jdcpctSumrCtt).join("\n");
};

export const scourtCases = async ({
  page,
  pageSize,
  keyword,
}: {
  page: number;
  pageSize?: number;
  keyword?: string;
}): Promise<ScourtCaseOnList[]> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const query = {
    dma_searchParam: {
      srchwd: keyword,
      sort: "jis_jdcpc_instn_dvs_cd_s asc, $relevance desc, prnjdg_ymd_o desc, jdcpct_gr_cd_s asc",
      sortType: "정확도",
      searchRange: "",
      tpcJdcpctCsAlsYn: "",
      csNoLstCtt: "",
      csNmLstCtt: "",
      prvsRefcCtt: "",
      searchScope: "",
      jisJdcpcInstnDvsCd: "",
      jdcpctCdcsCd: "",
      prnjdgYmdFrom: "",
      prnjdgYmdTo: "",
      grpJdcpctGrCd: "",
      cortNm: "",
      pageNo: `${page || 1}`,
      jisJdcpcInstnDvsCdGrp: "",
      grpJdcpctGrCdGrp: "",
      jdcpctCdcsCdGrp: "",
      adjdTypCdGrp: "",
      pageSize: `${pageSize || 20}`,
      reSrchFlag: "",
      befSrchwd: keyword,
      preSrchConditions: "",
      initYn: "N",
      totalCount: "",
      jdcpctGrCd: "111|112|130|141|180|182|232|235|201",
      category: "jdcpct",
      isKwdSearch: "N",
    },
  };

  const result = await axios.post(
    `https://portal.scourt.go.kr/pgp/pgp1011/selectJdcpctSrchRsltLst.on`,
    query,
    {
      httpsAgent,
    }
  );

  const response: ServerSideScourtCases = result.data;

  if (response?.status !== 200) {
    return [];
  }

  return response.data.dlt_jdcpctRslt;
};

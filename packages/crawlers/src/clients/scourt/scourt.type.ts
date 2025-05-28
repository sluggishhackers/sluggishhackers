export type ServerSideScourtCaseSummary = {
  status: number;
  message: string;
  timestamp: number;
  errors: string | null;
  data: {
    dlt_sumrInf: { jdcpctSumrCtt: string }[];
  };
  token: string | null;
};

export type ServerSideScourtCases = {
  status: number;
  message: string;
  timestamp: number;
  errors: string | null;
  data: {
    dlt_jdcpctRslt: ScourtCaseOnList[];
    message: string;
    status: string;
    totalCount: string;
  };
  token: string | null;
};

export type ScourtCaseOnList = {
  csNoLstCtt: string; // 사건번호
  dcdcsCtt: string; // 사건요약
  jdcpctSumrCtt: string; // 요약
  csNmLstCtt: string; // ? 판결 결과 종류
  cortNm: string; // 법원명
  jdcpctPublcCtt: string; // 사건번호2
  grpJdcpctGrNm: string; // 판결 종류
  frstInptDt: string; // ? 첫 입력일
  rcmnIntnCntntsPopltScor: string;
  prnjdgYmd: string;
  jdcyCntntsPopltScor: string;
  rcmnExtnlCntntsPopltScor: string;
  lastChgDt: string;
  rcmnGnrlCntntsPopltScor: string;
  jdcpctDsgnStatCd: string;
  intnCntntsPopltScor: string;
  gnrlCntntsPopltScor: string;
  jdcpctGrCd: string;
  htagCtt: string;
  etcCntntsPopltScor: string;
  extnlCntntsPopltScor: string;
  jdcpctCsAlsNm: string;
  rcmnEtcCntntsPopltScor: string;
  tpcJdcpctCsAlsYn: string;
  jdcpctXmlCtt: string;
  jisCntntsSrno: string;
  jisJdcpcInstnDvsCd: string;
  adjdTypNm: string;
  rcmnJdcyCntntsPopltScor: string;
};

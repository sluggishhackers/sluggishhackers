import * as bokjiro from "@slg/crawlers/bokjiro";

export type CivilComplaint = {
  id?: string;
  title?: string;
  date?: string;
  status?: string;
  agency?: string;
  agencyItemId?: string;
  agencyDate?: string;
  agencyPerson?: string;
  agencySupposedDate?: string;
  url?: string;

  pttnRqstNo?: string;
  instRcptSn?: string;
  pttnRcptPrcsSttsCd?: string;
  stsfdYn?: string;
  pttnCnfmMthYn?: string;
  pttnTypeNm?: string;

  registerName?: string;

  answer?: string;
  answerDate?: string;
};

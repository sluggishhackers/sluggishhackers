import { load } from "cheerio";
import { AxiosInstance } from "axios";
import { CivilComplaint } from "./epeople.type";

export type * from "./epeople.type";

const login = async ({
  axios,
  username,
  password,
}: {
  axios: AxiosInstance;
  username: string;
  password: string;
}): Promise<{
  axios: AxiosInstance;
  csrf: string;
}> => {
  let csrf = "";

  const mainPageForCsrftoken = await axios.get(
    "https://www.epeople.go.kr/nep/crtf/userLogn.npaid",
    {
      headers: {
        Host: "www.epeople.go.kr",
        Origin: "https://www.epeople.go.kr",
        Referer: "https://www.epeople.go.kr/nep/crtf/userLogn.npaid",
      },
    }
  );

  csrf = mainPageForCsrftoken.data.match(
    /<meta name="_csrf_parameter" content="_csrf" \/><meta name="_csrf_header" content="X-CSRF-TOKEN" \/><meta name="_csrf" content="(.*)" \/>/
  )[1];

  const cookiesForLogin = mainPageForCsrftoken.headers["set-cookie"]?.map(
    (c) => {
      return c.split(";")[0];
    }
  );
  axios.defaults.headers.Cookie = cookiesForLogin?.join("; ") || "";

  const response = await axios({
    url: "https://www.epeople.go.kr/nep/crtf/selectUserLogn.npaid",
    method: "POST",
    data: {
      returnUrl: "",
      referer: "https://www.epeople.go.kr/index.npaid",
      method: "",
      mibxLognSctn: "",
      execmode: "Y",
      userId: "Y",
      mbrId: username,
      mbrPswd: password,
      _csrf: csrf,
    },
    headers: {
      AJAX: true,
      Host: "www.epeople.go.kr",
      Origin: "https://www.epeople.go.kr",
      Referer: "https://www.epeople.go.kr/nep/crtf/userLogn.npaid",
      "X-CSRF-TOKEN": csrf,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
  const cookies = response.headers["set-cookie"]?.map((c) => {
    return c.split(";")[0];
  });
  axios.defaults.headers.Cookie = cookies?.join("; ") || "";

  const data = response.data as {
    lognStts: string;
    mbrId: string;
    returnUrl: string;
    lognSttsMsg: string | null;
  };

  if (data.lognStts === "SUCCESS") {
    return {
      axios,
      csrf,
    };
  }

  throw new Error(data.lognSttsMsg || "로그인 실패");
};

const fetchItems = async (params: {
  axios: AxiosInstance;
  csrf: string;
  page?: number;
  pageSize?: number;
  query?: string;
  dateTo?: string;
  dateFrom?: string;
}) => {
  const response = await params.axios.post(
    "https://www.epeople.go.kr/nep/utilHistory/mySmgPttn/mySmgPttnList.paid",
    {
      _csrf: params.csrf,
      recordCountPerPage: `${params.pageSize || 10}`,
      pageIndex: `${params.page || 1}`,
      pttnDutySctnCd: "",
      searchOptionClickYn: "",
      excelHeaderInfo: "",
      schXlsFileNm: "",
      pttnRqstNo: "",
      instRcptSn: "",
      pttnCnfmMthYn: "",
      pttnRcptPrcsSttsCd: "",
      mbrYn: "",
      stsfdYn: "",
      pttnTypeNm: "",
      stsfdBtnClickYn: "N",
      searchType: "titl",
      searchWord: params.query || "",
      searchInstNm: "",
      rqstStDt: params.dateFrom || "2024-09-11",
      rqstEndDt: params.dateTo || "2024-12-10",
      searchPrcsStts: "",
      searchCnfrmRp: "",
      searchStsfd: "",
      searchDataSpl: "",
      srcPttnRqstPathSctnCd: "",
      focusPerPageYn: "",
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const $ = load(response.data);
  const table = $("table.tbl.default.brd5");

  const rows = $(table).find("tbody tr");
  const civilComplaints: CivilComplaint[] = [];

  rows.each((_, row) => {
    const civilComplaint: CivilComplaint = {};

    const cols = $(row).find("td");
    cols.each((index, col) => {
      switch (index) {
        case 2: {
          // 신청번호
          civilComplaint.id = $(col).text().trim();
          break;
        }
        case 3: {
          // 제목
          civilComplaint.title = $(col).text().trim();
          /**
           * <a href="#" id="title_1" onclick="javaScript:fn_detailView('1AA-2412-0152653','191018197','N','0A190024','D','gnrl');">
           */

          const regex =
            /fn_detailView\('(.*)','(.*)','(.*)','(.*)','(.*)','(.*)'\)/;
          const matches = $(col).find("a").attr("onclick")?.match(regex);

          civilComplaint.pttnRqstNo = matches?.[1];
          civilComplaint.instRcptSn = matches?.[2];
          civilComplaint.pttnCnfmMthYn = matches?.[3];
          civilComplaint.pttnRcptPrcsSttsCd = matches?.[4];
          civilComplaint.stsfdYn = matches?.[5];
          civilComplaint.pttnTypeNm = matches?.[6];

          break;
        }
        case 4: {
          // 신청일
          civilComplaint.date = $(col).text().trim();
          break;
        }
        case 5: {
          // 처리기관
          civilComplaint.agency = $(col).text().trim();
          break;
        }
        case 6: {
          // 추진상황
          civilComplaint.status = $(col).text().trim();
          break;
        }
      }
    });

    if (civilComplaint.id) {
      civilComplaints.push(civilComplaint);
    }
  });

  return civilComplaints;
};

const fetchItem = async ({
  csrf,
  axios,
  item,
}: {
  csrf: string;
  axios: AxiosInstance;
  item: CivilComplaint;
}): Promise<CivilComplaint> => {
  const response = await axios.post(
    "https://www.epeople.go.kr/nep/utilHistory/mySmgPttn/mySmgPttnDetail.paid",
    {
      _csrf: csrf,
      pttnDutySctnCd: "",
      searchOptionClickYn: "",
      excelHeaderInfo: "",
      schXlsFileNm: "",
      pttnRqstNo: item.pttnRqstNo,
      instRcptSn: item.instRcptSn,
      pttnCnfmMthYn: item.pttnCnfmMthYn,
      pttnRcptPrcsSttsCd: item.pttnRcptPrcsSttsCd,
      mbrYn: "",
      stsfdYn: item.stsfdYn,
      pttnTypeNm: item.pttnTypeNm,
      stsfdBtnClickYn: "N",
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const $ = load(response.data);
  const dls = $("#slideBtnDiv1.mw_Input dl");
  dls.each((index, dl) => {
    const dd = $(dl).find("dd").text().trim();

    switch (index) {
      case 1: {
        item.date = dd;
        break;
      }
      case 2: {
        item.registerName = dd;
        break;
      }
    }
  });

  const rows = $(".slideBox.slideBoxDetail");
  rows.each((index, row) => {
    switch (index) {
      case 1: {
        // 신청 정보
        break;
      }
      case 2: {
        $(row)
          .find("dl")
          .each((dlIndex, dl) => {
            switch (dlIndex) {
              case 0: {
                const dd = $(dl).find("dd").text().trim();
                item.agency = dd.replaceAll("\n", "").replaceAll("\t", "");
                break;
              }
              case 1: {
                const dd = $(dl).find("dd").text().trim();
                item.agencyItemId = dd;
                break;
              }
              case 2: {
                const dd = $(dl).find("dd").text().trim();
                item.agencyDate = dd;
                break;
              }
              case 3: {
                const dd = $(dl).find("dd").text().trim();
                item.agencyPerson = dd;
                break;
              }
              case 4: {
                const dd = $(dl).find("dd").text().trim();
                item.agencySupposedDate = dd.split("\n")[0];
                break;
              }
            }
          });
        break;
      }
    }
  });

  $("#ansrDiv2 dl").each((index, dl) => {
    switch (index) {
      case 0: {
        const dd = $(dl).find("dd").text().trim();
        item.answerDate = dd.replaceAll("\n", "").replaceAll("\t", "");
        break;
      }
      case 1: {
        const dd = $(dl).find("dd").text().trim();
        item.answer = dd;
        break;
      }
    }
  });

  return item;
};

export default {
  login,
  fetchItem,
  fetchItems,
};

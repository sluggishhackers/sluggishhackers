import { scourtCases, scourtCaseSummary } from ".";

describe("scourt portal", () => {
  it("should fetch scourt cases", async () => {
    const result = await scourtCases({
      page: 1,
      pageSize: 10,
      keyword: "정보공개",
    });

    expect(result.length).toBeGreaterThan(0);
  });

  it("should fetch scourt case summary", async () => {
    const result = await scourtCaseSummary({
      jisCntntsSrno: 2025000006304,
      jdcpctCtxtDvsCd: "02",
    });

    expect(result).toContain("대통령기록물");
  });
});

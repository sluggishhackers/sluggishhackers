import { splitStocks } from "./index";

describe("splitStocks", () => {
  it("should parse stocks with changes", () => {
    const input = "농협은행 86(86 증가), 농협중앙회 15,800(4,340 감소)";
    const expected = [
      { name: "농협은행", amount: 86, change: 86 },
      { name: "농협중앙회", amount: 15800, change: -4340 },
    ];
    console.log(splitStocks(input));
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should parse stocks with 주 suffix", () => {
    const input = "농협은행 86주, 농협중앙회 15,800주";
    const expected = [
      { name: "농협은행", amount: 86 },
      { name: "농협중앙회", amount: 15800 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should parse stocks without 주 suffix", () => {
    const input = "농협은행 86, 농협중앙회 15,800";
    const expected = [
      { name: "농협은행", amount: 86 },
      { name: "농협중앙회", amount: 15800 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should parse single stock", () => {
    const input = "삼성전자 1,000주";
    const expected = [{ name: "삼성전자", amount: 1000 }];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should parse stocks with mixed formats", () => {
    const input =
      "삼성전자 1,000주, SK하이닉스 500(100 증가), 현대차 2,000(500 감소)";
    const expected = [
      { name: "삼성전자", amount: 1000 },
      { name: "SK하이닉스", amount: 500, change: 100 },
      { name: "현대차", amount: 2000, change: -500 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should handle empty string", () => {
    expect(splitStocks("")).toEqual([]);
  });

  it("should handle whitespace in stock names", () => {
    const input = "삼성 전자 1,000주, SK 하이닉스 500주";
    const expected = [
      { name: "삼성 전자", amount: 1000 },
      { name: "SK 하이닉스", amount: 500 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should handle large numbers with commas", () => {
    const input = "삼성전자 1,234,567주, SK하이닉스 9,876,543(1,234,567 증가)";
    const expected = [
      { name: "삼성전자", amount: 1234567 },
      { name: "SK하이닉스", amount: 9876543, change: 1234567 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should handle multiple commas in change amount", () => {
    const input =
      "삼성전자 1,000주(1,234,567 증가), SK하이닉스 2,000주(9,876,543 감소)";
    const expected = [
      { name: "삼성전자", amount: 1000, change: 1234567 },
      { name: "SK하이닉스", amount: 2000, change: -9876543 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("debug: should handle comma-separated numbers correctly", () => {
    const input = "삼성전자 1,234,567주";
    const result = splitStocks(input);
    console.log("Input:", input);
    console.log("Result:", result);
    expect(result).toEqual([{ name: "삼성전자", amount: 1234567 }]);
  });

  it("debug: ", () => {
    const input =
      "NAVER 0주(1주 감소), PALANTIRTECHNOLOGIESCLAORD180주, 그린플러스 5주(5주 증가)";
    const result = splitStocks(input);
    console.log("Input:", input);
    console.log("Result:", result);
    expect(result).toEqual([
      { name: "NAVER", amount: 0, change: -1 },
      { name: "PALANTIRTECHNOLOGIESCLAORD", amount: 180 },
      { name: "그린플러스", amount: 5, change: 5 },
    ]);
  });

  it("should handle English stock names", () => {
    const input = "Samsung 1,000주, Apple 2,000주";
    const expected = [
      { name: "Samsung", amount: 1000 },
      { name: "Apple", amount: 2000 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should handle stock names without spaces before numbers", () => {
    const input = "삼성전자1,000주, SK하이닉스2,000주";
    const expected = [
      { name: "삼성전자", amount: 1000 },
      { name: "SK하이닉스", amount: 2000 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should handle mixed English and Korean names without spaces", () => {
    const input = "Samsung1,000주, 삼성전자2,000주, Apple3,000주";
    const expected = [
      { name: "Samsung", amount: 1000 },
      { name: "삼성전자", amount: 2000 },
      { name: "Apple", amount: 3000 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should handle stock names without spaces and amounts with '주' suffix in change values", () => {
    const input =
      "NAVER 0주(1주 감소), PALANTIRTECHNOLOGIESCLAORD180주, 그린플러스 5주(5주 증가)";
    const expected = [
      { name: "NAVER", amount: 0, change: -1 },
      { name: "PALANTIRTECHNOLOGIESCLAORD", amount: 180 },
      { name: "그린플러스", amount: 5, change: 5 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should handle mixed formats with '주' suffix in change values", () => {
    const input =
      "삼성전자 1,000주(100주 증가), SK하이닉스 2,000주(500주 감소)";
    const expected = [
      { name: "삼성전자", amount: 1000, change: 100 },
      { name: "SK하이닉스", amount: 2000, change: -500 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should handle company names with (주)", () => {
    const input = "삼성전자(주) 1,000주, (주)SK하이닉스 2,000주";
    const expected = [
      { name: "삼성전자(주)", amount: 1000 },
      { name: "(주)SK하이닉스", amount: 2000 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });

  it("should handle company names with (주) and changes", () => {
    const input =
      "일진금속공업(주) 190,000주, LG에너지솔루션(주) 500주(50주 감소)";
    const expected = [
      { name: "일진금속공업(주)", amount: 190000 },
      { name: "LG에너지솔루션(주)", amount: 500, change: -50 },
    ];
    expect(splitStocks(input)).toEqual(expected);
  });
});

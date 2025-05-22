import qs from "qs";

/**
 * 여러 주식이 있는 문자열을 분리하여 배열로 반환합니다.
 * 1. 주식 이름과 주식 수량이 있는 문자열을 분리합니다.
 * 2. 주식 수량이 증가하거나 감소한 내용은 괄호 안에 표기되어 있습니다.
 * 3. 주식 수량 뒤에는 '주' 가 붙어있을 수도 있고 없을 수도 있습니다.
 * 4. 주식 수량은 쉼표(,)가 포함된 숫자 형식일 수 있습니다.
 * 5. 항목명은 한글, 영문, 숫자, 공백이 포함될 수 있습니다.
 * 6. 항목명과 수량 사이에 공백이 없을 수도 있습니다.
 * 7. 항목명에 "(주)"나 다른 괄호가 포함될 수 있습니다.
 *
 * 예시: 농협은행 86(86 증가), 농협중앙회 15,800(4,340 감소)
 * 결과: [{ name: "농협은행", amount: 86, change: 86 }, { name: "농협중앙회", amount: 15800, change: -4340 }]
 *
 * 예시: 농협은행 86주, 농협중앙회 15,800주
 * 결과: [{ name: "농협은행", amount: 86 }, { name: "농협중앙회", amount: 15800 }]
 *
 * 예시: Samsung 1,000주, Apple 2,000주
 * 결과: [{ name: "Samsung", amount: 1000 }, { name: "Apple", amount: 2000 }]
 *
 * 예시: 삼성전자1,000주, SK하이닉스2,000주
 * 결과: [{ name: "삼성전자", amount: 1000 }, { name: "SK하이닉스", amount: 2000 }]
 */
export const splitStocks = (stocks: string) => {
  // 주식 정보를 담을 배열
  const result: Array<{ name: string; amount: number; change?: number }> = [];

  // 1. 먼저 ', '로 항목을 분리
  const items = stocks.split(", ");

  // 2. 각 항목을 처리
  for (const item of items) {
    // 주식 정보를 분리하는 정규식
    // 1. 변화량: 괄호 안의 쉼표가 포함된 숫자와 '증가'/'감소' 텍스트 (선택적, '주' 접미사 포함 가능)
    // 2. 주식 수량: 쉼표가 포함된 숫자 (선택적으로 '주' 접미사)
    // 3. 주식 이름: 한글/영문/숫자/공백/괄호 문자열
    const stockRegex =
      /(.*?)(\d{1,3}(?:,\d{3})*)(?:주)?(?:\s*\((\d{1,3}(?:,\d{3})*)(?:주)?\s*(증가|감소)\))?$/;

    const match = item.match(stockRegex);
    if (match) {
      const [_, name, amountStr, changeStr, changeType] = match;

      // 수량에서 쉼표 제거하고 숫자로 변환
      const amount = parseInt(amountStr.replace(/,/g, ""), 10);

      // 변화량이 있는 경우 처리
      let change: number | undefined;
      if (changeStr && changeType) {
        const changeAmount = parseInt(changeStr.replace(/,/g, ""), 10);
        change = changeType === "증가" ? changeAmount : -changeAmount;
      }

      result.push({
        name: name.trim(),
        amount,
        ...(change !== undefined && { change }),
      });
    }
  }

  return result;
};

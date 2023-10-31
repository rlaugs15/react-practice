export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((res) =>
    res.json()
  );
}

//차트용
export function fetchCoinTickers(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) =>
    res.json()
  );
}

//유료화로 인한 자체제작API, 비트코인~테슬라까지만 나옴
export function fetchCoinHistory(coinId: string) {
  //const endDate = Math.floor(Date.now() / 1000);
  //const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
    //`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}`
  ).then((res) => res.json());
}

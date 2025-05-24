const BASE_URL = "http://20.244.56.144/evaluation-service";

export const fetchStocks = async () => {
  const res = await fetch(`${BASE_URL}/stocks`);
  return res.json();
};

export const fetchStockPrices = async (ticker, minutes = 60) => {
  const res = await fetch(`${BASE_URL}/stocks/${ticker}?minutes=${minutes}`);
  return res.json();
};
import { useEffect, useState } from 'react';
import { fetchStocks, fetchStockPrices } from '../services/api';
import Heatmap from '../components/Heatmap';

const HeatmapPage = () => {
  const [tickers, setTickers] = useState([]);
  const [prices, setPrices] = useState({});
  const [minutes, setMinutes] = useState(60);

  useEffect(() => {
    fetchStocks().then(data => {
      const selected = Object.values(data.stocks).slice(0, 5); // Limit for demo
      setTickers(selected);
      Promise.all(selected.map(t => fetchStockPrices(t, minutes)))
        .then(results => {
          const priceMap = {};
          selected.forEach((t, i) => priceMap[t] = results[i]);
          setPrices(priceMap);
        });
    });
  }, [minutes]);

  const calcStats = (arr) => {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const std = Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length);
    return { mean, std };
  };

  const computeCorr = (a, b) => {
    const meanA = calcStats(a).mean;
    const meanB = calcStats(b).mean;
    const numerator = a.reduce((sum, val, i) => sum + (val - meanA) * (b[i] - meanB), 0);
    const denom = Math.sqrt(a.reduce((sum, val) => sum + (val - meanA) ** 2, 0) * b.reduce((sum, val) => sum + (val - meanB) ** 2, 0));
    return numerator / denom;
  };

  const matrix = tickers.map(t1 =>
    tickers.map(t2 =>
      computeCorr(
        prices[t1]?.map(p => p.price) || [],
        prices[t2]?.map(p => p.price) || []
      ) || 0
    )
  );

  const stats = tickers.map(t => ({
    name: t,
    ...calcStats(prices[t]?.map(p => p.price) || [0]),
  }));

  return (
    <div style={{ padding: 20 }}>
      <Heatmap data={matrix} stats={stats} />
    </div>
  );
};

export default HeatmapPage;
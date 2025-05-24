import { useEffect, useState } from 'react';
import { fetchStocks, fetchStockPrices } from '../services/api';
import { MenuItem, Select, Typography } from '@mui/material';
import StockChart from '../components/StockChart';

const StockPage = () => {
  const [stocks, setStocks] = useState({});
  const [selected, setSelected] = useState('');
  const [prices, setPrices] = useState([]);
  const [minutes, setMinutes] = useState(60);

  useEffect(() => {
    fetchStocks().then(data => setStocks(data.stocks));
  }, []);

  useEffect(() => {
    if (selected) {
      fetchStockPrices(selected, minutes).then(data => setPrices(data));
    }
  }, [selected, minutes]);

  const average = prices.reduce((sum, p) => sum + p.price, 0) / (prices.length || 1);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5">Stock Viewer</Typography>
      <Select value={selected} onChange={e => setSelected(e.target.value)}>
        {Object.entries(stocks).map(([name, ticker]) => (
          <MenuItem key={ticker} value={ticker}>{name}</MenuItem>
        ))}
      </Select>
      <Select value={minutes} onChange={e => setMinutes(e.target.value)} sx={{ ml: 2 }}>
        {[15, 30, 60, 120].map(min => (
          <MenuItem key={min} value={min}>{min} min</MenuItem>
        ))}
      </Select>
      {prices.length > 0 && <StockChart data={prices} average={average} />}
    </div>
  );
};

export default StockPage;
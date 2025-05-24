import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import 'chart.js/auto';

const StockChart = ({ data, average }) => {
  const chartData = {
    labels: data.map(d => new Date(d.lastUpdatedAt).toLocaleTimeString()),
    datasets: [
      {
        label: 'Price',
        data: data.map(d => d.price),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Average',
        data: Array(data.length).fill(average),
        borderColor: 'red',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">Stock Price Chart</Typography>
        <Line data={chartData} />
      </CardContent>
    </Card>
  );
};

export default StockChart;
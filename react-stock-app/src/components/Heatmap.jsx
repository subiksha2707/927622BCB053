import { Card, CardContent, Typography, Tooltip } from '@mui/material';

const Heatmap = ({ data, stats }) => {
  const colors = (corr) => {
    if (corr > 0.8) return "#2e7d32";
    if (corr > 0.3) return "#aed581";
    if (corr > -0.3) return "#fff176";
    if (corr > -0.8) return "#ffb74d";
    return "#d32f2f";
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">Correlation Heatmap</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data.length}, 50px)` }}>
          {data.map((row, i) =>
            row.map((cell, j) => (
              <Tooltip
                title={`Corr: ${cell.toFixed(2)} | ${stats[i]?.name} μ: ${stats[i]?.mean.toFixed(2)}, σ: ${stats[i]?.std.toFixed(2)}`}
                key={`${i}-${j}`}
              >
                <div style={{
                  width: 50,
                  height: 50,
                  backgroundColor: colors(cell),
                  border: '1px solid #ccc'
                }} />
              </Tooltip>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Heatmap;
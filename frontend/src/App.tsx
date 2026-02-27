import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

interface MonthlyDetail {
  month: number;
  commission: number;
}

interface SimulationResult {
  details: MonthlyDetail[];
  averagePerSeller: number;
}

function App() {
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    axios.get<SimulationResult>('/api/simulation/run').then(res => {
      setResult(res.data);
    });
  }, []);

  if (!result) return <div>Loading...</div>;

  const data = {
    labels: result.details.map(d => `M${d.month}`),
    datasets: [
      {
        label: 'Promedio comisión por mes',
        data: result.details.map(d => d.commission),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Simulación de Comisiones</h1>
      <div className="mb-4">
        <strong>Promedio General:</strong> {result.averagePerSeller.toFixed(2)}
      </div>
      <Line data={data} />
      <table className="mt-4 border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">Mes</th>
            <th className="border px-2 py-1">Comisión</th>
          </tr>
        </thead>
        <tbody>
          {result.details.map(d => (
            <tr key={d.month}>
              <td className="border px-2 py-1">{d.month}</td>
              <td className="border px-2 py-1">{d.commission.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
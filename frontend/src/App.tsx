import React, { useState } from 'react';
import axios from 'axios';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SimulationParams } from './components/SimulationParams';
import { ResultsTable } from './components/ResultsTable';
import './index.css';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend);

interface MonthlyDetail {
  month: number;
  commission: number;
}

interface SimulationEvent {
  clk: number;
  evento: string;
  vendedores: Array<{
    id: string;
    rndCantidadVenta: number;
    cantidadVentas: number;
    acumuladorComision: number;
  }>;
  vehiculos: Array<{
    id: string;
    rndTipoVehiculo: number;
    tipoVehiculo: string;
    rndComision: number;
    comision: number;
    vendedor: string;
  }>;
}

interface SimulationResult {
  details: MonthlyDetail[];
  averagePerSeller: number;
  events: SimulationEvent[];
}

function App() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunSimulation = async (params: {
    months: number;
    sellers: number;
    vehicleDistribution: {
      probabilityCompacto: number;
      probabilityModerno: number;
      probabilityLujo: number;
    };
    salesQuantityDistribution: {
      probabilityLessThan5: number;
      probability5: number;
      probability6: number;
      probability7: number;
      probability8: number;
      probability9: number;
      probability10: number;
      probabilityMoreThan10: number;
    };
  }) => {
    setIsLoading(true);
    try {
      const response = await axios.post<SimulationResult>('/api/simulation/run', {
        months: params.months,
        sellers: params.sellers,
        vehicleDistribution: {
          probabilityCompacto: params.vehicleDistribution.probabilityCompacto,
          probabilityModerno: params.vehicleDistribution.probabilityModerno,
          probabilityLujo: params.vehicleDistribution.probabilityLujo,
        },
        salesQuantityDistribution: {
          probabilityLessThan5: params.salesQuantityDistribution.probabilityLessThan5,
          probability5: params.salesQuantityDistribution.probability5,
          probability6: params.salesQuantityDistribution.probability6,
          probability7: params.salesQuantityDistribution.probability7,
          probability8: params.salesQuantityDistribution.probability8,
          probability9: params.salesQuantityDistribution.probability9,
          probability10: params.salesQuantityDistribution.probability10,
          probabilityMoreThan10: params.salesQuantityDistribution.probabilityMoreThan10,
        },
      });
      setResult(response.data);
    } catch (error: any) {
      console.error('Error running simulation:', error);
      const errorMessage = error.response?.data?.error || 'Error al ejecutar la simulación';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
  };

  const data = result
    ? {
        labels: result.details.map((d) => `M${d.month}`),
        datasets: [
          {
            label: 'Promedio comisión por mes',
            data: result.details.map((d) => d.commission),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Simulador de Comisiones</h1>

        <SimulationParams onRun={handleRunSimulation} onClear={handleClear} isLoading={isLoading} />

        {result && (
          <>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Promedio General</h3>
                  <p className="text-3xl font-bold text-blue-600">${result.averagePerSeller.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Total de Eventos</h3>
                  <p className="text-3xl font-bold text-green-600">{result.events.length}</p>
                </div>
              </div>
            </div>

            {data && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-bold mb-4">Gráfico de Tendencia</h2>
                <Line data={data} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-4">Resumen por Mes</h2>
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Mes</th>
                    <th className="border px-4 py-2 text-right">Comisión Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {result.details.map((d) => (
                    <tr key={d.month} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{d.month}</td>
                      <td className="border px-4 py-2 text-right">${d.commission.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ResultsTable events={result.events} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
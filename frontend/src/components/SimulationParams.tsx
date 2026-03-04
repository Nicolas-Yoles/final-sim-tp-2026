import React, { useState } from 'react';

interface VehicleDistribution {
  probabilityCompacto: number;
  probabilityMediano: number;
  probabilityLujo: number;
}

interface SalesQuantityDistribution {
  probabilityLessThan5: number;
  probability5: number;
  probability6: number;
  probability7: number;
  probability8: number;
  probability9: number;
  probability10: number;
  probabilityMoreThan10: number;
}

interface SimulationParamsProps {
  onRun: (params: {
    months: number;
    sellers: number;
    vehicleDistribution: VehicleDistribution;
    salesQuantityDistribution: SalesQuantityDistribution;
  }) => void;
  onClear: () => void;
  isLoading: boolean;
}

export function SimulationParams({ onRun, onClear, isLoading }: SimulationParamsProps) {
  const [months, setMonths] = useState(30);
  const [sellers, setSellers] = useState(3);
  
  const [vehicleDistribution, setVehicleDistribution] = useState<VehicleDistribution>({
    probabilityCompacto: 50,
    probabilityMediano: 35,
    probabilityLujo: 15,
  });

  const [salesDistribution, setSalesDistribution] = useState<SalesQuantityDistribution>({
    probabilityLessThan5: 5,
    probability5: 4,
    probability6: 11,
    probability7: 15,
    probability8: 26,
    probability9: 18,
    probability10: 15,
    probabilityMoreThan10: 6,
  });

  const vehicleSum = vehicleDistribution.probabilityCompacto + 
                     vehicleDistribution.probabilityMediano + 
                     vehicleDistribution.probabilityLujo;

  const salesSum = salesDistribution.probabilityLessThan5 +
                   salesDistribution.probability5 +
                   salesDistribution.probability6 +
                   salesDistribution.probability7 +
                   salesDistribution.probability8 +
                   salesDistribution.probability9 +
                   salesDistribution.probability10 +
                   salesDistribution.probabilityMoreThan10;

  const handleVehicleChange = (key: keyof VehicleDistribution, value: number) => {
    setVehicleDistribution(prev => ({ ...prev, [key]: value }));
  };

  const handleSalesChange = (key: keyof SalesQuantityDistribution, value: number) => {
    setSalesDistribution(prev => ({ ...prev, [key]: value }));
  };

  const handleRun = () => {
    onRun({ 
      months, 
      sellers,
      vehicleDistribution,
      salesQuantityDistribution: salesDistribution
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Parámetros Básicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Cantidad de Meses: <span className="font-bold">{months}</span>
            </label>
            <input
              type="range"
              min="1"
              max="120"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Cantidad de Vendedores: <span className="font-bold">{sellers}</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={sellers}
              onChange={(e) => setSellers(Number(e.target.value))}
              className="w-full"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div>
        <br />
        <h3 className="text-lg font-bold mb-3">Distribución de Tipos de Vehículos</h3>
        <p className="text-xs text-gray-600 mb-3">Los valores deben sumar 100%</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div>
            <label className="block text-sm font-medium mb-2">
              Compacto: <span className={vehicleSum === 100 ? "font-bold text-green-600" : "font-bold text-red-600"}>{vehicleDistribution.probabilityCompacto}%</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={vehicleDistribution.probabilityCompacto}
              onChange={(e) => handleVehicleChange('probabilityCompacto', Number(e.target.value))}
              className="w-full border px-2 py-1"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Mediano: <span className={vehicleSum === 100 ? "font-bold text-green-600" : "font-bold text-red-600"}>{vehicleDistribution.probabilityMediano}%</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={vehicleDistribution.probabilityMediano}
              onChange={(e) => handleVehicleChange('probabilityMediano', Number(e.target.value))}
              className="w-full border px-2 py-1"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Lujo: <span className={vehicleSum === 100 ? "font-bold text-green-600" : "font-bold text-red-600"}>{vehicleDistribution.probabilityLujo}%</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={vehicleDistribution.probabilityLujo}
              onChange={(e) => handleVehicleChange('probabilityLujo', Number(e.target.value))}
              className="w-full border px-2 py-1"
              disabled={isLoading}
            />
          </div>
        </div>
        <p className={`text-sm ${vehicleSum === 100 ? "text-green-600" : "text-red-600"} font-semibold`}>
          Total: {vehicleSum}%
        </p>
      </div>

      <div>
        <br />
        <h3 className="text-lg font-bold mb-3">Distribución de Cantidad de Ventas</h3>
        <p className="text-xs text-gray-600 mb-3">Los valores deben sumar 100%</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
          <div>
            <label className="block text-xs font-medium mb-1">&lt;5: {salesDistribution.probabilityLessThan5}%</label>
            <input
              type="number"
              min="0"
              max="100"
              value={salesDistribution.probabilityLessThan5}
              onChange={(e) => handleSalesChange('probabilityLessThan5', Number(e.target.value))}
              className="w-full border px-2 py-1 text-xs"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">5: {salesDistribution.probability5}%</label>
            <input
              type="number"
              min="0"
              max="100"
              value={salesDistribution.probability5}
              onChange={(e) => handleSalesChange('probability5', Number(e.target.value))}
              className="w-full border px-2 py-1 text-xs"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">6: {salesDistribution.probability6}%</label>
            <input
              type="number"
              min="0"
              max="100"
              value={salesDistribution.probability6}
              onChange={(e) => handleSalesChange('probability6', Number(e.target.value))}
              className="w-full border px-2 py-1 text-xs"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">7: {salesDistribution.probability7}%</label>
            <input
              type="number"
              min="0"
              max="100"
              value={salesDistribution.probability7}
              onChange={(e) => handleSalesChange('probability7', Number(e.target.value))}
              className="w-full border px-2 py-1 text-xs"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
          <div>
            <label className="block text-xs font-medium mb-1">8: {salesDistribution.probability8}%</label>
            <input
              type="number"
              min="0"
              max="100"
              value={salesDistribution.probability8}
              onChange={(e) => handleSalesChange('probability8', Number(e.target.value))}
              className="w-full border px-2 py-1 text-xs"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">9: {salesDistribution.probability9}%</label>
            <input
              type="number"
              min="0"
              max="100"
              value={salesDistribution.probability9}
              onChange={(e) => handleSalesChange('probability9', Number(e.target.value))}
              className="w-full border px-2 py-1 text-xs"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">10: {salesDistribution.probability10}%</label>
            <input
              type="number"
              min="0"
              max="100"
              value={salesDistribution.probability10}
              onChange={(e) => handleSalesChange('probability10', Number(e.target.value))}
              className="w-full border px-2 py-1 text-xs"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">&gt;10: {salesDistribution.probabilityMoreThan10}%</label>
            <input
              type="number"
              min="0"
              max="100"
              value={salesDistribution.probabilityMoreThan10}
              onChange={(e) => handleSalesChange('probabilityMoreThan10', Number(e.target.value))}
              className="w-full border px-2 py-1 text-xs"
              disabled={isLoading}
            />
          </div>
        </div>
        <p className={`text-sm ${salesSum === 100 ? "text-green-600" : "text-red-600"} font-semibold`}>
          Total: {salesSum}%
        </p>
      </div>

      <div className="flex gap-4">
        <br />
        <button
          onClick={handleRun}
          disabled={isLoading || vehicleSum !== 100 || salesSum !== 100}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Ejecutando...' : 'Generar Simulación'}
        </button>
        <button
          onClick={onClear}
          disabled={isLoading}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:bg-gray-300"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}

import React from 'react';

interface VehicleDetail {
  id: string;
  rndTipoVehiculo: number;
  tipoVehiculo: string;
  rndComision: number;
  comision: number;
  vendedor: string;
}

interface SellerDetail {
  id: string;
  rndCantidadVenta: number;
  cantidadVentas: number;
  acumuladorComision: number;
}

interface SimulationEvent {
  clk: number;
  evento: string;
  vendedores: SellerDetail[];
  vehiculos: VehicleDetail[];
}

interface ResultsTableProps {
  events: SimulationEvent[];
}

export function ResultsTable({ events }: ResultsTableProps) {
  // 1. Encontrar el máximo de ventas para generar las columnas dinámicas
  const maxSalesInSimulation = Math.max(
    ...events.flatMap(e => e.vendedores.map(s => s.cantidadVentas)),
    0
  );

  // Definimos los colores por vendedor para mantener la consistencia
  const sellerStyles = [
    { header: 'bg-blue-100', body: 'bg-blue-50' },
    { header: 'bg-green-100', body: 'bg-green-50' },
    { header: 'bg-yellow-100', body: 'bg-yellow-50' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Detalle de Simulación por Mes</h2>
      <table className="w-full border-collapse text-sm table-auto">
        <thead className="bg-gray-100 sticky top-0">
          {/* Fila Superior de Encabezado: Agrupación por Vendedor */}
          <tr>
            <th className="border px-3 py-2 text-left bg-gray-200" colSpan={2}>TIEMPO</th>
            {events[0]?.vendedores.map((seller, idx) => (
              <th 
                key={seller.id} 
                className={`border px-3 py-2 text-center ${sellerStyles[idx]?.header}`}
                colSpan={4 + (maxSalesInSimulation * 3)} // 4 fijos + (3 campos por vehículo * N ventas)
              >
                VENDEDOR: {seller.id}
              </th>
            ))}
          </tr>
          {/* Fila Inferior de Encabezado: Detalle de Campos */}
          <tr>
            <th className="border px-3 py-2 text-left">CLK (Mes)</th>
            <th className="border px-3 py-2 text-left">Evento</th>
            {events[0]?.vendedores.map((_, idx) => (
              <React.Fragment key={`h-${idx}`}>
                <th className={`border px-3 py-2 ${sellerStyles[idx]?.body}`}>RND Cant.</th>
                <th className={`border px-3 py-2 ${sellerStyles[idx]?.body}`}>Cant. Ventas</th>
                <th className={`border px-3 py-2 ${sellerStyles[idx]?.body}`}>Acum. Comisión</th>
                <th className={`border px-3 py-2 font-bold ${sellerStyles[idx]?.body} border-r-2`}>Total Ventas</th>
                {/* Columnas Dinámicas de Vehículos */}
                {Array.from({ length: maxSalesInSimulation }).map((_, i) => (
                  <React.Fragment key={`v-h-${i}`}>
                    <th className="border px-2 py-1 bg-gray-50 italic">Vehículo {i + 1}</th>
                    <th className="border px-2 py-1 bg-gray-50 italic">Tipo</th>
                    <th className="border px-2 py-1 bg-gray-50 italic border-r-2">Comisión</th>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map((event, eventIdx) => (
            <tr key={eventIdx} className="hover:bg-gray-50 transition-colors">
              <td className="border px-3 py-2 font-medium">{event.clk}</td>
              <td className="border px-3 py-2">{event.evento}</td>
              
              {event.vendedores.map((seller, sIdx) => {
                const vehicles = event.vehiculos.filter(v => v.vendedor === seller.id);
                const bgClass = sellerStyles[sIdx]?.body;

                return (
                  <React.Fragment key={seller.id}>
                    {/* Datos Base del Vendedor */}
                    <td className={`border px-3 py-2 text-right ${bgClass}`}>
                      {seller.rndCantidadVenta.toFixed(4)}
                    </td>
                    <td className={`border px-3 py-2 text-center ${bgClass}`}>
                      {seller.cantidadVentas}
                    </td>
                    <td className={`border px-3 py-2 text-right font-semibold ${bgClass}`}>
                      ${seller.acumuladorComision.toLocaleString()}
                    </td>
                    <td className={`border px-3 py-2 text-center font-bold ${bgClass} border-r-2`}>
                      {vehicles.length}
                    </td>

                    {/* Renderizado de Vehículos vendidos en el mes */}
                    {Array.from({ length: maxSalesInSimulation }).map((_, vIdx) => {
                      const v = vehicles[vIdx];
                      return (
                        <React.Fragment key={vIdx}>
                          <td className="border px-2 py-1 text-xs text-gray-600">
                            {v ? v.id : '-'}
                          </td>
                          <td className="border px-2 py-1 text-xs">
                            {v ? v.tipoVehiculo : '-'}
                          </td>
                          <td className="border px-2 py-1 text-xs text-right border-r-2">
                            {v ? `$${v.comision.toFixed(2)}` : '-'}
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
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
  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Detalle de Simulación por Mes</h2>
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="border px-3 py-2 text-left" colSpan={6}>MES</th>
            <th className="border px-3 py-2 text-left bg-blue-100" colSpan={7}>VENDEDOR 1</th>
            <th className="border px-3 py-2 text-left bg-green-100" colSpan={7}>VENDEDOR 2</th>
            <th className="border px-3 py-2 text-left bg-yellow-100" colSpan={7}>VENDEDOR 3</th>
          </tr>
          <tr>
            <th className="border px-3 py-2 text-left">CLK</th>
            <th className="border px-3 py-2 text-left">Evento</th>
            <th className="border px-3 py-2 text-right">RND Cant</th>
            <th className="border px-3 py-2 text-right">Cantidad</th>
            <th className="border px-3 py-2 text-right">Acum. Com.</th>
            <th className="border px-3 py-2 text-left">Vehículo</th>
            {/* Columnas Vendedor 1 */}
            <th className="border px-3 py-2 text-left bg-blue-50">Vendedor</th>
            <th className="border px-3 py-2 text-right bg-blue-50">RND Cant</th>
            <th className="border px-3 py-2 text-right bg-blue-50">Cantidad</th>
            <th className="border px-3 py-2 text-right bg-blue-50">Acum. Com.</th>
            <th className="border px-3 py-2 text-left bg-blue-50">Vehículo</th>
            <th className="border px-3 py-2 text-left bg-blue-50">Tipo</th>
            <th className="border px-3 py-2 text-right bg-blue-50">Comisión</th>
            {/* Columnas Vendedor 2 */}
            <th className="border px-3 py-2 text-left bg-green-50">Vendedor</th>
            <th className="border px-3 py-2 text-right bg-green-50">RND Cant</th>
            <th className="border px-3 py-2 text-right bg-green-50">Cantidad</th>
            <th className="border px-3 py-2 text-right bg-green-50">Acum. Com.</th>
            <th className="border px-3 py-2 text-left bg-green-50">Vehículo</th>
            <th className="border px-3 py-2 text-left bg-green-50">Tipo</th>
            <th className="border px-3 py-2 text-right bg-green-50">Comisión</th>
            {/* Columnas Vendedor 3 */}
            <th className="border px-3 py-2 text-left bg-yellow-50">Vendedor</th>
            <th className="border px-3 py-2 text-right bg-yellow-50">RND Cant</th>
            <th className="border px-3 py-2 text-right bg-yellow-50">Cantidad</th>
            <th className="border px-3 py-2 text-right bg-yellow-50">Acum. Com.</th>
            <th className="border px-3 py-2 text-left bg-yellow-50">Vehículo</th>
            <th className="border px-3 py-2 text-left bg-yellow-50">Tipo</th>
            <th className="border px-3 py-2 text-right bg-yellow-50">Comisión</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, eventIdx) => {
            // Agrupar vehículos por vendedor
            const sellerVehicles: { [key: string]: VehicleDetail[] } = {};
            event.vendedores.forEach(seller => {
              sellerVehicles[seller.id] = event.vehiculos.filter(v => v.vendedor === seller.id);
            });

            const maxVehiclesPerSeller = Math.max(
              ...event.vendedores.map(s => sellerVehicles[s.id]?.length || 0),
              1
            );

            return Array.from({ length: maxVehiclesPerSeller }).map((_, rowIdx) => (
              <tr key={`${eventIdx}-${rowIdx}`} className={rowIdx % 2 === 0 ? 'bg-gray-50' : ''}>
                {/* Columnas iniciales */}
                <td className="border px-3 py-2">{rowIdx === 0 ? event.clk : ''}</td>
                <td className="border px-3 py-2">{rowIdx === 0 ? event.evento : ''}</td>
                <td className="border px-3 py-2 text-right"></td>
                <td className="border px-3 py-2 text-right"></td>
                <td className="border px-3 py-2 text-right"></td>
                <td className="border px-3 py-2"></td>

                {/* Para cada vendedor */}
                {event.vendedores.map((seller, sellerIdx) => {
                  const vehicles = sellerVehicles[seller.id] || [];
                  const vehicle = vehicles[rowIdx];
                  const bgClass = sellerIdx === 0 ? 'bg-blue-50' : sellerIdx === 1 ? 'bg-green-50' : 'bg-yellow-50';

                  return (
                    <React.Fragment key={`seller-${sellerIdx}`}>
                      {/* Datos del vendedor (solo en primera fila) */}
                      <td className={`border px-3 py-2 ${bgClass}`}>
                        {rowIdx === 0 ? seller.id : ''}
                      </td>
                      <td className={`border px-3 py-2 text-right ${bgClass}`}>
                        {rowIdx === 0 ? seller.rndCantidadVenta.toFixed(4) : ''}
                      </td>
                      <td className={`border px-3 py-2 text-right ${bgClass}`}>
                        {rowIdx === 0 ? seller.cantidadVentas : ''}
                      </td>
                      <td className={`border px-3 py-2 text-right font-bold ${bgClass}`}>
                        {rowIdx === 0 ? `$${seller.acumuladorComision.toFixed(2)}` : ''}
                      </td>

                      {/* Datos del vehículo */}
                      <td className={`border px-3 py-2 ${bgClass}`}>
                        {vehicle ? vehicle.id : ''}
                      </td>
                      <td className={`border px-3 py-2 ${bgClass}`}>
                        {vehicle ? vehicle.tipoVehiculo : ''}
                      </td>
                      <td className={`border px-3 py-2 text-right font-bold ${bgClass}`}>
                        {vehicle ? `$${vehicle.comision.toFixed(2)}` : ''}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}

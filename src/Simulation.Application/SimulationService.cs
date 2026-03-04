using Simulation.Domain;

namespace Simulation.Application
{
    public class SimulationService : ISimulationService
    {
        private readonly Random _random;
        private long _clock = 0;

        public SimulationService(Random? random = null)
        {
            _random = random ?? new Random();
        }

        public SimulationResult RunSimulation(SimulationRequest request)
        {
            // Validar probabilidades
            ValidateDistributions(request.VehicleDistribution, request.SalesQuantityDistribution);

            _clock = 0;
            var details = new List<MonthlyDetail>();
            var events = new List<SimulationEvent>();

            for (int m = 1; m <= request.Months; m++)
            {
                decimal monthTotalCommission = 0;
                var sellerDetailsForMonth = new List<SellerDetail>();
                var vehicleDetailsForMonth = new List<VehicleDetail>();

                // Para cada vendedor en el mes
                for (int s = 0; s < request.Sellers; s++)
                {
                    _clock++;
                    double rndCantidad = _random.NextDouble();
                    int sales = DrawSales(rndCantidad, request.SalesQuantityDistribution);
                    
                    var vehiclesForSeller = new List<VehicleDetail>();
                    decimal sellerCommission = 0;

                    // Calcular vehículos vendidos por este vendedor
                    int baseCount = Math.Min(sales, 10);
                    for (int v = 0; v < baseCount; v++)
                    {
                        _clock++;
                        double rndTipo = _random.NextDouble();
                        string tipoVehiculo = GetVehicleType(rndTipo, request.VehicleDistribution);
                        
                        double rndComision = _random.NextDouble();
                        decimal comision = CalculateCommission(tipoVehiculo, rndComision);
                        sellerCommission += comision;

                        vehiclesForSeller.Add(new VehicleDetail
                        {
                            Id = $"V{v + 1}",
                            RndTipoVehiculo = rndTipo,
                            TipoVehiculo = tipoVehiculo,
                            RndComision = rndComision,
                            Comision = comision,
                            Vendedor = $"Vendedor{s + 1}"
                        });
                    }

                    // Bono si vendió más de 10
                    if (sales > 10)
                    {
                        _clock++;
                        sellerCommission += 6000m;
                        vehiclesForSeller.Add(new VehicleDetail
                        {
                            Id = "Bono",
                            RndTipoVehiculo = 0,
                            TipoVehiculo = "Bono >10",
                            RndComision = 0,
                            Comision = 6000m,
                            Vendedor = $"Vendedor{s + 1}"
                        });
                    }

                    var sellerDetail = new SellerDetail
                    {
                        Id = $"Vendedor{s + 1}",
                        RndCantidadVenta = rndCantidad,
                        CantidadVentas = sales,
                        AcumuladorComision = sellerCommission
                    };

                    sellerDetailsForMonth.Add(sellerDetail);
                    vehicleDetailsForMonth.AddRange(vehiclesForSeller);
                    monthTotalCommission += sellerCommission;
                }

                // Un evento por mes con los 3 vendedores
                var monthEvent = new SimulationEvent
                {
                    Clk = _clock,
                    Evento = $"Mes {m}",
                    Vendedores = sellerDetailsForMonth,
                    Vehiculos = vehicleDetailsForMonth
                };
                events.Add(monthEvent);

                details.Add(new MonthlyDetail(m, monthTotalCommission / request.Sellers));
            }

            var avg = details.Average(d => d.Commission);
            return new SimulationResult
            {
                Details = details,
                AveragePerSeller = avg,
                Events = events
            };
        }

        private void ValidateDistributions(VehicleDistribution vehicleDist, SalesQuantityDistribution salesDist)
        {
            double vehicleSum = vehicleDist.ProbabilityCompacto + vehicleDist.ProbabilityMediano + vehicleDist.ProbabilityLujo;
            if (Math.Abs(vehicleSum - 100) > 0.01)
            {
                throw new ArgumentException($"La suma de probabilidades de tipos de vehículo debe ser 100. Actual: {vehicleSum}");
            }

            double salesSum = salesDist.ProbabilityLessThan5 + salesDist.Probability5 + salesDist.Probability6 +
                            salesDist.Probability7 + salesDist.Probability8 + salesDist.Probability9 +
                            salesDist.Probability10 + salesDist.ProbabilityMoreThan10;
            if (Math.Abs(salesSum - 100) > 0.01)
            {
                throw new ArgumentException($"La suma de probabilidades de cantidad de ventas debe ser 100. Actual: {salesSum}");
            }
        }

        private int DrawSales(double r, SalesQuantityDistribution dist)
        {
            double cumulative = 0;

            cumulative += dist.ProbabilityLessThan5;
            if (r < cumulative / 100) return _random.Next(0, 5);

            cumulative += dist.Probability5;
            if (r < cumulative / 100) return 5;

            cumulative += dist.Probability6;
            if (r < cumulative / 100) return 6;

            cumulative += dist.Probability7;
            if (r < cumulative / 100) return 7;

            cumulative += dist.Probability8;
            if (r < cumulative / 100) return 8;

            cumulative += dist.Probability9;
            if (r < cumulative / 100) return 9;

            cumulative += dist.Probability10;
            if (r < cumulative / 100) return 10;

            return 11 + _random.Next(0, 5);
        }

        private string GetVehicleType(double r, VehicleDistribution dist)
        {
            double compactoProb = dist.ProbabilityCompacto / 100;
            double medianoProb = dist.ProbabilityMediano / 100;

            if (r < compactoProb) return "Compacto";
            if (r < compactoProb + medianoProb) return "Mediano";
            return "Lujo";
        }

        private decimal CalculateCommission(string vehicleType, double r)
        {
            return vehicleType switch
            {
                "Compacto" => 250m,
                "Mediano" => r < 0.4 ? 400m : 500m,
                "Lujo" => r < 0.35 ? 1000m : r < 0.75 ? 1500m : 2000m,
                _ => 0m
            };
        }
    }
}
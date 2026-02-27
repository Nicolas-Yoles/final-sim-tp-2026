using Simulation.Domain;

namespace Simulation.Application
{
    public class SimulationService : ISimulationService
    {
        private readonly Random _random;

        public SimulationService(Random? random = null)
        {
            _random = random ?? new Random();
        }

        public SimulationResult RunSimulation(int months = 30, int sellers = 3)
        {
            var details = new List<MonthlyDetail>();
            for (int m = 1; m <= months; m++)
            {
                decimal totalCommission = 0;
                for (int s = 0; s < sellers; s++)
                {
                    int sales = DrawSales();
                    totalCommission += CalculateForSales(sales);
                }
                details.Add(new MonthlyDetail(m, totalCommission / sellers));
            }
            var avg = details.Average(d => d.Commission);
            return new SimulationResult { Details = details, AveragePerSeller = avg };
        }

        private int DrawSales()
        {
            // distribution: <5:5%,5:4%,6:11%,7:15%,8:26%,9:18%,10:15%,>10:5%
            double r = _random.NextDouble();
            if (r < 0.05) return _random.Next(0,5); // <5
            if (r < 0.09) return 5;
            if (r < 0.20) return 6;
            if (r < 0.35) return 7;
            if (r < 0.61) return 8;
            if (r < 0.79) return 9;
            if (r < 0.94) return 10;
            // >10: choose 11-15 perhaps
            return 11 + _random.Next(0,5);
        }

        private decimal CalculateForSales(int sales)
        {
            if (sales < 5) return 0;
            decimal commission = 0;
            int baseCount = Math.Min(sales, 10);
            for (int i = 0; i < baseCount; i++)
            {
                commission += CalculateSingle();
            }
            if (sales > 10)
            {
                commission += 6000m;
            }
            return commission;
        }

        private decimal CalculateSingle()
        {
            // choose type
            double r = _random.NextDouble();
            if (r < 0.5)
            {
                return 250m;
            }
            else if (r < 0.85)
            {
                // Mediano
                double r2 = _random.NextDouble();
                return r2 < 0.4 ? 400m : 500m;
            }
            else
            {
                // Lujo
                double r2 = _random.NextDouble();
                if (r2 < 0.35) return 1000m;
                if (r2 < 0.75) return 1500m;
                return 2000m;
            }
        }
    }
}
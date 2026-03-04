namespace Simulation.Domain
{
    public record MonthlyDetail(int Month, decimal Commission);

    public record VehicleDetail
    {
        public string Id { get; init; } = string.Empty;
        public double RndTipoVehiculo { get; init; }
        public string TipoVehiculo { get; init; } = string.Empty;
        public double RndComision { get; init; }
        public decimal Comision { get; init; }
        public string Vendedor { get; init; } = string.Empty;
    }

    public record SellerDetail
    {
        public string Id { get; init; } = string.Empty;
        public double RndCantidadVenta { get; init; }
        public int CantidadVentas { get; init; }
        public decimal AcumuladorComision { get; init; }
    }

    public record SimulationEvent
    {
        public long Clk { get; init; }
        public string Evento { get; init; } = string.Empty;
        public List<SellerDetail> Vendedores { get; init; } = new();
        public List<VehicleDetail> Vehiculos { get; init; } = new();
    }

    public record VehicleDistribution
    {
        public double ProbabilityCompacto { get; init; } = 50; // %
        public double ProbabilityMediano { get; init; } = 35;  // %
        public double ProbabilityLujo { get; init; } = 15;     // %
    }

    public record SalesQuantityDistribution
    {
        public double ProbabilityLessThan5 { get; init; } = 5;    // %
        public double Probability5 { get; init; } = 4;            // %
        public double Probability6 { get; init; } = 11;           // %
        public double Probability7 { get; init; } = 15;           // %
        public double Probability8 { get; init; } = 26;           // %
        public double Probability9 { get; init; } = 18;           // %
        public double Probability10 { get; init; } = 15;          // %
        public double ProbabilityMoreThan10 { get; init; } = 6;   // %
    }

    public record SimulationRequest
    {
        public int Months { get; init; } = 30;
        public int Sellers { get; init; } = 3;
        public VehicleDistribution VehicleDistribution { get; init; } = new();
        public SalesQuantityDistribution SalesQuantityDistribution { get; init; } = new();
    }

    public record SimulationResult
    {
        public IEnumerable<MonthlyDetail> Details { get; init; } = Enumerable.Empty<MonthlyDetail>();
        public decimal AveragePerSeller { get; init; }
        public List<SimulationEvent> Events { get; init; } = new();
    }
}
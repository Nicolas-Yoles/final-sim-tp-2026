namespace Simulation.Domain
{
    public record MonthlyDetail(int Month, decimal Commission);

    public record SimulationResult
    {
        public IEnumerable<MonthlyDetail> Details { get; init; } = Enumerable.Empty<MonthlyDetail>();
        public decimal AveragePerSeller { get; init; }
    }
}
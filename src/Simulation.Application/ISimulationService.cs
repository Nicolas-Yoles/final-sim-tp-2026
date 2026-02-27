using Simulation.Domain;

namespace Simulation.Application
{
    public interface ISimulationService
    {
        SimulationResult RunSimulation(int months = 30, int sellers = 3);
    }
}
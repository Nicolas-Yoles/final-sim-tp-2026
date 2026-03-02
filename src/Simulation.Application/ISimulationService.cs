using Simulation.Domain;

namespace Simulation.Application
{
    public interface ISimulationService
    {
        SimulationResult RunSimulation(SimulationRequest request);
    }
}
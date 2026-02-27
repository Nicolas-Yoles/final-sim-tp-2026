using Simulation.Application;
using Simulation.Domain;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ISimulationService, SimulationService>();

var app = builder.Build();

app.MapGet("/api/simulation/run", (ISimulationService service) =>
{
    var result = service.RunSimulation();
    return Results.Ok(result);
});

app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();
using Simulation.Application;
using Simulation.Domain;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ISimulationService, SimulationService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

app.MapPost("/api/simulation/run", (SimulationRequest request, ISimulationService service) =>
{
    try
    {
        var result = service.RunSimulation(request);
        return Results.Ok(result);
    }
    catch (ArgumentException ex)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
});

app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();
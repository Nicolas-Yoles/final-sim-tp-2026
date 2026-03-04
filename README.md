## Estructura inicial de proyecto

```
final-sim-tp-2026/
├── README.md
└── src/
    ├── Simulation.Api/          # .NET 8 Web API (minimal)
    │   ├── Program.cs
    │   └── Simulation.Api.csproj
    ├── Simulation.Application/  # Application layer
    │   ├── ISimulationService.cs
    │   ├── SimulationService.cs
    │   └── Simulation.Application.csproj
    └── Simulation.Domain/       # Domain models
        ├── SimulationResult.cs
        └── Simulation.Domain.csproj
```

La solución puede crearse con `dotnet new sln` y agregar los proyectos.

## Backend .NET

Se incluye un `SimulationService` que implementa las reglas de negocio y un endpoint GET `/api/simulation/run`.

### Ejecutar backend

```bash
cd src/Simulation.Api
# dotnet restore, build, run
```

## Frontend React

Se creó una app Vite en `frontend/` usando TypeScript y Chart.js.
El componente `App.tsx` llama al API y muestra los 30 meses en una tabla y una gráfica de línea.

### Ejecutar frontend

```bash
cd frontendS
npm install
npm run dev
```

La configuración de `vite.config.ts` proxifica `/api` al servidor .NET en localhost:5000.


[Output]: Estructura del proyecto, código del servicio de simulación en .NET y el componente principal de React.
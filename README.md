[Role]: Actúa como un Arquitecto de Software Full Stack Senior.
[Context]: Necesito desarrollar un simulador de comisiones para una agencia de automóviles.
[Stack]: Backend en .NET 8 (Web API / Minimal APIs) y Frontend en React (TypeScript) con Vite y Tailwind CSS.

[Business Logic - Simulation Data]:
La simulación debe correr por 30 meses para 3 vendedores basándose en las siguientes reglas:

Distribución de ventas mensuales (Probabilidad de cantidad vendida):

<5: 5% | 5: 4% | 6: 11% | 7: 15% | 8: 26% | 9: 18% | 10: 15% | >10: 5%

Distribución de tipo de auto:

Compacto: 50% | Mediano: 35% | Lujo: 15%

Reglas de Comisión:

Ventas < 5: $0 comisión.

Ventas entre 5 y 10:

Compacto: $250.

Mediano: $400 (40% prob) o $500 (60% prob).

Lujo: $1000 (35%), $1500 (40%), $2000 (25%).

Ventas > 10: Se calculan los primeros 10 según reglas anteriores + Bono fijo de $6,000.

[Task]:

Diseña un servicio en C# que ejecute la simulación de los 30 meses. Utiliza una clase Random o similar para manejar los pesos de probabilidad.

Crea un endpoint GET /api/simulation/run que devuelva el promedio de comisión mensual por vendedor y el detalle de los 30 meses.

Crea un dashboard simple en React que llame al API y muestre los resultados en una tabla y el "Promedio General" destacado.

[Constraint]:

Usa Clean Architecture o una estructura de carpetas organizada.

En el frontend, usa shadcn/ui o Chart.js si es posible para graficar la tendencia de los 30 meses.

El código debe seguir principios SOLID.

[Output]: Estructura del proyecto, código del servicio de simulación en .NET y el componente principal de React.
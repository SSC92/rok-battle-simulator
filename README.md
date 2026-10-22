# Rise of Kingdoms Battle Simulator

Simulador web inicial de batallas para **Rise of Kingdoms**.

## Características de la v0.1

- Interfaz web simple (abre `index.html` en el navegador).
- Tipos de tropa: Infantería, Caballería, Arqueros.
- Sistema de counters aproximado (Inf > Cav > Arch > Inf).
- Stats de bonus: Ataque, Defensa, Salud (%).
- Simulación por turnos (1 segundo = 1 turno).
- Log detallado de la batalla.

## Mecánicas modeladas (aproximadas)

Basado en investigación comunitaria:

- Combate por turnos de 1 segundo.
- Counter advantage aumenta el daño infligido y reduce el recibido.
- Stats efectivos = base × (1 + bonus%).
- Daño base con factor ~200 y escala de tropas.

**Importante:** Esta es una versión inicial simplificada. No incluye:
- Skills de comandantes y rage
- Formaciones, armamentos, inscripciones
- Múltiples marchas / focus fire
- Healing, debuffs, etc.

Los resultados son orientativos.

## Cómo usar

1. Clona el repositorio o descarga `index.html`.
2. Abre `index.html` en cualquier navegador moderno.
3. Configura los dos ejércitos y pulsa **Simular Batalla**.

Para GitHub Pages: Settings → Pages → Branch `main` / root.

## Próximos pasos

- Sistema de rage y skills activas simples
- Más tipos de tropa y tiers
- Mejor calibración de la fórmula de daño
- Soporte para comandantes populares

Contribuciones bienvenidas.

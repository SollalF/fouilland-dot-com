# Boids Battleground

An interactive simulation of flocking behavior based on Craig Reynolds' Boids algorithm. This simulation demonstrates emergent collective behavior from simple rules followed by autonomous agents.

## Overview

Boids (bird-oid objects) follow three primary rules:

- **Separation:** Avoid crowding neighbors
- **Alignment:** Steer towards the average heading of neighbors
- **Cohesion:** Move toward the average position of neighbors

The simulation allows fine-tuning of these behaviors through an intuitive control panel.

## Features

- Real-time simulation with adjustable parameters
- Interactive visualization with customizable appearance
- Fullscreen mode
- Detailed controls for fine-tuning behavior
- Boid selection for viewing individual properties
- Trail visualization
- Boundary behavior options (wraparound or turning)

## Controls

The simulation includes various adjustable parameters:

### Population

- Number of boids
- Boid size

### Appearance

- Boid color
- Trail settings (toggle, color)

### Movement

- Speed limits/constant speed
- Wraparound mode

### Flocking Behavior

- Perception range (how far boids can see)
- Cohesion strength (flock centering)
- Separation distance and strength
- Alignment strength (velocity matching)

### Boundary Behavior

- Boundary width
- Boundary avoidance strength

## Implementation

This simulation is implemented in React with TypeScript and uses the HTML Canvas API for rendering. The main algorithm runs on the client side in real-time.

## Usage

Interact with the simulation by:

- Adjusting parameters in the control panel
- Clicking on individual boids to see their details
- Toggling fullscreen for an immersive experience
- Pausing/resuming to observe specific moments

## Credits

Based on the Boids algorithm by Craig Reynolds (1986). Implemented as an interactive web simulation using Next.js and React.

"use client";

import { useEffect, useRef } from "react";

interface Boid {
  x: number;
  y: number;
  dx: number;
  dy: number;
  history: [number, number][];
}

const BoidsSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boidsRef = useRef<Boid[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const numBoids = 100;
  const visualRange = 75;
  const DRAW_TRAIL = false;

  const initBoids = (width: number, height: number) => {
    const boids: Boid[] = [];
    for (let i = 0; i < numBoids; i++) {
      boids.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: Math.random() * 10 - 5,
        dy: Math.random() * 10 - 5,
        history: [],
      });
    }
    boidsRef.current = boids;
  };

  const distance = (boid1: Boid, boid2: Boid) => {
    return Math.sqrt(
      (boid1.x - boid2.x) * (boid1.x - boid2.x) +
        (boid1.y - boid2.y) * (boid1.y - boid2.y),
    );
  };

  const keepWithinBounds = (boid: Boid, width: number, height: number) => {
    const margin = 200;
    const turnFactor = 1;

    if (boid.x < margin) boid.dx += turnFactor;
    if (boid.x > width - margin) boid.dx -= turnFactor;
    if (boid.y < margin) boid.dy += turnFactor;
    if (boid.y > height - margin) boid.dy -= turnFactor;
  };

  const flyTowardsCenter = (boid: Boid, boids: Boid[]) => {
    const centeringFactor = 0.005;
    let centerX = 0;
    let centerY = 0;
    let numNeighbors = 0;

    for (let otherBoid of boids) {
      if (distance(boid, otherBoid) < visualRange) {
        centerX += otherBoid.x;
        centerY += otherBoid.y;
        numNeighbors += 1;
      }
    }

    if (numNeighbors) {
      centerX = centerX / numNeighbors;
      centerY = centerY / numNeighbors;
      boid.dx += (centerX - boid.x) * centeringFactor;
      boid.dy += (centerY - boid.y) * centeringFactor;
    }
  };

  const avoidOthers = (boid: Boid, boids: Boid[]) => {
    const minDistance = 20;
    const avoidFactor = 0.05;
    let moveX = 0;
    let moveY = 0;

    for (let otherBoid of boids) {
      if (otherBoid !== boid) {
        if (distance(boid, otherBoid) < minDistance) {
          moveX += boid.x - otherBoid.x;
          moveY += boid.y - otherBoid.y;
        }
      }
    }

    boid.dx += moveX * avoidFactor;
    boid.dy += moveY * avoidFactor;
  };

  const matchVelocity = (boid: Boid, boids: Boid[]) => {
    const matchingFactor = 0.05;
    let avgDX = 0;
    let avgDY = 0;
    let numNeighbors = 0;

    for (let otherBoid of boids) {
      if (distance(boid, otherBoid) < visualRange) {
        avgDX += otherBoid.dx;
        avgDY += otherBoid.dy;
        numNeighbors += 1;
      }
    }

    if (numNeighbors) {
      avgDX = avgDX / numNeighbors;
      avgDY = avgDY / numNeighbors;
      boid.dx += (avgDX - boid.dx) * matchingFactor;
      boid.dy += (avgDY - boid.dy) * matchingFactor;
    }
  };

  const limitSpeed = (boid: Boid) => {
    const speedLimit = 15;
    const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
    if (speed > speedLimit) {
      boid.dx = (boid.dx / speed) * speedLimit;
      boid.dy = (boid.dy / speed) * speedLimit;
    }
  };

  const drawBoid = (ctx: CanvasRenderingContext2D, boid: Boid) => {
    const angle = Math.atan2(boid.dy, boid.dx);
    ctx.translate(boid.x, boid.y);
    ctx.rotate(angle);
    ctx.translate(-boid.x, -boid.y);
    ctx.fillStyle = "#558cf4";
    ctx.beginPath();
    ctx.moveTo(boid.x, boid.y);
    ctx.lineTo(boid.x - 15, boid.y + 5);
    ctx.lineTo(boid.x - 15, boid.y - 5);
    ctx.lineTo(boid.x, boid.y);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (DRAW_TRAIL) {
      ctx.strokeStyle = "#558cf466";
      ctx.beginPath();
      ctx.moveTo(
        boid.history[0]?.[0] || boid.x,
        boid.history[0]?.[1] || boid.y,
      );
      for (const point of boid.history) {
        ctx.lineTo(point[0], point[1]);
      }
      ctx.stroke();
    }
  };

  const animationLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const boids = boidsRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // Update each boid
    for (let boid of boids) {
      flyTowardsCenter(boid, boids);
      avoidOthers(boid, boids);
      matchVelocity(boid, boids);
      limitSpeed(boid);
      keepWithinBounds(boid, width, height);

      boid.x += boid.dx;
      boid.y += boid.dy;
      boid.history.push([boid.x, boid.y]);
      boid.history = boid.history.slice(-50);
    }

    // Clear and redraw
    ctx.clearRect(0, 0, width, height);
    for (let boid of boids) {
      drawBoid(ctx, boid);
    }

    animationFrameRef.current = requestAnimationFrame(animationLoop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBoids(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    animationFrameRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

export default BoidsSimulation;

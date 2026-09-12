"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";

interface Boid {
  x: number;
  y: number;
  dx: number;
  dy: number;
  history: [number, number][]; // Past positions of the boid
  id: number; // Add unique identifier for each boid
}

interface SimulationSettings {
  // Population settings
  numBoids: number;
  scale: number;

  // Visual appearance
  boidColor: string;
  trailColor: string;
  drawTrail: boolean;

  // Movement settings
  speedLimit: number;
  minSpeedLimit: number;
  constantSpeed: boolean;
  constantSpeedValue: number;
  wraparoundMode: boolean;

  // Flocking behavior
  visualRange: number;
  centeringFactor: number;
  minDistance: number;
  avoidFactor: number;
  matchingFactor: number;

  // Boundary behavior
  marginFraction: number;
  turnFactor: number;
}

// Define default settings once
const DEFAULT_SETTINGS: SimulationSettings = {
  // Population settings
  numBoids: 100,
  scale: 1.0,

  // Visual appearance
  boidColor: "#558cf4",
  trailColor: "#558cf4",
  drawTrail: false,

  // Movement settings
  speedLimit: 15,
  minSpeedLimit: 5,
  constantSpeed: false,
  constantSpeedValue: 10,
  wraparoundMode: false,

  // Flocking behavior
  visualRange: 75,
  centeringFactor: 0.005,
  minDistance: 20,
  avoidFactor: 0.05,
  matchingFactor: 0.05,

  // Boundary behavior
  marginFraction: 0.1,
  turnFactor: 1,
};

// Create a new component for controls that can work in fullscreen mode
const BoidsControlPanel = ({
  settings,
  updateSetting,
  expandedSections,
  toggleSection,
  setShowVisualRange,
  setShowMinDistance,
  setShowMargins,
  resetSimulation,
  className = "",
}: {
  settings: SimulationSettings;
  updateSetting: <K extends keyof SimulationSettings>(
    key: K,
    value: SimulationSettings[K],
  ) => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (
    section: "population" | "appearance" | "movement" | "flocking" | "boundary",
  ) => void;
  setShowVisualRange: (show: boolean) => void;
  setShowMinDistance: (show: boolean) => void;
  setShowMargins: (show: boolean) => void;
  resetSimulation: () => void;
  className?: string;
}) => {
  return (
    <div className={`space-y-6 py-4 ${className}`}>
      <h2 className="text-xl font-semibold mb-4">Simulation Settings</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Adjust these parameters to control the behavior of the boids simulation.
      </p>

      {/* Population Settings */}
      <Collapsible
        open={expandedSections.population}
        onOpenChange={() => toggleSection("population")}
        className="border rounded-md"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 hover:bg-muted/50">
          <h3 className="text-sm font-semibold">Population</h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.population ? "transform rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-3 pt-1">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="numBoids" className="text-sm font-medium">
                      Number of Boids
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Controls how many boids appear in the simulation</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm text-muted-foreground">
                  {settings.numBoids}
                </span>
              </div>
              <Slider
                id="numBoids"
                min={1}
                max={500}
                step={1}
                value={[settings.numBoids]}
                onValueChange={(value) => updateSetting("numBoids", value[0])}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="scale" className="text-sm font-medium">
                      Boid Size
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Size of the boids - smaller values allow fitting more
                      boids
                    </p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm text-muted-foreground">
                  {settings.scale.toFixed(2)}
                </span>
              </div>
              <Slider
                id="scale"
                min={0.2}
                max={2.0}
                step={0.1}
                value={[settings.scale]}
                onValueChange={(value) => updateSetting("scale", value[0])}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Visual Settings */}
      <Collapsible
        open={expandedSections.appearance}
        onOpenChange={() => toggleSection("appearance")}
        className="border rounded-md"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 hover:bg-muted/50">
          <h3 className="text-sm font-semibold">Appearance</h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.appearance ? "transform rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-3 pt-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="drawTrail" className="text-sm font-medium">
                      Draw Trail
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shows the path each boid has traveled</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                id="drawTrail"
                checked={settings.drawTrail}
                onCheckedChange={(checked) =>
                  updateSetting("drawTrail", checked)
                }
              />
            </div>

            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label
                    htmlFor="boidColor"
                    className="block text-sm font-medium mb-2"
                  >
                    Boid Color
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Color of the boids in the simulation</p>
                </TooltipContent>
              </Tooltip>
              <input
                id="boidColor"
                name="boidColor"
                type="color"
                autoComplete="off"
                value={settings.boidColor}
                onChange={(e) => updateSetting("boidColor", e.target.value)}
                className="w-full h-8 rounded"
                aria-label="Boid color"
              />
            </div>

            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label
                    htmlFor="trailColor"
                    className="block text-sm font-medium mb-2"
                  >
                    Trail Color
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Color of the trails left behind by boids</p>
                </TooltipContent>
              </Tooltip>
              <input
                id="trailColor"
                name="trailColor"
                type="color"
                autoComplete="off"
                value={settings.trailColor}
                onChange={(e) => updateSetting("trailColor", e.target.value)}
                className="w-full h-8 rounded"
                aria-label="Trail color"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Movement Settings */}
      <Collapsible
        open={expandedSections.movement}
        onOpenChange={() => toggleSection("movement")}
        className="border rounded-md"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 hover:bg-muted/50">
          <h3 className="text-sm font-semibold">Movement</h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.movement ? "transform rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-3 pt-1">
          <div className="space-y-4">
            {settings.constantSpeed ? (
              // Single slider for constant speed
              <div>
                <div className="flex justify-between mb-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label
                        htmlFor="constantSpeedValue"
                        className="text-sm font-medium"
                      >
                        Constant Speed
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>All boids will move at exactly this speed</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm text-muted-foreground">
                    {settings.constantSpeedValue}
                  </span>
                </div>
                <Slider
                  id="constantSpeedValue"
                  min={1}
                  max={30}
                  step={1}
                  value={[settings.constantSpeedValue]}
                  onValueChange={(value) => {
                    updateSetting("constantSpeedValue", value[0]);
                  }}
                />
              </div>
            ) : (
              // Range slider for variable speed
              <div>
                <div className="flex justify-between mb-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label
                        htmlFor="speedRange"
                        className="text-sm font-medium"
                      >
                        Speed Range
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Minimum and maximum speed that boids can travel</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm text-muted-foreground">
                    {settings.minSpeedLimit} - {settings.speedLimit}
                  </span>
                </div>
                <Slider
                  id="speedRange"
                  min={1}
                  max={30}
                  step={1}
                  value={[settings.minSpeedLimit, settings.speedLimit]}
                  onValueChange={(values) => {
                    if (values.length === 2) {
                      updateSetting("minSpeedLimit", values[0]);
                      updateSetting("speedLimit", values[1]);
                    }
                  }}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="constantSpeed"
                      className="text-sm font-medium"
                    >
                      Constant Speed
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      All boids move at exactly the same speed instead of
                      varying speeds
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                id="constantSpeed"
                checked={settings.constantSpeed}
                onCheckedChange={(checked) =>
                  updateSetting("constantSpeed", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="wraparoundMode"
                      className="text-sm font-medium"
                    >
                      Wraparound Mode
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Boids wrap around the edges of the canvas instead of
                      bouncing off. Automatically deactivates margins.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                id="wraparoundMode"
                checked={settings.wraparoundMode}
                onCheckedChange={(checked) =>
                  updateSetting("wraparoundMode", checked)
                }
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Flocking Behavior Settings */}
      <Collapsible
        open={expandedSections.flocking}
        onOpenChange={() => toggleSection("flocking")}
        className="border rounded-md"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 hover:bg-muted/50">
          <h3 className="text-sm font-semibold">Flocking Behavior</h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.flocking ? "transform rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-3 pt-1">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="visualRange"
                      className="text-sm font-medium"
                    >
                      Perception Range
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>How far each boid can see other boids</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm text-muted-foreground">
                  {settings.visualRange}
                </span>
              </div>
              <Slider
                id="visualRange"
                min={10}
                max={200}
                step={1}
                value={[settings.visualRange]}
                onValueChange={(value) =>
                  updateSetting("visualRange", value[0])
                }
                onValueCommit={() => setShowVisualRange(false)}
                onPointerDown={() => {
                  console.log(
                    "Visual range slider clicked, setting showVisualRange to true",
                  );
                  // Use a callback to ensure we're working with the latest state
                  setShowVisualRange(true);
                }}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="centeringFactor"
                      className="text-sm font-medium"
                    >
                      Cohesion Strength
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      How strongly boids are attracted to the center of their
                      local flock
                    </p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm text-muted-foreground">
                  {settings.centeringFactor.toFixed(4)}
                </span>
              </div>
              <Slider
                id="centeringFactor"
                min={0.0001}
                max={0.01}
                step={0.0001}
                value={[settings.centeringFactor]}
                onValueChange={(value) =>
                  updateSetting("centeringFactor", value[0])
                }
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="minDistance"
                      className="text-sm font-medium"
                    >
                      Separation Distance
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      How close boids can get to each other before they start to
                      separate
                    </p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm text-muted-foreground">
                  {settings.minDistance}
                </span>
              </div>
              <Slider
                id="minDistance"
                min={5}
                max={50}
                step={1}
                value={[settings.minDistance]}
                onValueChange={(value) =>
                  updateSetting("minDistance", value[0])
                }
                onValueCommit={() => setShowMinDistance(false)}
                onPointerDown={() => {
                  console.log(
                    "Min distance slider clicked, setting showMinDistance to true",
                  );
                  // Use a callback to ensure we're working with the latest state
                  setShowMinDistance(true);
                }}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="avoidFactor"
                      className="text-sm font-medium"
                    >
                      Separation Strength
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>How strongly boids avoid colliding with each other</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm text-muted-foreground">
                  {settings.avoidFactor.toFixed(3)}
                </span>
              </div>
              <Slider
                id="avoidFactor"
                min={0.001}
                max={0.1}
                step={0.001}
                value={[settings.avoidFactor]}
                onValueChange={(value) =>
                  updateSetting("avoidFactor", value[0])
                }
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="matchingFactor"
                      className="text-sm font-medium"
                    >
                      Alignment Strength
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      How strongly boids try to match velocity with nearby boids
                    </p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm text-muted-foreground">
                  {settings.matchingFactor.toFixed(3)}
                </span>
              </div>
              <Slider
                id="matchingFactor"
                min={0.001}
                max={0.1}
                step={0.001}
                value={[settings.matchingFactor]}
                onValueChange={(value) =>
                  updateSetting("matchingFactor", value[0])
                }
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Boundary Settings */}
      <Collapsible
        open={expandedSections.boundary}
        onOpenChange={() => toggleSection("boundary")}
        className={`border rounded-md ${settings.wraparoundMode ? "opacity-70" : ""}`}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 hover:bg-muted/50">
          <h3
            className={`text-sm font-semibold ${settings.wraparoundMode ? "text-muted-foreground" : ""}`}
          >
            Boundary Behavior
          </h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.boundary ? "transform rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-3 pt-1">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="marginFraction"
                      className={`text-sm font-medium ${settings.wraparoundMode ? "text-muted-foreground" : ""}`}
                    >
                      Boundary Width
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      How close boids can get to the edge before turning away
                    </p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm text-muted-foreground">
                  {settings.marginFraction.toFixed(2)}
                </span>
              </div>
              <Slider
                id="marginFraction"
                min={0.01}
                max={0.3}
                step={0.01}
                value={[settings.marginFraction]}
                onValueChange={(value) =>
                  updateSetting("marginFraction", value[0])
                }
                onValueCommit={() => setShowMargins(false)}
                onPointerDown={() => {
                  console.log(
                    "Margin slider clicked, setting showMargins to true",
                  );
                  // Use a callback to ensure we're working with the latest state
                  setShowMargins(true);
                }}
                disabled={settings.wraparoundMode}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="turnFactor"
                      className={`text-sm font-medium ${settings.wraparoundMode ? "text-muted-foreground" : ""}`}
                    >
                      Boundary Avoidance
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>How sharply boids turn when approaching boundaries</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm text-muted-foreground">
                  {settings.turnFactor.toFixed(2)}
                </span>
              </div>
              <Slider
                id="turnFactor"
                min={0.1}
                max={5}
                step={0.1}
                value={[settings.turnFactor]}
                onValueChange={(value) => updateSetting("turnFactor", value[0])}
                disabled={settings.wraparoundMode}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="mt-6">
        <Button variant="outline" className="w-full" onClick={resetSimulation}>
          Reset Simulation
        </Button>
      </div>
    </div>
  );
};

// Add new component for boid information display
const BoidInfoWindow = ({
  boid,
  onClose,
}: {
  boid: Boid | null;
  onClose: () => void;
}) => {
  if (!boid) return null;

  // Calculate speed
  const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
  // Calculate direction in degrees
  const direction = (Math.atan2(boid.dy, boid.dx) * 180) / Math.PI;

  return (
    <div className="absolute top-16 left-4 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg z-20 border p-4 min-w-[200px]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Boid #{boid.id}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          ✕
        </Button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <span className="text-muted-foreground">Position:</span>
          <span>
            ({Math.round(boid.x)}, {Math.round(boid.y)})
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-muted-foreground">Velocity:</span>
          <span>
            ({Math.round(boid.dx * 100) / 100},{" "}
            {Math.round(boid.dy * 100) / 100})
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-muted-foreground">Speed:</span>
          <span>{Math.round(speed * 100) / 100}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-muted-foreground">Direction:</span>
          <span>{Math.round(direction)}°</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-muted-foreground">Trail Length:</span>
          <span>{boid.history.length}</span>
        </div>
      </div>
    </div>
  );
};

const BoidsSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const boidsRef = useRef<Boid[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // State for tracking which settings sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    population: true,
    appearance: true,
    movement: true,
    flocking: true,
    boundary: true,
  });

  // Function to toggle a specific section
  const toggleSection = (
    section: "population" | "appearance" | "movement" | "flocking" | "boundary",
  ) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Add state to track if visual range slider is being interacted with
  const [showVisualRange, setShowVisualRange] = useState(false);
  // Add a ref to track the visual range interaction state to avoid closure issues
  const showVisualRangeRef = useRef(false);
  // Add state to track if margin slider is being interacted with
  const [showMargins, setShowMargins] = useState(false);
  // Add a ref to track the margin interaction state to avoid closure issues
  const showMarginsRef = useRef(false);
  // Add state to track if minDistance slider is being interacted with
  const [showMinDistance, setShowMinDistance] = useState(false);
  // Add a ref to track the minDistance interaction state to avoid closure issues
  const showMinDistanceRef = useRef(false);
  // Add refs for the behavior functions to access current settings without dependencies
  const settingsRef = useRef<SimulationSettings>(DEFAULT_SETTINGS);

  // Initialize all settings with default values
  const [settings, setSettings] =
    useState<SimulationSettings>(DEFAULT_SETTINGS);

  // Update settingsRef when settings change
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Add a separate effect to monitor showVisualRange changes
  useEffect(() => {
    console.log("showVisualRange changed:", showVisualRange);
    // Update the ref when the state changes
    showVisualRangeRef.current = showVisualRange;
  }, [showVisualRange]);

  // Add a separate effect to monitor showMargins changes
  useEffect(() => {
    console.log("showMargins changed:", showMargins);
    // Update the ref when the state changes
    showMarginsRef.current = showMargins;
  }, [showMargins]);

  // Add a separate effect to monitor showMinDistance changes
  useEffect(() => {
    console.log("showMinDistance changed:", showMinDistance);
    // Update the ref when the state changes
    showMinDistanceRef.current = showMinDistance;
  }, [showMinDistance]);

  const [selectedBoidId, setSelectedBoidId] = useState<number | null>(null);

  // Function to get the currently selected boid with live data
  const getSelectedBoid = () => {
    console.log("getSelectedBoid called with selectedBoidId:", selectedBoidId);
    if (!selectedBoidId) return null;
    return boidsRef.current.find((boid) => boid.id === selectedBoidId) || null;
  };

  // Function to check if a point is inside a boid
  const isPointInBoid = (x: number, y: number, boid: Boid, scale: number) => {
    const boidSize = 15 * scale;
    const boidWidth = 5 * scale;

    // Convert point to boid's local coordinate system
    const dx = x - boid.x;
    const dy = y - boid.y;
    const angle = Math.atan2(boid.dy, boid.dx);

    // Rotate point to boid's orientation
    const rotatedX = dx * Math.cos(-angle) - dy * Math.sin(-angle);
    const rotatedY = dx * Math.sin(-angle) + dy * Math.cos(-angle);

    // Check if point is inside boid triangle
    return (
      rotatedX >= -boidSize &&
      rotatedX <= 0 &&
      Math.abs(rotatedY) <= boidWidth * (1 + rotatedX / boidSize)
    );
  };

  // Function to handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const settings = settingsRef.current;

    // Find clicked boid
    const clickedBoid = boidsRef.current.find((boid) =>
      isPointInBoid(x, y, boid, settings.scale),
    );

    setSelectedBoidId(clickedBoid?.id || null);
  };

  // Modify initBoids to include IDs
  const initBoids = (width: number, height: number, numBoids: number) => {
    const boids: Boid[] = [];
    const settings = settingsRef.current;

    for (let i = 0; i < numBoids; i++) {
      let dx, dy;

      if (settings.constantSpeed) {
        const angle = Math.random() * Math.PI * 2;
        dx = Math.cos(angle) * settings.constantSpeedValue;
        dy = Math.sin(angle) * settings.constantSpeedValue;
      } else {
        const speedRange = settings.speedLimit - settings.minSpeedLimit;
        const randomSpeed = settings.minSpeedLimit + Math.random() * speedRange;
        const angle = Math.random() * Math.PI * 2;
        dx = Math.cos(angle) * randomSpeed;
        dy = Math.sin(angle) * randomSpeed;
      }

      boids.push({
        id: i + 1,
        x: Math.random() * width,
        y: Math.random() * height,
        dx: dx,
        dy: dy,
        history: [],
      });
    }
    return boids;
  };

  // Handle setting changes
  const updateSetting = <K extends keyof SimulationSettings>(
    key: K,
    value: SimulationSettings[K],
  ) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };

      // Ensure minSpeedLimit is always less than speedLimit
      if (
        key === "minSpeedLimit" &&
        newSettings.minSpeedLimit >= newSettings.speedLimit
      ) {
        newSettings.minSpeedLimit = Math.max(1, newSettings.speedLimit - 1);
      } else if (
        key === "speedLimit" &&
        newSettings.speedLimit <= newSettings.minSpeedLimit
      ) {
        newSettings.speedLimit = Math.min(30, newSettings.minSpeedLimit + 1);
      }

      // Only reinitialize boids if numBoids or constantSpeed changes
      // Speed changes will gradually take effect through the limitSpeed function
      if (
        (key === "numBoids" || key === "constantSpeed") &&
        canvasRef.current
      ) {
        setTimeout(() => {
          // Use the extracted initBoids function
          const width = canvasRef.current!.width;
          const height = canvasRef.current!.height;
          boidsRef.current = initBoids(width, height, newSettings.numBoids);
        }, 0);
      }

      return newSettings;
    });
  };

  const distance = (boid1: Boid, boid2: Boid) => {
    const settings = settingsRef.current;

    let dx = boid1.x - boid2.x;
    let dy = boid1.y - boid2.y;

    // If in wraparound mode, adjust distance calculation for boids that might be closer
    // across the canvas boundary than directly
    if (settings.wraparoundMode && canvasRef.current) {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      // Check if the boids are closer when wrapped around the x-axis
      if (Math.abs(dx) > width / 2) {
        dx = dx > 0 ? dx - width : dx + width;
      }

      // Check if the boids are closer when wrapped around the y-axis
      if (Math.abs(dy) > height / 2) {
        dy = dy > 0 ? dy - height : dy + height;
      }
    }

    return Math.sqrt(dx * dx + dy * dy);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`,
          );
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
      }
    }
  };

  // Reset simulation by reinitializing boids with current settings
  const resetSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    // Use the extracted initBoids function
    boidsRef.current = initBoids(width, height, settings.numBoids);
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Define boid behavior functions outside useEffect to avoid recreating them
  const keepWithinBounds = useCallback(
    (boid: Boid, width: number, height: number) => {
      const settings = settingsRef.current;

      if (settings.wraparoundMode) {
        // Wraparound mode - boids leaving one edge appear on the opposite edge
        if (boid.x < 0) boid.x = width;
        if (boid.x > width) boid.x = 0;
        if (boid.y < 0) boid.y = height;
        if (boid.y > height) boid.y = 0;
      } else {
        // Original bounded mode - boids turn away from edges
        const marginX = width * settings.marginFraction;
        const marginY = height * settings.marginFraction;

        // Scale the turn factor based on the scale parameter
        const scaledTurnFactor = settings.turnFactor / settings.scale;

        if (boid.x < marginX) boid.dx += scaledTurnFactor;
        if (boid.x > width - marginX) boid.dx -= scaledTurnFactor;
        if (boid.y < marginY) boid.dy += scaledTurnFactor;
        if (boid.y > height - marginY) boid.dy -= scaledTurnFactor;
      }
    },
    [],
  );

  // MUST be defined before other useCallbacks that depend on it
  const hexToRgba = useCallback((hex: string, alpha: number): string => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }, []);

  const applyCohesion = useCallback((boid: Boid, boids: Boid[]) => {
    const settings = settingsRef.current;
    let centerX = 0;
    let centerY = 0;
    let numNeighbors = 0;

    // Apply scale to visual range for behavior calculations
    const scaledVisualRange = settings.visualRange * settings.scale;

    for (const otherBoid of boids) {
      if (distance(boid, otherBoid) < scaledVisualRange) {
        centerX += otherBoid.x;
        centerY += otherBoid.y;
        numNeighbors += 1;
      }
    }

    if (numNeighbors) {
      centerX = centerX / numNeighbors;
      centerY = centerY / numNeighbors;
      boid.dx += (centerX - boid.x) * settings.centeringFactor;
      boid.dy += (centerY - boid.y) * settings.centeringFactor;
    }
  }, []);

  const applySeparation = useCallback((boid: Boid, boids: Boid[]) => {
    const settings = settingsRef.current;
    let moveX = 0;
    let moveY = 0;

    // Apply scale to minimum distance for behavior calculations
    const scaledMinDistance = settings.minDistance * settings.scale;

    for (const otherBoid of boids) {
      if (otherBoid !== boid) {
        if (distance(boid, otherBoid) < scaledMinDistance) {
          moveX += boid.x - otherBoid.x;
          moveY += boid.y - otherBoid.y;
        }
      }
    }

    boid.dx += moveX * settings.avoidFactor;
    boid.dy += moveY * settings.avoidFactor;
  }, []);

  const applyAlignment = useCallback((boid: Boid, boids: Boid[]) => {
    const settings = settingsRef.current;
    let avgDX = 0;
    let avgDY = 0;
    let numNeighbors = 0;

    // Apply scale to visual range for behavior calculations
    const scaledVisualRange = settings.visualRange * settings.scale;

    for (const otherBoid of boids) {
      if (distance(boid, otherBoid) < scaledVisualRange) {
        avgDX += otherBoid.dx;
        avgDY += otherBoid.dy;
        numNeighbors += 1;
      }
    }

    if (numNeighbors) {
      avgDX = avgDX / numNeighbors;
      avgDY = avgDY / numNeighbors;
      boid.dx += (avgDX - boid.dx) * settings.matchingFactor;
      boid.dy += (avgDY - boid.dy) * settings.matchingFactor;
    }
  }, []);

  const limitSpeed = useCallback((boid: Boid) => {
    const settings = settingsRef.current;
    const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);

    // Scale the speed values based on the scale parameter
    const scaledMaxSpeedLimit = settings.speedLimit * Math.sqrt(settings.scale);
    const scaledMinSpeedLimit =
      settings.minSpeedLimit * Math.sqrt(settings.scale);
    const scaledConstantSpeed =
      settings.constantSpeedValue * Math.sqrt(settings.scale);

    if (settings.constantSpeed) {
      // In constant speed mode, normalize to the exact constant speed value
      boid.dx = (boid.dx / speed) * scaledConstantSpeed;
      boid.dy = (boid.dy / speed) * scaledConstantSpeed;
    } else {
      // In variable speed mode, cap if outside the range
      if (speed > scaledMaxSpeedLimit) {
        // Cap maximum speed
        boid.dx = (boid.dx / speed) * scaledMaxSpeedLimit;
        boid.dy = (boid.dy / speed) * scaledMaxSpeedLimit;
      } else if (speed < scaledMinSpeedLimit && speed > 0) {
        // Enforce minimum speed (but only if the boid is actually moving)
        boid.dx = (boid.dx / speed) * scaledMinSpeedLimit;
        boid.dy = (boid.dy / speed) * scaledMinSpeedLimit;
      }
    }
  }, []);

  // Helper function to draw a single boid shape
  const drawBoidShape = (
    ctx: CanvasRenderingContext2D,
    boid: Boid,
    color: string,
    scale: number,
  ) => {
    const angle = Math.atan2(boid.dy, boid.dx);
    ctx.translate(boid.x, boid.y);
    ctx.rotate(angle);
    ctx.translate(-boid.x, -boid.y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(boid.x, boid.y);
    // Apply scale to the boid shape
    const boidSize = 15 * scale;
    const boidWidth = 5 * scale;
    ctx.lineTo(boid.x - boidSize, boid.y + boidWidth);
    ctx.lineTo(boid.x - boidSize, boid.y - boidWidth);
    ctx.lineTo(boid.x, boid.y);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  const drawBoid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      boid: Boid,
      hexToRgbaFn: typeof hexToRgba,
    ) => {
      const settings = settingsRef.current;

      // Draw the main boid
      drawBoidShape(ctx, boid, settings.boidColor, settings.scale);

      // If in wraparound mode and canvas is available, draw ghost boids near edges
      if (settings.wraparoundMode && canvasRef.current) {
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const edgeThreshold = 30; // Distance from edge to start showing ghost
        const ghostColor = hexToRgbaFn(settings.boidColor, 0.3); // Use passed hexToRgbaFn

        // Create temporary ghost boids
        const ghostBoids = [];

        // Check if boid is near horizontal edges
        if (boid.x < edgeThreshold) {
          // Create ghost on right side
          ghostBoids.push({
            ...boid,
            x: boid.x + width,
          });
        } else if (boid.x > width - edgeThreshold) {
          // Create ghost on left side
          ghostBoids.push({
            ...boid,
            x: boid.x - width,
          });
        }

        // Check if boid is near vertical edges
        if (boid.y < edgeThreshold) {
          // Create ghost on bottom side
          ghostBoids.push({
            ...boid,
            y: boid.y + height,
          });
        } else if (boid.y > height - edgeThreshold) {
          // Create ghost on top side
          ghostBoids.push({
            ...boid,
            y: boid.y - height,
          });
        }

        // Draw all ghost boids
        for (const ghostBoid of ghostBoids) {
          drawBoidShape(ctx, ghostBoid, ghostColor, settings.scale);
        }
      }

      if (settings.drawTrail) {
        // Use the trail color with 40% opacity
        ctx.strokeStyle = hexToRgbaFn(settings.trailColor, 0.4);
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

      // Draw visual range indicator when slider is being interacted with
      if (showVisualRangeRef.current) {
        // Create a semi-transparent version of the boid color
        const boidColorRgb = hexToRgbaFn(settings.boidColor, 0.1);

        ctx.beginPath();
        // Apply scale to the visual range indicator
        ctx.arc(
          boid.x,
          boid.y,
          settings.visualRange * settings.scale,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = boidColorRgb;
        ctx.fillStyle = boidColorRgb;
        ctx.fill();
        ctx.stroke();
      }

      // Draw minimum distance indicator when slider is being interacted with
      if (showMinDistanceRef.current) {
        // Create a semi-transparent version of the boid color with a different opacity
        const minDistanceColor = hexToRgbaFn(settings.boidColor, 0.2);

        ctx.beginPath();
        // Apply scale to the minimum distance indicator
        ctx.arc(
          boid.x,
          boid.y,
          settings.minDistance * settings.scale,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = minDistanceColor;
        ctx.fillStyle = minDistanceColor;
        ctx.fill();
        ctx.stroke();
      }
    },
    [],
  );

  // Function to draw the margins on the canvas
  const drawMargins = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      if (!showMarginsRef.current || settingsRef.current.wraparoundMode) return;
      const currentSettings = settingsRef.current;
      const marginColor = hexToRgba(currentSettings.boidColor, 0.1); // Use hexToRgba from outer scope
      ctx.fillStyle = marginColor;
      ctx.strokeStyle = hexToRgba(currentSettings.boidColor, 0.3);
      const marginX = width * currentSettings.marginFraction;
      const marginY = height * currentSettings.marginFraction;

      // Draw the margin areas
      ctx.beginPath();
      ctx.rect(0, 0, marginX, height);
      ctx.fill();
      ctx.stroke();

      // Right margin
      ctx.beginPath();
      ctx.rect(width - marginX, 0, marginX, height);
      ctx.fill();
      ctx.stroke();

      // Top margin
      ctx.beginPath();
      ctx.rect(0, 0, width, marginY);
      ctx.fill();
      ctx.stroke();

      // Bottom margin
      ctx.beginPath();
      ctx.rect(0, height - marginY, width, marginY);
      ctx.fill();
      ctx.stroke();
    },
    [hexToRgba],
  );

  // Function to draw a subtle grid on the canvas when in wraparound mode
  const drawWraparoundGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      if (!settingsRef.current.wraparoundMode) return;
      const currentSettings = settingsRef.current;
      const gridColor = hexToRgba(currentSettings.boidColor, 0.1); // Use hexToRgba from outer scope
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Draw vertical center line
      ctx.beginPath();
      ctx.setLineDash([5, 5]); // Create a dashed line
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Draw horizontal center line
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Reset line dash
      ctx.setLineDash([]);
    },
    [hexToRgba],
  );

  // Function to update a single frame
  const updateFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const boids = boidsRef.current;
    const width = canvas.width;
    const height = canvas.height;

    for (const boid of boids) {
      applyCohesion(boid, boids);
      applySeparation(boid, boids);
      applyAlignment(boid, boids);
      limitSpeed(boid);
      keepWithinBounds(boid, width, height);

      boid.x += boid.dx;
      boid.y += boid.dy;
      boid.history.push([boid.x, boid.y]);
      boid.history = boid.history.slice(-50);
    }

    ctx.clearRect(0, 0, width, height);
    boids.forEach((currentBoid) => {
      drawBoid(ctx, currentBoid, hexToRgba);
    });

    drawMargins(ctx, width, height);
    drawWraparoundGrid(ctx, width, height);
  }, [
    hexToRgba,
    applyCohesion,
    applySeparation,
    applyAlignment,
    limitSpeed,
    keepWithinBounds,
    drawBoid,
    drawMargins,
    drawWraparoundGrid,
  ]);

  // Setup the animation loop only once
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const animationLoop = () => {
      if (!isPaused) {
        updateFrame();
      }

      animationFrameRef.current = requestAnimationFrame(animationLoop);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animationLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, updateFrame]);

  // Separate effect for initialization and resize handling
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Create a ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(() => {
      // Get the container's dimensions
      const containerRect = container.getBoundingClientRect();

      // Update canvas size to match container
      canvas.width = containerRect.width;
      canvas.height = containerRect.height;

      // Reinitialize boids with new dimensions using the extracted function
      boidsRef.current = initBoids(
        canvas.width,
        canvas.height,
        settingsRef.current.numBoids,
      );
    });

    // Start observing the container
    resizeObserver.observe(container);

    // Initial size adjustment
    const containerRect = container.getBoundingClientRect();
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;
    boidsRef.current = initBoids(
      canvas.width,
      canvas.height,
      settingsRef.current.numBoids,
    );

    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array means this only runs once

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative ${isFullscreen ? "bg-black" : ""}`}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full rounded-lg border-2 ${settings.wraparoundMode ? "border-dashed border-opacity-50" : "border-opacity-0"}`}
        style={{
          borderColor: settings.wraparoundMode
            ? settings.boidColor
            : "transparent",
        }}
        onClick={handleCanvasClick}
      />

      {/* Boid Information Window */}
      <BoidInfoWindow
        boid={getSelectedBoid()}
        onClose={() => setSelectedBoidId(null)}
      />

      {/* Fixed control panel that works in fullscreen */}
      <div className={`absolute top-4 right-4 flex gap-2 z-10`}>
        <Button
          variant="outline"
          onClick={resetSimulation}
          aria-label="Reset simulation"
        >
          Reset
        </Button>

        <Button
          variant="default"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </Button>

        <Button
          variant="secondary"
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? "Hide Controls" : "Show Controls"}
        </Button>

        <Button
          variant={isPaused ? "default" : "outline"}
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Resume simulation" : "Pause simulation"}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
      </div>

      {/* Overlay control panel for fullscreen mode */}
      {showControls && (
        <div className="absolute top-16 right-4 max-w-md bg-background/95 backdrop-blur-sm rounded-lg shadow-lg z-20 border p-4 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Controls</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowControls(false)}
              className="h-8 w-8 p-0"
            >
              ✕
            </Button>
          </div>
          <BoidsControlPanel
            settings={settings}
            updateSetting={updateSetting}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            setShowVisualRange={setShowVisualRange}
            setShowMinDistance={setShowMinDistance}
            setShowMargins={setShowMargins}
            resetSimulation={resetSimulation}
          />
        </div>
      )}
    </div>
  );
};

export default BoidsSimulation;

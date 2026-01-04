"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CrtSubpixelProcessor } from "crt-subpixel";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  CameraOff,
  Download,
  ImageIcon,
  Rows3,
  Columns3,
  Upload,
} from "lucide-react";

export default function CrtDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const processorRef = useRef<CrtSubpixelProcessor | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"image" | "camera">("image");

  // Camera state
  const [isCameraRunning, setIsCameraRunning] = useState(false);

  // Image state
  const [currentImage, setCurrentImage] = useState<ImageBitmap | null>(null);
  const [hasImage, setHasImage] = useState(false);

  // Settings
  const [orientation, setOrientation] = useState<"columns" | "rows">("columns");
  const [pixelDensity, setPixelDensity] = useState(1);
  const [interlaced, setInterlaced] = useState(false);

  // Initialize processor
  useEffect(() => {
    const initProcessor = async () => {
      try {
        const processor = new CrtSubpixelProcessor();
        await processor.init();
        processorRef.current = processor;
        setIsInitialized(true);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to initialize WebGPU. Make sure you're using a compatible browser (Chrome/Edge).",
        );
        setIsLoading(false);
      }
    };

    initProcessor();

    return () => {
      if (processorRef.current) {
        processorRef.current.destroy();
      }
    };
  }, []);

  // Apply settings when they change
  useEffect(() => {
    if (!processorRef.current || !isInitialized) return;

    processorRef.current.setOrientation(orientation);
    processorRef.current.setPixelDensity(pixelDensity);
    processorRef.current.setInterlaced(interlaced);

    // Re-render current image if in image mode
    if (mode === "image" && currentImage && canvasRef.current) {
      processorRef.current.renderImage(canvasRef.current, currentImage);
    }
  }, [
    orientation,
    pixelDensity,
    interlaced,
    isInitialized,
    mode,
    currentImage,
  ]);

  // Handle image upload
  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !processorRef.current || !canvasRef.current) return;

      try {
        const bitmap = await createImageBitmap(file);
        setCurrentImage(bitmap);
        setHasImage(true);
        await processorRef.current.renderImage(canvasRef.current, bitmap);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to process image",
        );
      }
    },
    [],
  );

  // Start camera
  const startCamera = useCallback(async () => {
    if (!processorRef.current || !canvasRef.current) return;

    try {
      await processorRef.current.startCamera(canvasRef.current);
      setIsCameraRunning(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to access camera. Please ensure camera permissions are granted.",
      );
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (!processorRef.current) return;
    processorRef.current.stopCamera();
    setIsCameraRunning(false);
  }, []);

  // Handle mode change
  const handleModeChange = useCallback(
    (newMode: string) => {
      if (newMode === mode) return;

      // Stop camera if switching away from camera mode
      if (mode === "camera" && isCameraRunning) {
        stopCamera();
      }

      setMode(newMode as "image" | "camera");
    },
    [mode, isCameraRunning, stopCamera],
  );

  // Download processed image
  const handleDownload = useCallback(async () => {
    if (!processorRef.current) return;

    let blob: Blob | null = null;

    if (mode === "camera" && isCameraRunning) {
      blob = await processorRef.current.exportCameraFrame("image/png");
    } else if (mode === "image" && currentImage) {
      blob = await processorRef.current.exportImage(currentImage, "image/png");
    }

    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `crt-subpixel-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [mode, isCameraRunning, currentImage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-zinc-900/50 rounded-lg">
        <div className="text-zinc-400 animate-pulse">
          Initializing WebGPU...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-zinc-900/50 rounded-lg p-6">
        <div className="text-center">
          <p className="text-red-400 mb-2">Error</p>
          <p className="text-zinc-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Mode Tabs */}
      <Tabs value={mode} onValueChange={handleModeChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800/50">
          <TabsTrigger
            value="image"
            className="data-[state=active]:bg-zinc-700"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Image
          </TabsTrigger>
          <TabsTrigger
            value="camera"
            className="data-[state=active]:bg-zinc-700"
          >
            <Camera className="w-4 h-4 mr-2" />
            Camera
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="mt-4">
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex-1 border-zinc-700 hover:bg-zinc-800"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            {hasImage && (
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="camera" className="mt-4">
          <div className="flex gap-2">
            {!isCameraRunning ? (
              <Button
                onClick={startCamera}
                variant="outline"
                className="flex-1 border-zinc-700 hover:bg-zinc-800"
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
            ) : (
              <>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="flex-1 border-red-700 hover:bg-red-900/30 text-red-400"
                >
                  <CameraOff className="w-4 h-4 mr-2" />
                  Stop Camera
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Capture
                </Button>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Canvas */}
      <div className="flex-1 bg-black rounded-lg overflow-hidden flex items-center justify-center min-h-[300px]">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full object-contain"
          style={{
            display: hasImage || isCameraRunning ? "block" : "none",
          }}
        />
        {!hasImage && !isCameraRunning && (
          <div className="text-zinc-600 text-center p-8">
            {mode === "image" ? (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="w-12 h-12 opacity-50" />
                <p>Upload an image to apply the CRT effect</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Camera className="w-12 h-12 opacity-50" />
                <p>Start the camera to see the CRT effect live</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="bg-zinc-800/30 rounded-lg p-4 space-y-4">
        <h3 className="text-sm font-medium text-zinc-300">Settings</h3>

        {/* Orientation */}
        <div className="flex items-center justify-between">
          <Label className="text-zinc-400 text-sm">Orientation</Label>
          <div className="flex gap-1">
            <Button
              variant={orientation === "columns" ? "default" : "outline"}
              size="sm"
              onClick={() => setOrientation("columns")}
              className={
                orientation === "columns"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-zinc-700 hover:bg-zinc-800"
              }
            >
              <Columns3 className="w-4 h-4 mr-1" />
              Columns
            </Button>
            <Button
              variant={orientation === "rows" ? "default" : "outline"}
              size="sm"
              onClick={() => setOrientation("rows")}
              className={
                orientation === "rows"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-zinc-700 hover:bg-zinc-800"
              }
            >
              <Rows3 className="w-4 h-4 mr-1" />
              Rows
            </Button>
          </div>
        </div>

        {/* Pixel Density */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-zinc-400 text-sm">
              Pixel Density: {pixelDensity}x
            </Label>
          </div>
          <Slider
            value={[pixelDensity]}
            onValueChange={([value]) => setPixelDensity(value)}
            min={1}
            max={8}
            step={1}
            className="w-full"
          />
        </div>

        {/* Interlaced */}
        <div className="flex items-center justify-between">
          <Label className="text-zinc-400 text-sm">Interlaced</Label>
          <Switch checked={interlaced} onCheckedChange={setInterlaced} />
        </div>
      </div>
    </div>
  );
}

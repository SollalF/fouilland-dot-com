"use client";

import { parseToRgba, rgba, toHex } from "color2k";
import { Pipette } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { RgbaColorPicker, type RgbaColor } from "react-colorful";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const DEFAULT_TRIGGER = (
  <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-300/20 via-violet-300/20 to-indigo-300/20 p-0.5">
    <div className="flex aspect-square h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-pink-300 via-violet-300 to-indigo-300">
      <Pipette className="aspect-square h-3.5 w-3.5 text-white" />
    </div>
  </div>
);

function hexToRgba(hex: string): RgbaColor | null {
  try {
    const [r, g, b, a] = parseToRgba(hex);
    return { r, g, b, a };
  } catch {
    return null;
  }
}

function rgbaToHex(r: number, g: number, b: number, a = 1): string {
  try {
    return toHex(rgba(r, g, b, a));
  } catch {
    return "#000000";
  }
}

function useDebouncedCallback<T extends (...args: never[]) => void>(
  callback: T,
  delay: number,
) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );
}

export type ColorPickerProps = {
  value: string;
  onChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  className?: string;
};

export function ColorPicker({
  value,
  onChange,
  onOpenChange,
  children = DEFAULT_TRIGGER,
  className,
}: ColorPickerProps) {
  const rgba = useMemo(() => hexToRgba(value), [value]);
  const color = useMemo(
    () => ({ hex: value, alpha: rgba?.a ?? 1 }),
    [value, rgba?.a],
  );

  const debouncedOnChange = useDebouncedCallback(onChange, 50);

  const handleColorChange = useCallback(
    (nextColor: RgbaColor) => {
      debouncedOnChange(
        rgbaToHex(nextColor.r, nextColor.g, nextColor.b, nextColor.a),
      );
    },
    [debouncedOnChange],
  );

  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleChangeAlpha = (event: ChangeEvent<HTMLInputElement>) => {
    const newAlpha = Number.parseFloat(event.target.value);
    const current = hexToRgba(color.hex);
    if (!current || Number.isNaN(newAlpha)) return;

    onChange(rgbaToHex(current.r, current.g, current.b, newAlpha));
  };

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "rounded-full transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
          aria-label="Open color picker"
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        side="top"
        className="w-72 p-4"
        sideOffset={8}
      >
        <div className="flex size-full flex-col items-center gap-4">
          <p className="text-sm font-medium">Color picker</p>
          <RgbaColorPicker
            color={rgba ?? { r: 0, g: 0, b: 0, a: 1 }}
            onChange={handleColorChange}
            className="!w-full aspect-square"
          />
          <div className="flex w-full items-center gap-2">
            <span className="shrink-0 text-xs font-medium uppercase">Hex</span>
            <Input
              className="rounded-r-none tracking-widest"
              value={color.hex}
              onChange={handleChangeColor}
            />
            <Input
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={color.alpha.toFixed(2)}
              onChange={handleChangeAlpha}
              className="w-16 rounded-l-none px-2"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

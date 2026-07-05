"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { PropsWithChildren } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  children: React.ReactNode;
}

const DEFAULT_ICON_SIZE = 40;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn(dockVariants({ className }))}>
        {children}
      </div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({
  size = DEFAULT_ICON_SIZE,
  className,
  children,
  ...props
}: DockIconProps) => {
  return (
    <div
      style={{ width: size }}
      className={cn(
        "flex aspect-square shrink-0 cursor-pointer items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };

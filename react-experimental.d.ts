import "react";

/**
 * Type declarations for React experimental features available in Next.js App Router.
 * Next.js bundles react-experimental internally, so ViewTransition and addTransitionType
 * are available at runtime but missing from stable @types/react.
 */
declare module "react" {
  // ViewTransition component
  export const ViewTransition: React.FC<{
    children?: React.ReactNode;
    name?: string;
    default?: string | ViewTransitionClassPerType;
    enter?: string | ViewTransitionClassPerType;
    exit?: string | ViewTransitionClassPerType;
    share?: string | ViewTransitionClassPerType;
    update?: string | ViewTransitionClassPerType;
  }>;

  export type ViewTransitionClassPerType = {
    [type: string]: string;
    default: string;
  };

  // addTransitionType for tagging transitions
  export function addTransitionType(type: string): void;
}

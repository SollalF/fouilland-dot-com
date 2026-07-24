"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  addTransitionType,
  startTransition,
  type ComponentProps,
  type MouseEvent,
} from "react";

type TransitionLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
  /** Transition types applied via addTransitionType (e.g. nav-forward / nav-back). */
  transitionTypes?: string[];
};

/**
 * Link that tags navigations with React transition types so page-level
 * ViewTransitions can pick directional animations.
 *
 * Falls back to plain Link behavior when transitionTypes is omitted, or for
 * modified clicks / external targets.
 */
export function TransitionLink({
  href,
  transitionTypes,
  onClick,
  replace,
  scroll,
  target,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (!transitionTypes?.length) return;
    if (target === "_blank") return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    // External / hash-only: let the browser handle it
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("#")
    ) {
      return;
    }

    event.preventDefault();
    startTransition(() => {
      for (const type of transitionTypes) {
        addTransitionType(type);
      }
      if (replace) {
        router.replace(href, { scroll });
      } else {
        router.push(href, { scroll });
      }
    });
  };

  return (
    <NextLink
      href={href}
      onClick={handleClick}
      replace={replace}
      scroll={scroll}
      target={target}
      {...props}
    />
  );
}

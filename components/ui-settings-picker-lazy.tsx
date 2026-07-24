"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

type UiSettingsPickerProps = ComponentProps<
  typeof import("@/components/ui-settings-picker").UiSettingsPicker
>;

/**
 * Lazy-load the settings picker so react-colorful and related UI
 * stay out of the initial homepage/navbar bundle (bundle-dynamic-imports).
 */
const UiSettingsPickerDynamic = dynamic(
  () =>
    import("@/components/ui-settings-picker").then((m) => m.UiSettingsPicker),
  {
    ssr: false,
    loading: () => <div className="size-12" aria-hidden />,
  },
);

export function UiSettingsPickerLazy(props: UiSettingsPickerProps) {
  return <UiSettingsPickerDynamic {...props} />;
}

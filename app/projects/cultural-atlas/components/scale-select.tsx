import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SCALES, type ScaleId } from "../data/scales";

export function ScaleSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: ScaleId;
  onChange: (value: ScaleId) => void;
}) {
  return (
    <div className="flex min-w-56 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={(next) => onChange(next as ScaleId)}>
        <SelectTrigger id={id} className="w-full" aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SCALES.map((scale) => (
            <SelectItem key={scale.id} value={scale.id}>
              {scale.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

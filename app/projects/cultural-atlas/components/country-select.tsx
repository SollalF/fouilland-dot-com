import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, type CountryId } from "../data/country-scores";

export function CountrySelect({
  id,
  label,
  value,
  excludedId,
  onChange,
}: {
  id: string;
  label: string;
  value: CountryId;
  excludedId: CountryId;
  onChange: (value: CountryId) => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        value={value}
        onValueChange={(next) => onChange(next as CountryId)}
      >
        <SelectTrigger id={id} className="w-full" aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem
              key={country.id}
              value={country.id}
              disabled={country.id === excludedId}
            >
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

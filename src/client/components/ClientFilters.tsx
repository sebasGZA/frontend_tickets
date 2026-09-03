import { Input } from "@/components/ui/input";

interface ClientsFiltersProps {
  term: string;
  onSearchChange: (value: string) => void;
}

export const ClientFilters = ({
  term,
  onSearchChange,
}: ClientsFiltersProps) => (
  <div className="flex items-center gap-3 mb-4">
    <Input
      placeholder="Buscar por nombre o email..."
      value={term}
      onChange={(e) => onSearchChange(e.target.value)}
      className="max-w-sm h-10"
    />
  </div>
);
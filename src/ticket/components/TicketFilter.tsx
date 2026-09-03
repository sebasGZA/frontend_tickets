import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TicketsFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
}

export const TicketsFilters = ({
    search,
    onSearchChange,
    status,
    onStatusChange,
}: TicketsFiltersProps) => (
    <div className="flex items-center gap-3 mb-4">
        <Input
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-sm h-10"
        />

        <Select
            value={status}
            onValueChange={(value) => onStatusChange(value ?? "todos")}
        >
            <SelectTrigger className="w-44 h-10">
                <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="abierto">Abierto</SelectItem>
                <SelectItem value="en_progreso">En progreso</SelectItem>
                <SelectItem value="cerrado">Cerrado</SelectItem>
            </SelectContent>
        </Select>
    </div>
);
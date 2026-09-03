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
            placeholder="Buscar por título, descripcion o cliente..."
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
                <SelectItem value="Abierto">Abierto</SelectItem>
                <SelectItem value="En_proceso">En proceso</SelectItem>
                <SelectItem value="Cerrado">Cerrado</SelectItem>
                <SelectItem value="Reabierto">Reabierto</SelectItem>
            </SelectContent>
        </Select>
    </div>
);
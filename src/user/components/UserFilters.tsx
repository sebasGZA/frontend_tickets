import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface UsersFiltersProps {
    term: string;
    onSearchChange: (value: string) => void;
    role: string;
    onRoleChange: (value: string) => void;
}

export const UsersFilters = ({
    term,
    onSearchChange,
    role,
    onRoleChange,
}: UsersFiltersProps) => (
    <div className="flex items-center gap-3 mb-4">
        <Input
            placeholder="Buscar por nombre o email..."
            value={term}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-sm h-10"
        />

        <Select value={role} onValueChange={(value) => onRoleChange(value ?? "todos")}>
            <SelectTrigger className="w-48 h-10">
                <SelectValue placeholder="Rol" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="todos">Todos los roles</SelectItem>
                <SelectItem value="Admin">Administrador</SelectItem>
                <SelectItem value="Supervisor">Supervisor</SelectItem>
                <SelectItem value="Soporte">Agente de soporte</SelectItem>
            </SelectContent>
        </Select>
    </div>
);
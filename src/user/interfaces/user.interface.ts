export interface User {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Supervisor" | "Soporte";
    isActive: boolean;
    createdAt: string;
}
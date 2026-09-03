export interface User {
    userId: string;
    email: string;
    role: 'Admin' | 'Supervisor' | 'Soporte';
}
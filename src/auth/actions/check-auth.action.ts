import { backendApi } from '@/api/backendApi';
import type { AuthResponse } from '../interfaces/auth-response.interface';

export const checkAuthAction = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        const { data } = await backendApi.get<AuthResponse>('/auth/check-status');

        localStorage.setItem('token', data.token);
        return data;
    } catch (error: any) {
        localStorage.removeItem('token')
        throw new Error('Token invalid')
    }
}
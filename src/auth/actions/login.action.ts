import { backendApi } from "@/api/backendApi"
import type { AuthResponse } from "../interfaces/auth-response.interface";

export const loginAction = async (email: string, password: string) => {
    try {
        const { data } = await backendApi.post<AuthResponse>('/auth/login', {
            email,
            password,
        })

        return data;
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error);
    }
}
import { backendApi } from "@/api/backendApi";
import type { UsersResponse } from "@/user/interfaces/user-response.interface";
import type { User } from "@/user/interfaces/user.interface";

export const getAgentsForSelectAction = async (): Promise<User[]> => {
    const { data } = await backendApi.get<UsersResponse>("/users", {
        params: { role: "Soporte", limit: 100 },
    });
    return data.data;
};
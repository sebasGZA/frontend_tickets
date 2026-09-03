import { backendApi } from "@/api/backendApi";
import type { UsersResponse } from "../interfaces/user-response.interface";
import type { GetUsersParams } from "../interfaces/get-user-params.interface";


export const getUsersAction = async (params: GetUsersParams): Promise<UsersResponse> => {
    const { data } = await backendApi.get<UsersResponse>("/users", { params });
    return data;
};
import { backendApi } from "@/api/backendApi";
import type { UserFormValues } from "../components/UserFrom";
import type { User } from "../interfaces/user.interface";

export const createUserAction = async (values: UserFormValues): Promise<User> => {
    const { data } = await backendApi.post<User>("/users", values);
    return data;
};
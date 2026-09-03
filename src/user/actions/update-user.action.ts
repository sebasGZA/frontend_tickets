import { backendApi } from "@/api/backendApi";
import type { User } from "../interfaces/user.interface";
import type { UserFormValues } from "../components/UserForm";

export const updateUserAction = async (
    id: string,
    values: UserFormValues
): Promise<User> => {
    const payload = { ...values, password: values.password || undefined };

    const { data } = await backendApi.patch<User>(`/users/${id}`, payload);
    return data;
};
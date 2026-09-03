// client/actions/update-client.action.ts
import { backendApi } from "@/api/backendApi";
import type { ClientFormValues } from "../components/ClientForm";
import type { Client } from "../interfaces/client.interface";

export const updateClientAction = async (
  id: string,
  values: ClientFormValues
): Promise<Client> => {
  const { data } = await backendApi.patch<Client>(`/clients/${id}`, values);
  return data;
};
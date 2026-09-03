import { backendApi } from "@/api/backendApi";
import type { ClientFormValues } from "../components/ClientForm";
import type { Client } from "../interfaces/client.interface";

export const createClientAction = async (values: ClientFormValues): Promise<Client> => {
  const { data } = await backendApi.post<Client>("/clients", values);
  return data;
};
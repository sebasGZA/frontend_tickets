import { backendApi } from "@/api/backendApi";
import type { ClientResponse } from "../interfaces/client-response.interface";
import type { GetClientsParams } from "../interfaces/get-clients.interface";

export const getClientsAction = async (params: GetClientsParams): Promise<ClientResponse> => {
  const { data } = await backendApi.get<ClientResponse>("/clients", { params });
  return data;
};
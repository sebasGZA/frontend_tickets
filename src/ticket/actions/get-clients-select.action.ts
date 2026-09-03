import type { Client } from "@/client/interfaces/client.interface";
import { getClientsAction } from "@/client/actions/get-clients.action";

export const getClientsSelectAction = async (): Promise<Client[]> => {
  const { data } = await getClientsAction({})
  return data;
};
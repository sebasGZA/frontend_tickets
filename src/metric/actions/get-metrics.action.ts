import { backendApi } from "@/api/backendApi";
import type { MetricsOverview } from "../interfaces/metrics.interface";

export const getMetricsAction = async (): Promise<MetricsOverview> => {
  const { data } = await backendApi.get<MetricsOverview>("/metrics/dashboard");
  return data;
};
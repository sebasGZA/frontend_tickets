import { useQuery } from "@tanstack/react-query";
import { BarChart3, Clock, AlertCircle, CheckCircle2, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "../components/MetricCard";
import { AgentPerformanceTable } from "../components/AgentPerformanceTable";
import { getMetricsAction } from "../actions/get-metrics.action";

export const MetricsPage = () => {
    const { data: metrics, isLoading, error } = useQuery({
        queryKey: ["metrics"],
        queryFn: getMetricsAction,
        refetchInterval: 1 * 60 * 1000,
    });

    if (isLoading) {
        return <p className="text-muted-foreground">Cargando métricas...</p>;
    }

    if (error) {
        return <p className="text-destructive">Error al cargar las métricas</p>;
    }

    if (!metrics) {
        return <p className="text-muted-foreground">Estructurando datos del servidor...</p>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Métricas</h1>
                <p className="text-muted-foreground mt-1">Dashboard de performance del equipo</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <MetricCard
                    label="Total de tickets"
                    value={metrics.ticketMetrics.totalTickets}
                    icon={<BarChart3 className="h-6 w-6" />}
                />
                <MetricCard
                    label="Abiertos"
                    value={metrics.ticketMetrics.openTickets}
                    icon={<Zap className="h-6 w-6" />}
                />
                <MetricCard
                    label="En proceso"
                    value={metrics.ticketMetrics.inProcessTickets}
                    icon={<Clock className="h-6 w-6" />}
                />
                <MetricCard
                    label="Cerrados"
                    value={metrics.ticketMetrics.closedTickets}
                    icon={<CheckCircle2 className="h-6 w-6" />}
                    variant="success"
                />
                <MetricCard
                    label="Sin iterar"
                    value={metrics.ticketMetrics.overdueTickets}
                    icon={<AlertCircle className="h-6 w-6" />}
                    variant="warning"
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Performance por agente</CardTitle>
                </CardHeader>
                <CardContent>
                    <AgentPerformanceTable data={metrics?.agentPerformance} />
                </CardContent>
            </Card>
        </div>
    );
};
export interface TicketMetric {
    totalTickets: number;
    openTickets: number;
    inProcessTickets: number;
    closedTickets: number;
    overdueTickets: number;
    ticketsByPriority: {
        Baja: number;
        Media: number;
        Alta: number;
        Critica: number;
    }
}

export interface AgentPerformance {
    agentId: string;
    agentName: string;
    ticketsAssigned: number;
    ticketsResolved: number;
}

export interface MetricsOverview {
    ticketMetrics: TicketMetric;
    agentPerformance: AgentPerformance[];
}
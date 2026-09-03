import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MetricsOverview } from "../interfaces/metrics.interface";

interface AgentPerformanceTableProps {
  data: MetricsOverview["agentPerformance"];
}

export const AgentPerformanceTable = ({ data }: AgentPerformanceTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agente</TableHead>
            <TableHead className="text-right">Asignados</TableHead>
            <TableHead className="text-right">Resueltos</TableHead>
            <TableHead className="text-right">Promedio (hrs)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((agent) => {
            const completionRate = agent.ticketsAssigned > 0
              ? ((agent.ticketsResolved / agent.ticketsAssigned) * 100).toFixed(1)
              : "0";

            return (
              <TableRow key={agent.agentId}>
                <TableCell className="font-medium">{agent.agentName}</TableCell>
                <TableCell className="text-right">{agent.ticketsAssigned}</TableCell>
                <TableCell className="text-right">{agent.ticketsResolved}</TableCell>
                <TableCell className="text-right">{completionRate}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
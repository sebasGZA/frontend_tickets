import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

interface MetricCardProps {
    label: string;
    value: string | number;
    subtitle?: string;
    icon?: ReactNode;
    variant?: "default" | "warning" | "success";
}

export const MetricCard = ({
    label,
    value,
    subtitle,
    icon,
    variant = "default",
}: MetricCardProps) => {
    const bgVariants = {
        default: "bg-slate-50",
        warning: "bg-amber-50",
        success: "bg-emerald-50",
    };

    const textVariants = {
        default: "text-slate-700",
        warning: "text-amber-700",
        success: "text-emerald-700",
    };

    return (
        <Card className={bgVariants[variant]}>
            <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{label}</p>
                        <p className={`text-3xl font-bold ${textVariants[variant]}`}>{value}</p>
                        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
                    </div>
                    {icon && <div className="text-2xl opacity-50">{icon}</div>}
                </div>
            </CardContent>
        </Card>
    );
};
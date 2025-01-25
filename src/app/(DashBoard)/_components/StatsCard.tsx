import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
}

export const StatsCard = ({ title, value }: StatsCardProps) => (
  <Card>
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

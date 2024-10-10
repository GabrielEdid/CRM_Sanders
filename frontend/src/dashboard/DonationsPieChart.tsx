import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

interface RecurringVsUniqueData {
  uniqueDonators: number;
  recurringDonators: number;
}

const COLORS = ["#0088FE", "#00C49F"];

const DonationsPieChart: React.FC = () => {
  const [data, setData] = useState<RecurringVsUniqueData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecurringVsUnique = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/v1/donations/recurring-vs-unique");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: RecurringVsUniqueData = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecurringVsUnique();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Typography>No hay datos para mostrar.</Typography>;

  const chartData = [
    { name: "Únicos", value: data.uniqueDonators },
    { name: "Recurrentes", value: data.recurringDonators },
  ];

  return (
    <Card>
      <CardHeader title="Porcentaje de Donadores Únicos vs Recurrentes" />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={(entry) =>
                `${entry.name}: ${(
                  (entry.value /
                    (data.uniqueDonators + data.recurringDonators)) *
                  100
                ).toFixed(2)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DonationsPieChart;

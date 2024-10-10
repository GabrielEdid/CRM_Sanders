import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

interface TopDonator {
  donatorId: string;
  donatorName: string;
  donatorEmail: string;
  totalAmount: number;
  color: string; // Nueva propiedad
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const TopDonatorsChart: React.FC = () => {
  const [data, setData] = useState<TopDonator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopDonators = async () => {
      try {
        const response = await fetch("/api/v1/donations/top-donators");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: TopDonator[] = await response.json();
        // Asignar colores a cada donador
        const resultWithColors: TopDonator[] = result.map((donator, index) => ({
          ...donator,
          color: COLORS[index % COLORS.length],
        }));
        setData(resultWithColors);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDonators();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card>
      <CardHeader title="Top 5 Donadores" />
      <CardContent>
        {data.length === 0 ? (
          <Typography>No hay donadores para mostrar.</Typography>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="donatorName" />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Bar
                dataKey="totalAmount"
                name="Total Donado"
                label={{
                  position: "top",
                  formatter: (value: number) => `$${value.toLocaleString()}`,
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TopDonatorsChart;

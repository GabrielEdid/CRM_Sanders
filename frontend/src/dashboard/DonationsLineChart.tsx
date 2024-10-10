import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SelectChangeEvent } from "@mui/material/Select"; // Importación añadida

interface DonationTrend {
  date: string; // Formato "YYYY-MM-DD", "YYYY-WW" o "YYYY-MM" o "YYYY"
  totalAmount: number;
}

const DonationsLineChart: React.FC = () => {
  const [data, setData] = useState<DonationTrend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [interval, setInterval] = useState<string>("month"); // Estado para el intervalo

  useEffect(() => {
    const fetchDonationTrend = async () => {
      setLoading(true); // Iniciar la carga
      try {
        const response = await fetch(
          `/api/v1/donations/trend?interval=${interval}`
        ); // Añadir el parámetro 'interval'
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: DonationTrend[] = await response.json();
        setData(result);
        console.log(result);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationTrend();
  }, [interval]); // Refrescar cuando 'interval' cambia

  // Función actualizada con la firma correcta
  const handleIntervalChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setInterval(event.target.value as string);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card>
      <CardHeader title="Tendencia de Donaciones" />
      <CardContent>
        {/* Selector de Intervalo */}
        <FormControl variant="outlined" sx={{ minWidth: 150, marginBottom: 2 }}>
          <InputLabel id="interval-select-label">Intervalo</InputLabel>
          <Select
            labelId="interval-select-label"
            id="interval-select"
            value={interval}
            onChange={handleIntervalChange}
            label="Intervalo"
            autoFocus={true}
          >
            <MenuItem value="day">Día (últimos 30 días)</MenuItem>
            <MenuItem value="week">Semana (últimas 7 semanas)</MenuItem>
            <MenuItem value="month">Mes (últimos 12 meses)</MenuItem>
            <MenuItem value="year">Año (todos los años)</MenuItem>
          </Select>
        </FormControl>

        {data.length === 0 ? (
          <Typography>No hay datos de donaciones para mostrar.</Typography>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(tick) => {
                  // Formatear la fecha para mejorar la visualización
                  if (interval === "day") {
                    // "YYYY-MM-DD" a "MM-DD"
                    return tick.slice(5);
                  }
                  if (interval === "week") {
                    // "YYYY-WW" a "Semana WW"
                    return `Semana ${tick.slice(5)}`;
                  }
                  if (interval === "year") {
                    // "YYYY" a "YYYY"
                    return tick;
                  }
                  // "YYYY-MM" a "MM-YYYY"
                  return tick.slice(5) + "-" + tick.slice(0, 4);
                }}
              />
              <YAxis dataKey="totalAmount" />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalAmount"
                name="Total Donado"
                stroke="#192459"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default DonationsLineChart;

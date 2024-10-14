// DashboardList.tsx
import React, { useEffect, useState } from "react";
import { List, useDataProvider } from "react-admin";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8A2BE2"];

const DashboardList: React.FC = (props) => {
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [topDonatorsData, setTopDonatorsData] = useState<any[]>([]);
  const [donationsByMonthData, setDonationsByMonthData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [
          { data: paymentDataResponse },
          { data: trendDataResponse },
          { data: topDonatorsDataResponse },
          { data: donationsByMonthResponse }, // Nuevo
        ] = await Promise.all([
          dataProvider.getList("paymentMethodDistribution", {
            pagination: { page: 1, perPage: 100 },
            sort: { field: "paymentMethod", order: "ASC" },
            filter: {},
          }),
          dataProvider.getList("donationTrends", {
            pagination: { page: 1, perPage: 100 },
            sort: { field: "date", order: "ASC" },
            filter: {},
          }),
          dataProvider.getList("topDonators", {
            pagination: { page: 1, perPage: 5 },
            sort: { field: "totalAmount", order: "DESC" },
            filter: {},
          }),
          dataProvider.getList("donationsByMonth", {
            pagination: { page: 1, perPage: 12 },
            sort: { field: "month", order: "ASC" },
            filter: {},
          }),
        ]);

        setPaymentData(paymentDataResponse);
        setTrendData(trendDataResponse);
        setTopDonatorsData(topDonatorsDataResponse);
        setDonationsByMonthData(donationsByMonthResponse); // Nuevo
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [dataProvider]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <List {...props} pagination={false} actions={false}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Card sx={{ flex: 1, minWidth: "300px" }}>
          <CardHeader title="Distribución de Métodos de Pago" />
          <CardContent>
            {paymentData.length === 0 ? (
              <Typography>
                No hay datos de métodos de pago para mostrar.
              </Typography>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    dataKey="count"
                    nameKey="paymentMethod"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {paymentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `${value} donaciones`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: "300px" }}>
          <CardHeader title="Tendencia de Donaciones" />
          <CardContent>
            {trendData.length === 0 ? (
              <Typography>No hay datos de tendencia para mostrar.</Typography>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#8884d8"
                    name="Monto Total"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: "300px" }}>
          <CardHeader title="Principales Donadores" />
          <CardContent>
            {topDonatorsData.length === 0 ? (
              <Typography>No hay datos de donadores para mostrar.</Typography>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topDonatorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="donatorName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="totalAmount"
                    fill="#8884d8"
                    name="Monto Donado"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: "300px" }}>
          <CardHeader title="Donaciones por Mes (Último Año)" />
          <CardContent>
            {donationsByMonthData.length === 0 ? (
              <Typography>No hay datos de donaciones para mostrar.</Typography>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={donationsByMonthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickFormatter={(month, index) => {
                      const date = new Date();
                      date.setMonth(month - 1);
                      return date.toLocaleString("es-ES", { month: "short" });
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="totalAmount"
                    fill="#82ca9d"
                    name="Monto Donado"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </List>
  );
};

export default DashboardList;

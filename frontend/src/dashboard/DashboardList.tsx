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

// Colores generales para otros gráficos
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8A2BE2",
  "#FF69B4",
  "#7FFF00",
  "#DC143C",
  "#00CED1",
  "#FFD700",
  "#FF4500",
  "#2E8B57",
];

// Mapeo de colores para métodos de pago
const PAYMENT_METHOD_COLORS: { [key: string]: string } = {
  cash: "	#3e9c35",
  stripe: "#7a73ff",
  transfer: "#114da6",
  // Color por defecto
  default: "#7c1810",
};

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
          // Removemos la petición de 'donationsByMonth' de dataProvider.getList
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
          // dataProvider.getList("donationsByMonth", ...) removido
        ]);

        setPaymentData(paymentDataResponse);
        setTrendData(trendDataResponse);
        setTopDonatorsData(topDonatorsDataResponse);
        setDonationsByMonthData(donationsByMonthResponse);
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
          flexDirection: "column", // Disposición vertical para todos los elementos
          gap: 2,
          justifyContent: "flex-start",
          marginTop: 5,
          width: "100%",
        }}
      >
        {/* Contenedor para las Gráficas de Pastel en fila */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Disposición horizontal
            gap: 2,
            width: "100%",
          }}
        >
          {/* Distribución de Métodos de Pago */}
          <Card sx={{ flex: 1 }}>
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
                          fill={
                            PAYMENT_METHOD_COLORS[entry.paymentMethod] ||
                            PAYMENT_METHOD_COLORS.default
                          } // Color basado en el método de pago
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
        </Box>

        {/* Tendencia de Donaciones */}
        <Card sx={{ width: "100%" }}>
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
                    stroke="#192459"
                    name="Monto Total"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Principales Donadores */}
        <Card sx={{ width: "100%" }}>
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
                  <Bar dataKey="totalAmount" name="Monto Donado">
                    {topDonatorsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Donaciones por Mes (Último Año) */}
        <Card sx={{ width: "100%" }}>
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
                    tickFormatter={(month) => {
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
                    name="Monto Donado"
                    fill="#192459"
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

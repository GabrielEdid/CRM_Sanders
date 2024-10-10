import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PaymentMethodDistribution {
  paymentMethod: string;
  totalAmount: number;
  count: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// Función para traducir los métodos de pago al español
const translatePaymentMethod = (method: string) => {
  switch (method) {
    case "cash":
      return "Efectivo";
    case "transfer":
      return "Transferencia";
    case "stripe":
      return "Stripe"; // Este no se usará, pero se incluye para completitud
    default:
      return method;
  }
};

const PaymentMethodPieChart: React.FC = () => {
  const [data, setData] = useState<PaymentMethodDistribution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethodDistribution = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "/api/v1/donations/payment-method-distribution"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: PaymentMethodDistribution[] = await response.json();

        // Traducir los métodos de pago
        const translatedData = result.map((entry) => ({
          ...entry,
          paymentMethod: translatePaymentMethod(entry.paymentMethod),
        }));

        setData(translatedData);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethodDistribution();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card>
      <CardHeader title="Distribución de Métodos de Pago" />
      <CardContent>
        {data.length === 0 ? (
          <Typography>No hay datos de métodos de pago para mostrar.</Typography>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="paymentMethod"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value} donaciones`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethodPieChart;

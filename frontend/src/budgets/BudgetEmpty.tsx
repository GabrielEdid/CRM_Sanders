import { Stack, Typography } from "@mui/material";
import { CreateButton } from "react-admin";
import useAppBarHeight from "../misc/useAppBarHeight";

export const BudgetEmpty = () => {
  const appbarHeight = useAppBarHeight();
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={3}
      sx={{
        height: `calc(100dvh - ${appbarHeight}px)`,
      }}
    >
      <img src="./img/empty.svg" alt="Presupuestos no encontrados" />
      <Stack gap={0} alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          No se han encontrado presupuestos
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Parece que aún no tienes presupuestos.
        </Typography>
      </Stack>
      <Stack spacing={2} direction="row">
        <CreateButton variant="contained" label="Crear Presupuesto" />
      </Stack>
    </Stack>
  );
};

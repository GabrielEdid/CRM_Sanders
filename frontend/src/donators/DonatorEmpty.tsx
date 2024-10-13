import { Stack, Typography } from "@mui/material";
import { CreateButton } from "react-admin";
import useAppBarHeight from "../misc/useAppBarHeight";

export const DonationEmpty = () => {
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
      <Stack gap={0} alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          No se han encontrado donaciones
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Parece que aún no tienes donaciones.
        </Typography>
      </Stack>
      <Stack spacing={2} direction="row">
        <CreateButton variant="contained" label="Crear Donación" />
      </Stack>
    </Stack>
  );
};

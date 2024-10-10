import { Box, Paper, Typography } from "@mui/material";
import { RecordContextProvider, useListContext } from "react-admin";

import { BudgetCard } from "./BudgetCard";
import { Budget } from "../types";
import { Link } from "react-router-dom";

const times = (nbChildren: number, fn: (key: number) => any) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => (
  <Box display="flex" flexWrap="wrap" width={1008} gap={1}>
    {times(15, (key) => (
      <Paper
        sx={{
          height: 200,
          width: 194,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "grey[200]",
        }}
        key={key}
      />
    ))}
  </Box>
);

const LoadedGridList = () => {
  const { data, error, isPending } = useListContext<Budget>();

  if (isPending || error) return null;

  return (
    <Box
      width="100%"
      gap={1}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)", // 1 column on small screens
        sm: "repeat(2, 1fr)", // 2 columns on small to medium screens
        md: "repeat(4, 1fr)", // 3 columns on medium and up
      }}
      mt={2}
    >
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Link
            to={`/budgets/${record.id}/show`}
            style={{ textDecoration: "none" }}
          >
            <BudgetCard />
          </Link>
        </RecordContextProvider>
      ))}

      {data.length === 0 && <Typography p={2}>No hay presupuestos</Typography>}
    </Box>
  );
};

export const ImageList = () => {
  const { isPending } = useListContext();
  return isPending ? <LoadingGridList /> : <LoadedGridList />;
};

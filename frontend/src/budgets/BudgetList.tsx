import {
  TopToolbar,
  ExportButton,
  CreateButton,
  Pagination,
  useGetIdentity,
  ListBase,
  Title,
  ListToolbar,
  useListContext,
} from "react-admin";

import { ImageList } from "./GridList";

import { Stack } from "@mui/material";
import { BudgetEmpty } from "./BudgetEmpty";

export const BudgetList = () => {
  const { identity } = useGetIdentity();
  if (!identity) return null;
  return (
    <ListBase perPage={25} sort={{ field: "name", order: "ASC" }}>
      <BudgetListLayout />
    </ListBase>
  );
};

const BudgetListLayout = () => {
  const { data, isPending, filterValues } = useListContext();
  const hasFilters = filterValues && Object.keys(filterValues).length > 0;

  if (isPending) return null;
  if (!data?.length && !hasFilters) return <BudgetEmpty />;

  return (
    <Stack direction="row" component="div" marginTop={5}>
      <Stack sx={{ width: "100%" }}>
        <Title title={"Companies"} />
        <ListToolbar actions={<BudgetListActions />} />
        <ImageList />
        <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
      </Stack>
    </Stack>
  );
};

const BudgetListActions = () => {
  return (
    <TopToolbar>
      <ExportButton />
      <CreateButton
        variant="contained"
        label="Nuevo Presupuesto"
        sx={{ marginLeft: 2 }}
      />
    </TopToolbar>
  );
};

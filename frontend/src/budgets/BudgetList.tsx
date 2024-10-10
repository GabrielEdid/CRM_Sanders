import {
  TopToolbar,
  ExportButton,
  CreateButton,
  useGetIdentity,
  ListBase,
  Title,
  ListToolbar,
  useListContext,
  TextInput,
} from "react-admin";

import { ImageList } from "./GridList";

import { Stack } from "@mui/material";
import { BudgetEmpty } from "./BudgetEmpty";

const BudgetFilters = [
  <TextInput
    label="Buscar por nombre"
    source="name"
    alwaysOn
    key="1"
    fullWidth
  />,
];

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
      <Stack sx={{ width: "100%" }} marginBottom={5}>
        <Title title={"Companies"} />
        <ListToolbar filters={BudgetFilters} actions={<BudgetListActions />} />
        <ImageList />
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

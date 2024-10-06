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
  TextInput,
} from "react-admin";

import { ImageList } from "./GridList";

import { Stack } from "@mui/material";
import { DonationEmpty } from "./DonatorEmpty";
import { DonatorListFilter } from "./DonatorListFilter";
const DonatorFilters = [
  <TextInput label="Buscar por nombre" source="name" alwaysOn key="1" />,
];

export const DonatorList = () => {
  const { identity } = useGetIdentity();
  if (!identity) return null;
  return (
    <ListBase
      perPage={25}
      sort={{ field: "name", order: "ASC" }}
      filterDefaultValues={{ name: "" }}
    >
      <DonatorListLayout />
    </ListBase>
  );
};

const DonatorListLayout = () => {
  const { data, isPending, filterValues } = useListContext();
  const hasFilters = filterValues && Object.keys(filterValues).length > 0;

  if (isPending) return null;
  if (!data?.length && !hasFilters) return <DonationEmpty />;

  return (
    <Stack direction="row" component="div" marginTop={5}>
      <DonatorListFilter />
      <Stack sx={{ width: "100%" }}>
        <Title title={"Companies"} />
        <ListToolbar
          filters={DonatorFilters}
          actions={<DonatorListActions />}
        />
        <ImageList />
        <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
      </Stack>
    </Stack>
  );
};

const DonatorListActions = () => {
  return (
    <TopToolbar>
      <ExportButton />
      <CreateButton
        variant="contained"
        label="Nuevo Donador"
        sx={{ marginLeft: 2 }}
      />
    </TopToolbar>
  );
};

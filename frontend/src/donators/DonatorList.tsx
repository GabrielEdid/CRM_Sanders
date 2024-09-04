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
import { DonationEmpty } from "./DonatorEmpty";

export const DonatorList = () => {
  const { identity } = useGetIdentity();
  if (!identity) return null;
  return (
    <ListBase
      perPage={25}
      sort={{ field: "name", order: "ASC" }}
      disableAuthentication
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
    <Stack direction="row" component="div">
      <Stack sx={{ width: "100%" }}>
        <Title title={"Companies"} />
        <ListToolbar actions={<DonatorListActions />} />
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

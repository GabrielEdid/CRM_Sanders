import { FilterList, FilterListItem } from "react-admin";
import { Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { endOfYesterday, startOfWeek, startOfMonth, subMonths } from "date-fns";

export const DonatorListFilter = () => {
  return (
    <Box width="13em" minWidth="13em" order={-1} mr={2} mt={5}>
      <FilterList label="Última Donación" icon={<AccessTimeIcon />}>
        <FilterListItem
          label="Hoy"
          value={{
            "lastDonationDate@gte": endOfYesterday().toISOString(),
            "lastDonationDate@lte": undefined,
          }}
        />
        <FilterListItem
          label="Esta semana"
          value={{
            "lastDonationDate@gte": startOfWeek(new Date()).toISOString(),
            "lastDonationDate@lte": undefined,
          }}
        />
        <FilterListItem
          label="Antes de esta semana"
          value={{
            "lastDonationDate@gte": undefined,
            "lastDonationDate@lte": startOfWeek(new Date()).toISOString(),
          }}
        />
        <FilterListItem
          label="Antes de este mes"
          value={{
            "lastDonationDate@gte": undefined,
            "lastDonationDate@lte": startOfMonth(new Date()).toISOString(),
          }}
        />
        <FilterListItem
          label="Antes del mes pasado"
          value={{
            "lastDonationDate@gte": undefined,
            "lastDonationDate@lte": subMonths(
              startOfMonth(new Date()),
              1
            ).toISOString(),
          }}
        />
      </FilterList>
    </Box>
  );
};

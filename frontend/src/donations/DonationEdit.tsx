import { EditBase, Form, Toolbar } from "react-admin";
import { Card, CardContent, Box } from "@mui/material";

import { DonationInputs } from "./DonationInputs";

export const DonationEdit = () => {
  return (
    <EditBase redirect="create">
      <Box mt={2} display="flex">
        <Box flex="1">
          <Form>
            <Card>
              <CardContent>
                <DonationInputs />
              </CardContent>
              <Toolbar />
            </Card>
          </Form>
        </Box>
      </Box>
    </EditBase>
  );
};

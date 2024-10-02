import { CreateBase, Form, Toolbar } from "react-admin";
import { Card, CardContent, Box } from "@mui/material";

import { DonationInputs } from "./DonationInputs";

export const DonationCreate = () => {
  return (
    <CreateBase redirect="show">
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
    </CreateBase>
  );
};

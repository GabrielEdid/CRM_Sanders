import { CreateBase, Form, Toolbar } from "react-admin";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { DonationInputs } from "./DonationInputs";

export const DonationCreate = () => {
  return (
    <CreateBase redirect="show">
      <Box mt={5} display="flex" justifyContent="center">
        <Box flex="1" sx={{ width: "100%", maxWidth: 600, boxShadow: 3 }}>
          {/* Title */}
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "primary.main", mt: 2 }}
          >
            Crear Donación
          </Typography>

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

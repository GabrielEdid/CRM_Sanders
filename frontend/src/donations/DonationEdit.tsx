import { EditBase, Form, Toolbar } from "react-admin";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { DonationInputs } from "./DonationInputs";

export const DonationEdit = () => {
  return (
    <EditBase redirect="create">
      <Box mt={5} display="flex" justifyContent="center">
        <Box flex="1" sx={{ width: "100%", maxWidth: 600, boxShadow: 3 }}>
          {/* Title */}
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "primary.main", mt: 2 }}
          >
            Editar Donación
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
    </EditBase>
  );
};

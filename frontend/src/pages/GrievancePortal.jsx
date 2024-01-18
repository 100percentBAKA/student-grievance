//* react router dom imports
import { useParams } from "react-router-dom";

//* MUI components imports
import { Box } from "@mui/material";

export default function GrievancePortal() {
  const { grievanceID } = useParams();

  return (
    <Box sx={{ marginTop: 12, marginBottom: 2, textAlign: "center" }}>
      GrievancePortal ID: {grievanceID}
    </Box>
  );
}

import { Box, styled } from "@mui/material";
import React from "react";

export default function MarginTopBox({ children }) {
  const StyledMainCtn = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(10),
  }));

  return <StyledMainCtn>{children}</StyledMainCtn>;
}

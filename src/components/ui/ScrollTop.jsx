import React from "react";
import { Box, Fab, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollTop = (props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Box
      onClick={handleClick}
      role="presentation"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        opacity: trigger ? 1 : 0,
        transition: (theme) => theme.transitions.create("opacity"),
      }}
    >
      {children}
    </Box>
  );
};

const BackToTopButton = () => {
  return (
    <ScrollTop>
      <Fab color="primary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  );
};

export default BackToTopButton;

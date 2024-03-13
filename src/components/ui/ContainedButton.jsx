import { Button, styled } from "@mui/material";

import { FONTSIZE_MEDIUM, FONTSIZE_SMALL } from "../../data/constants";

const ContainedButton = ({ children, padding, onClick, ...props }) => {
  const CustomButton = styled(Button)(
    ({ theme, padding, onClick, ...props }) => ({
      color: theme.palette.common.white,
      borderRadius: "3px",
      textTransform: "none",
      backgroundColor: theme.palette.primary.main,
      boxShadow: `0 4px 10px 0 rgba(255, 101, 0, 0.3), 0 6px 20px 0 rgba(255, 101, 0, 0.19)`,
      fontSize: FONTSIZE_MEDIUM,
      width: "fit-content",
      padding: padding,
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#e63c1e",
        boxShadow: `0 8px 20px 0 rgba(255, 101, 0, 0.35), 0 12px 40px 0 rgba(255, 101, 0, 0.24)`,
      },

      [theme.breakpoints.down("md")]: {
        fontSize: FONTSIZE_SMALL,
      },
    })
  );

  return (
    <CustomButton padding={padding} {...props}>
      {children}
    </CustomButton>
  );
};

export default ContainedButton;

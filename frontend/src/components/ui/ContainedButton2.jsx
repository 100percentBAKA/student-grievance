import { Button, styled } from "@mui/material";

const ContainedButton2 = ({ children, padding, href }) => {
  const CustomButton = styled(Button)(({ theme, padding, href }) => ({
    color: theme.palette.common.white,
    borderRadius: "3px",
    textTransform: "none",
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 4px 10px 0 rgba(255, 101, 0, 0.3), 0 6px 20px 0 rgba(255, 101, 0, 0.19)`,
    fontSize: "1rem",
    width: "fit-content",
    padding: padding,
    transition: "all 0.3s ease",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(1),
  }));

  return (
    <CustomButton padding={padding} href={href}>
      {children}
    </CustomButton>
  );
};

export default ContainedButton2;

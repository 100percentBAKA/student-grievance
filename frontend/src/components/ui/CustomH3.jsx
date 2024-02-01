import { Typography, styled } from "@mui/material";

const BannerText = styled(Typography)(
  ({ theme, fontSize, fontWeight, textColor }) => ({
    fontFamily: theme.typography.fontFamily,
    color: textColor || theme.palette.secondary.main,
    fontSize: fontSize,
    fontWeight: fontWeight || 600,
  })
);

export default function CustomH3({ children, fontSize, fontWeight, color }) {
  return (
    <BannerText fontSize={fontSize} fontWeight={fontWeight} textColor={color}>
      {children}
    </BannerText>
  );
}

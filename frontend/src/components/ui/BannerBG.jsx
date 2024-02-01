import bannerImg from "../../assets/student-grievance-bg.jpg";

import { Box, styled } from "@mui/material";

const BannerBG = ({ children, height }) => {
  const StyledBanner = styled(Box)(({ theme }) => ({
    width: "100%",
    backgroundImage: `url(${bannerImg})`,
    height: height,
    objectFit: "cover",
  }));

  return <StyledBanner>{children}</StyledBanner>;
};

export default BannerBG;

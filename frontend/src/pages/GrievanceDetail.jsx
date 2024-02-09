//* react router dom imports
import { useParams } from "react-router-dom";

//* MUI components imports
import { Avatar, Box, IconButton, Tooltip, styled } from "@mui/material";

//* native components imports
import MarginTopBox from "../components/ui/MarginTopBox";
import SubContainer from "../components/ui/SubContainer";

//* constants imports
import {
  FONTSIZE_BIG_MID,
  FONTSIZE_SMALL,
  FONTSIZE_SMALL_MID,
} from "../data/constants";
import grievanceData from "../data/grievanceData";
import grievanceResponses from "../data/grievanceResponses";

//? styled components
const StyledCatSpan = styled("span")(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: "#ADD8E6",
  borderRadius: theme.shape.borderRadius,
  padding: "0 3px",
  transition: "background-color 0.2s ease-in-out",
  fontWeight: 600,
  fontSize: FONTSIZE_SMALL,

  "&:hover": {
    backgroundColor: "#87CEEB",
  },
}));

const StyledMainArea = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(2),
}));

const StyledTagCtn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    rowGap: theme.spacing(2),
  },
}));

const StyledTitle = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "2rem",
  color: "black",

  [theme.breakpoints.down("lg")]: {
    fontSize: "1.8rem",
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
  },
}));

function GrievanceMainArea({ grievance }) {
  return (
    <MarginTopBox>
      <SubContainer>
        <Box
          id="back-to-top-anchor"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "center",
            pt: 6,
            pb: 3,
            borderBottom: "0.5px solid black",
          }}
        >
          <StyledMainArea>
            <StyledTitle>{grievance.title}</StyledTitle>

            <Box sx={{ fontSize: "1.1rem" }}>{grievance.desc}</Box>

            <StyledTagCtn>
              <Box sx={{ display: "flex", columnGap: 1 }}>
                {grievance.cat.map((cat, catIndex) => (
                  <StyledCatSpan key={catIndex}>{cat}</StyledCatSpan>
                ))}
              </Box>
              {/* //! Time handling has to be performed here */}
              <Box sx={{ fontSize: FONTSIZE_SMALL_MID }}>
                Asked: {grievance.time} ago
              </Box>
            </StyledTagCtn>
          </StyledMainArea>
          <Box>
            <Tooltip title="Grievance currently active">
              <IconButton
                disableRipple
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "green",
                  position: "absolute",
                }}
              ></IconButton>
            </Tooltip>
          </Box>
        </Box>
      </SubContainer>
    </MarginTopBox>
  );
}

function ReplyCtn({ responses }) {
  const StyledReplyCtn = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottom: "0.5px solid black",
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    paddingRight: theme.spacing(4),
    backgroundColor: "white",
  }));

  const StyledTeacherReplyCtn = styled(StyledReplyCtn)(({ theme }) => ({
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  }));

  return (
    <SubContainer>
      {responses.map((response) =>
        response.teacherName ? (
          <StyledTeacherReplyCtn key={response.id}>
            <Avatar>{response.teacherName[0]}</Avatar>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: 2,
                flex: 0.85,
                marginLeft: 5,
                fontSize: "0.933rem",
              }}
            >
              <Box>{response.response}</Box>
              <StyledTagCtn>
                <Box sx={{ fontSize: FONTSIZE_SMALL, fontWeight: 600 }}>
                  By: {response.teacherName}
                </Box>
                <Box sx={{ fontSize: FONTSIZE_SMALL, fontWeight: 600 }}>
                  Replied: {response.time}
                </Box>
              </StyledTagCtn>
            </Box>
          </StyledTeacherReplyCtn>
        ) : (
          <StyledReplyCtn key={response.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: 3,
                flex: 0.85,
              }}
            >
              <Box>{response.response}</Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>By: Student</Box>
                <Box>Replied: {response.time}</Box>
              </Box>
            </Box>
          </StyledReplyCtn>
        )
      )}
    </SubContainer>
  );
}

export default function GrievanceDetail() {
  const { grievanceID } = useParams();

  //! API HANDLING TO BE DONE HERE
  //? finding grievance with matching ID
  const grievance = grievanceData.find(
    (grievance) => grievance.id === parseInt(grievanceID)
  );

  //? find all associated replies with grievance id
  //? list/arrays of all replies
  const responses = grievanceResponses.find(
    (grievanceReplies) => grievanceReplies.grievanceId === parseInt(grievanceID)
  );
  //! API HANDLING TO BE DONE HERE

  // console.log(responses)

  return (
    <MarginTopBox>
      {grievance ? (
        //? if grievance found, main logic goes here
        <Box sx={{ marginBottom: 5 }}>
          <GrievanceMainArea grievance={grievance} grievanceID={grievanceID} />
          {/* //! handle the author of the reply */}
          <ReplyCtn responses={responses.responses} />
        </Box>
      ) : (
        //? handle when grievance is not found
        <SubContainer>
          <Box
            sx={{
              fontSize: FONTSIZE_BIG_MID,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 20,
            }}
          >
            Grievance with ID: {grievanceID} not found
          </Box>
        </SubContainer>
      )}
    </MarginTopBox>
  );
}

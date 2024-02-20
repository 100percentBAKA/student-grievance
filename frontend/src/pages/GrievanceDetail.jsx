//* react router dom imports
import { useParams } from "react-router-dom";

//* MUI components imports
import { Avatar, Box, IconButton, Tooltip, styled } from "@mui/material";

//* yup and formik
import { useFormik } from "formik";
import * as yup from "yup";

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
import useFetchData from "../hooks/useFetchData";
import ModalWindowLoader from "../components/ui/ModalWindowLoader";
import { useEffect, useState } from "react";

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
  fontSize: "1.6rem",
  color: "black",

  [theme.breakpoints.down("lg")]: {
    fontSize: "1.45rem",
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "1.3rem",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
}));

function toolTipColor(status) {
  switch (status) {
    case "RAISED":
      return "red";
    case "PENDING_ACTION":
      return "yellow";
    case "IN_PROGRESS":
      return "yellow";
    case "WITH_DRAWN":
      return "black";
    case "RESOLVED":
      return "green";
    default:
      return "white";
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
  return `${formattedDate} ${formattedTime}`;
};

function GrievanceMainArea({ grievance }) {
  return (
    <MarginTopBox>
      <SubContainer>
        <Box
          id="back-to-top-anchor"
          sx={{
            pt: 6,
            pb: 3,
            borderBottom: "0.5px solid black",
            width: "100%",
          }}
        >
          <StyledMainArea>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <StyledTitle>{grievance.title}</StyledTitle>
              <Tooltip title={grievance.grievanceStatus}>
                <IconButton
                  disableRipple
                  sx={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: toolTipColor(grievance.grievanceStatus),
                  }}
                ></IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ fontSize: "1rem" }}>
              {grievance.elements[0].description}
            </Box>

            <StyledTagCtn>
              <Box sx={{ display: "flex", columnGap: 1 }}>
                {grievance.categories.map((cat, catIndex) => (
                  <StyledCatSpan key={catIndex}>{cat.category}</StyledCatSpan>
                ))}
              </Box>
              {/* //! Time handling has to be performed here */}
              <Box sx={{ fontSize: FONTSIZE_SMALL_MID }}>
                Asked: {formatDate(grievance.asked)}
              </Box>
            </StyledTagCtn>
          </StyledMainArea>
        </Box>
      </SubContainer>
    </MarginTopBox>
  );
}

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

function ReplyCtn({ responses, userAuth }) {
  return (
    <SubContainer>
      {responses && responses.length > 0 ? (
        userAuth === "STUDENT" ? (
          <StyledTeacherReplyCtn>Hello Teacher</StyledTeacherReplyCtn>
        ) : (
          <StyledReplyCtn>Hello student</StyledReplyCtn>
        )
      ) : (
        <Box sx={{ mt: 4, textAlign: "center" }}>No Responses made yet</Box>
      )}
    </SubContainer>
  );
}

function AddReply() {
  return <SubContainer></SubContainer>;
}

// function ReplyCtn({ responses }) {
//   return (
//     <SubContainer>
//       {responses.map((response) =>
//         response.teacherName ? (
//           <StyledTeacherReplyCtn key={response.id}>
//             <Avatar>{response.teacherName[0]}</Avatar>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 rowGap: 2,
//                 flex: 0.85,
//                 marginLeft: 5,
//                 fontSize: "0.933rem",
//               }}
//             >
//               <Box>{response.response}</Box>
//               <StyledTagCtn>
//                 <Box sx={{ fontSize: FONTSIZE_SMALL, fontWeight: 600 }}>
//                   By: {response.teacherName}
//                 </Box>
//                 <Box sx={{ fontSize: FONTSIZE_SMALL, fontWeight: 600 }}>
//                   Replied: {response.time}
//                 </Box>
//               </StyledTagCtn>
//             </Box>
//           </StyledTeacherReplyCtn>
//         ) : (
//           <StyledReplyCtn key={response.id}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 rowGap: 3,
//                 flex: 0.85,
//               }}
//             >
//               <Box>{response.response}</Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box>By: Student</Box>
//                 <Box>Replied: {response.time}</Box>
//               </Box>
//             </Box>
//           </StyledReplyCtn>
//         )
//       )}
//     </SubContainer>
//   );
// }

export default function GrievanceDetail() {
  const { grievanceID } = useParams();
  const { data, modal, setModal, error } = useFetchData(
    `http://localhost:8080/grievance/${grievanceID}`
  );
  const [userAuth, setUserAuth] = useState(
    JSON.parse(localStorage.getItem("userDetails")).userAuthority
  );

  // console.log(data);

  useEffect(() => {
    setUserAuth(JSON.parse(localStorage.getItem("userDetails")).userAuthority);
  }, [setUserAuth]);

  console.log(userAuth);

  return (
    <MarginTopBox>
      {data ? (
        //? if grievance found, main logic goes here
        <Box sx={{ marginBottom: 5 }}>
          <GrievanceMainArea grievance={data} grievanceID={grievanceID} />
          <ReplyCtn responses={data.comments} userAuth={userAuth} />
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

      <ModalWindowLoader modal={modal} setModal={setModal} />
    </MarginTopBox>
  );
}

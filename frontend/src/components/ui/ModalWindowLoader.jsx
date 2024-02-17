//* spinner imports
import HashLoader from "react-spinners/HashLoader";

//* MUI components imports
import { Box, Modal } from "@mui/material";

export default function ModalWindowLoader({ modal, setModal }) {
  return (
    <Modal
      open={modal}
      onClose={() => setModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <>
        <HashLoader
          size={45}
          aria-label="loading spinner"
          // color="#ff6500"
          color="white"
        />
      </>
    </Modal>
  );
}

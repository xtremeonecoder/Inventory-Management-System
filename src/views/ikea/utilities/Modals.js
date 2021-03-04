import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const doSomeThing = (danger, setDanger, onConfirm) => {
  setDanger(!danger);
  if (onConfirm != null) onConfirm();
};

const Modals = (props) => {
  const {
    danger,
    setDanger,
    onConfirm,
    header,
    body,
    color,
    confirmText,
    cancelText,
    closeButton,
  } = props;
  //console.log("danger: ", danger);

  return (
    <CModal
      show={danger}
      onClose={() => setDanger(!danger)}
      color={color ? color : "danger"}
    >
      <CModalHeader closeButton={closeButton != null ? closeButton : true}>
        <CModalTitle>{header ? header : "Confirmation Needed!"}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {body
          ? body
          : "Do you want to perform this operation? Please note that this operation may not be undo later!"}
      </CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          onClick={() => doSomeThing(danger, setDanger, onConfirm)}
        >
          {confirmText ? confirmText : "Yes, Do That"}
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setDanger(!danger)}>
          {cancelText ? cancelText : "No, Don't Do That"}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Modals;

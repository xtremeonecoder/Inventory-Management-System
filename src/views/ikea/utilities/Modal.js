import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

// do something on user confirm
const doSomeThing = (props = {}) => {
  // destructure props
  const { onConfirm = null, stateSetter = {} } = props;

  // set modal state values null
  resetStateData(stateSetter);

  // execute call back function
  if (onConfirm != null) onConfirm();
};

// reset state data
const resetStateData = (stateSetter = {}) => {
  // destructure props
  const {
    setDanger = null,
    setModalBody = null,
    setModalHeader = null,
    setModalConfirm = null,
  } = stateSetter;

  // reset state data for modal
  if (setDanger != null) setDanger(false);
  if (setModalBody != null) setModalBody("");
  if (setModalHeader != null) setModalHeader("");
  if (setModalConfirm != null) setModalConfirm(null);
};

const Modal = (props) => {
  const {
    stateSetter = {},
    params: {
      danger = false,
      header = "",
      body = "",
      color = "",
      confirmText = "",
      cancelText = "",
      closeButton = true,
    } = {},
  } = props;
  // console.log("danger: ", danger);

  return (
    <CModal
      show={danger}
      onClose={() => resetStateData(stateSetter)}
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
        <CButton color="danger" onClick={() => doSomeThing(props)}>
          {confirmText ? confirmText : "Yes, Do That"}
        </CButton>{" "}
        <CButton color="secondary" onClick={() => resetStateData(stateSetter)}>
          {cancelText ? cancelText : "No, Don't Do That"}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Modal;

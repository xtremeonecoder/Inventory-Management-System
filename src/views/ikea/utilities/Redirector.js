import React from "react";
import { Redirect } from "react-router-dom";
import auth from "../../../services/auth-service";

const Redirector = ({ access }) => {
  const isAllowed = auth.isAllowed(access);
  if (!isAllowed) return <Redirect to="/403" />;
  return null;
};

export default Redirector;

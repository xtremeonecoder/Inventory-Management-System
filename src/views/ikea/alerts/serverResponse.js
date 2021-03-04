import React from "react";
import Notification from "./Notification";

const serverResponse = (data, loading, error) => {
  let body = null;
  if (loading) body = <h4>Loading...</h4>;
  else if (error) body = `ERROR: ${error.message}`;
  else if (data === undefined) body = "ERROR: Data not found!";

  // check body
  if (!body) return null;

  return (
    <Notification closeButton={false} header="Error Notification" body={body} />
  );
};

export default serverResponse;

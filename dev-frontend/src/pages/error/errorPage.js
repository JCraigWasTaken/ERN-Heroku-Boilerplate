import React from "react";

export default function errorPage(props) {
  if (props.errorCode == 404) {
    return <h1>404 Page Not Found</h1>;
  }
  return <h1>500 Internal Server Error</h1>;
}

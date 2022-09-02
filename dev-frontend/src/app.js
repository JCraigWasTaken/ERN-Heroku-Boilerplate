import React from "react";
import { createRoot } from "react-dom/client";

import "./app.css";
import RouteManager from "./routeManager";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseBeingUsedClass: "",
    };
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.handleEvent, true);
    window.addEventListener("keydown", this.handleEvent, true);
  }

  handleEvent = (e) => {
    //If you click using a mouse
    if (e.type == "mousedown" && this.state.mouseBeingUsedClass == "") {
      this.setState({
        mouseBeingUsedClass: "mouse",
      });
    }
    //If you use keys outside of a text input
    if (
      e.type == "keydown" &&
      this.state.mouseBeingUsedClass == "mouse" &&
      e.target.tagName != "INPUT" &&
      e.target.tagName != "TEXTAREA"
    ) {
      this.setState({
        mouseBeingUsedClass: "",
      });
    }
  };

  openLink = (link) => {
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", link);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  openLinkNewTab = (link) => {
    window.open(link, "_blank");
  };

  render() {
    return (
      <div className={"" + this.state.mouseBeingUsedClass}>
        <RouteManager />
      </div>
    );
  }
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);

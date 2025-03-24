import React from "react";
import { PopupWidget } from "react-calendly";
/*
const Contact2 = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <iframe
        src="https://calendly.com/mikha-vizion/30min"
        style={{ width: "100%", maxWidth: "800px", height: "600px", border: "none" }}
        title="Calendly Scheduling"
      ></iframe>
    </div>
  );
};
*/
const Contact2 = () => {
  return (
    <PopupWidget
      url="https://calendly.com/mikha-vizion/30min"
      rootElement={document.getElementById("root")}
      text="Prendre un rendez-vous"
      textColor="#ffffff"
      color="#4f46e5"
    />
  );
};
export default Contact2;

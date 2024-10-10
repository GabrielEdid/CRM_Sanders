import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DonationScreenStyles.css"; // Import the CSS file

const DonationCancel: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use react-router's navigate for redirection

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      // Redirect to /landing if session ID is missing
      navigate("/");
    } else {
      // Fetch more info about the session if necessary
    }
  }, [sessionId, navigate]);

  return (
    <div className="cancelContainer">
      <h1>Donación Cancelada</h1>
      <p>
        Parece que cancelaste tu donación. Si cambiaste de opinión, ¡puedes
        intentarlo de nuevo!
      </p>
      <button onClick={() => navigate("/")}>
        Volver a la página principal
      </button>
    </div>
  );
};

export default DonationCancel;

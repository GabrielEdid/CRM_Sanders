import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DonationScreenStyles.css"; // Import the CSS file

const DonationSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use react-router's navigate for redirection

  // Extract the session_id from the URL
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      // Redirect to /landing if session ID is missing
      navigate("/");
    } else {
      console.log("Donation Success with session ID:", sessionId);
      // Fetch more info about the session if necessary
    }
  }, [sessionId, navigate]);

  return (
    <div className="successContainer">
      <h1>¡Gracias por tu donación!</h1>
      <p>
        Tu donación ha sido procesada exitosamente. Gracias por apoyar nuestra
        causa. Con tu ayuda, podemos hacer una diferencia.
      </p>
      <p>Recibirás un correo de confirmación pronto.</p>
      <p className="sessionId">Identificador de donación: {sessionId}</p>
      <button onClick={() => navigate("/")}>
        Volver a la página principal
      </button>
    </div>
  );
};

export default DonationSuccess;

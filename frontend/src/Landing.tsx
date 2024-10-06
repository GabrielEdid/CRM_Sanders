import React, { useState, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./Landing.module.css";
import Logo from "./img/Logo.jpg";
import Agua from "./img/Agua.jpg";
import Donaciones from "./img/Donaciones.jpg";

const Landing = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [donationData, setDonationData] = useState({
    amount: 250, // Default amount
    donator: {
      email: "",
    },
  });

  // Reference to the donation section
  const donationSectionRef = useRef<HTMLDivElement>(null);

  const makeDonation = async (donationData: {
    amount: number;
    donator: { email: string };
  }): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/v1/stripe/checkout", // Backend endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...donationData,
            paymentMethod: "stripe", // Ensure this is included
          }),
        }
      );

      const { sessionId } = await response.json();

      if (!sessionId) {
        setErrorMessage("Could not create Stripe session. Please try again.");
        setIsLoading(false);
        return;
      }

      const stripe = await loadStripe("pk_test_51Q5ad0GyaQDHPtc7o5doiVK2aeP5CkolWLeYKHWvpic4At3c3yHG3cIGPC5ejMD3xaCpyVaW8f83nAMAiOIODEHd00EFSvMKYd");

      if (!stripe) {
        setErrorMessage("Failed to initialize Stripe. Please try again.");
        setIsLoading(false);
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToDonationSection = () => {
    donationSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.landingContainer}>
      <header className={styles.navbar}>
        <div className={styles.logo}>Fundación Sanders</div>
        <nav>
          <ul className={styles.navLinks}>
            <li><a href="#about">Nosotros</a></li>
            <li><a href="#activities">Actividades</a></li>
            <li><a href="#donations">Donaciones</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>¡Bienvenido a la Fundación Sanders!</h1>
        <p className={styles.heroSubtitle}>
          Nuestra misión es ayudar a los menos favorecidos a través de la tecnología y proveerles agua limpia.
        </p>
        <button className={styles.heroButton} onClick={scrollToDonationSection}>
          Haz una donación
        </button>
      </section>

      <section id="donations" className={`${styles.infoSection}`} ref={donationSectionRef}>
        <img src={Agua} alt="Donaciones" className={styles.sectionImage} />
        <div className={styles.textContent}>
          <h2>Donaciones</h2>
          <p>Con tu apoyo, podemos seguir llevando agua y educación a más niños. ¡Haz tu donación hoy!</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              makeDonation(donationData);
            }}
          >
            <input
              type="email"
              value={donationData.donator.email}
              onChange={(e) =>
                setDonationData({
                  ...donationData,
                  donator: { ...donationData.donator, email: e.target.value },
                })
              }
              placeholder="Tu correo electrónico"
              required
            />
            <input
              type="number"
              value={donationData.amount}
              onChange={(e) =>
                setDonationData({
                  ...donationData,
                  amount: parseFloat(e.target.value),
                })
              }
              placeholder="Cantidad a donar"
              required
            />
            <button
              type="submit"
              className={styles.donateButton}
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? "Procesando..." : "Donar ahora"}
            </button>
          </form>
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        </div>
      </section>

      <section id="contact" className={styles.infoSection}>
        <div className={styles.textContent}>
          <h2>Contacto</h2>
          <h1>DIRECCIÓN</h1>
          <p>Melchor Ocampo 193, Torre A, Piso 1, CP 11300 Col. Verónica Anzures</p>
          <h1>TELÉFONO</h1>
          <p>55 1707-6203</p>
          <h1>CORREO</h1>
          <p>contacto@sanders.com.mx</p>
        </div>
        <img src={Donaciones} alt="Donaciones" className={styles.sectionImage1} />
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 Fundación Sanders. Derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Landing;
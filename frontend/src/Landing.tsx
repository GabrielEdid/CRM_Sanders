import React, { useState, useRef } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import styles from "./Landing.module.css";
import Logo from "./img/Logo.jpg";
import Equipo from "./img/Equipo.jpeg";
import Agua from "./img/Agua.jpg";

const Landing: React.FC = () => {
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

      const stripe = await loadStripe(
        "pk_test_51Q4tUmKFn5yEUyQdrzZb2KqYszXKnxGTGyE7jIBmr05yApnA3jUvT7No0yrQeTgmetrBlRumpPFf5uRTlosbkqQT00X3WY6LHX"
      );

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
            <li>
              <a href="#about">Nosotros</a>
            </li>
            <li>
              <a href="#activities">Actividades</a>
            </li>
            <li>
              <a href="#donations">Donaciones</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          ¡Bienvenido a la Fundación Sanders!
        </h1>
        <p className={styles.heroSubtitle}>
          Nuestra misión es ayudar a los menos favorecidos a través de la
          tecnología y proveerles agua limpia.
        </p>
        <button className={styles.heroButton} onClick={scrollToDonationSection}>
          Haz una donación
        </button>
      </section>

      <section id="about" className={`${styles.infoSection} ${styles.reverse}`}>
        <img src={Logo} alt="Nosotros" className={styles.sectionImage} />
        <div className={styles.textContent}>
          <h2>Nosotros</h2>
          <p>
            En Fundación Sanders, creemos en el poder de la tecnología para
            mejorar la calidad de vida de quienes más lo necesitan. Proveemos
            agua limpia y oportunidades de educación.
          </p>
        </div>
      </section>

      <section id="activities" className={styles.infoSection}>
        <img src={Equipo} alt="Actividades" className={styles.sectionImage} />
        <div className={styles.textContent}>
          <h2>Actividades</h2>
          <p>
            Ofrecemos talleres de robótica, impresión 3D y mucho más. ¡Únete a
            nuestras actividades!
          </p>
        </div>
      </section>

      <section
        id="donations"
        className={`${styles.infoSection} ${styles.reverse}`}
        ref={donationSectionRef} // Reference to donation section
      >
        <img src={Agua} alt="Donaciones" className={styles.sectionImage} />
        <div className={styles.textContent}>
          <h2>Donaciones</h2>
          <p>
            Con tu apoyo, podemos seguir llevando agua y educación a más niños.
            ¡Haz tu donación hoy! <br />
            Introduce el monto que deseas donar en pesos mexicanos (MXN).
          </p>

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
          <p>
            ¿Tienes preguntas? ¡Contáctanos y te responderemos lo antes posible!
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 Fundación Sanders. Derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Landing;

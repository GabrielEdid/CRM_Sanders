import React, { useState, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./Landing.module.css";
import Logo from "./img/Logo.png";
import Logo_Sanders from "../assets/images/Logo_Sanders.jpeg";
import Equipo from "./img/Equipo.jpeg";
import Agua from "./img/Agua.jpg";
import Donaciones from "./img/Donaciones.jpg";

const Landing = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false); // Track anonymous state
  const [donationData, setDonationData] = useState({
    amount: 250, // Default amount
    donator: {
      name: "",
      email: "",
      phone: "",
      isSendEmails: true,
    },
  });

  // Reference to the donation section
  const donationSectionRef = useRef<HTMLDivElement>(null);

  const makeDonation = async (donationData: {
    amount: number;
    donator: {
      name: string;
      email: string;
      phone: string;
      isSendEmails: boolean;
    }; // Added name and phone
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
        setErrorMessage(
          "No se pudo crear la sesión de pago. Inténtalo de nuevo."
        );
        setIsLoading(false);
        return;
      }

      const stripe = await loadStripe(
        "pk_test_51Q4tUmKFn5yEUyQdrzZb2KqYszXKnxGTGyE7jIBmr05yApnA3jUvT7No0yrQeTgmetrBlRumpPFf5uRTlosbkqQT00X3WY6LHX"
      );

      if (!stripe) {
        setErrorMessage("Error al inicializar Stripe. Inténtalo de nuevo.");
        setIsLoading(false);
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        setErrorMessage(
          result.error.message ? result.error.message : "Ocurrió un error."
        );
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error inesperado. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToDonationSection = () => {
    donationSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle the checkbox change
  const handleAnonymousChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAnonymous(e.target.checked);
    if (e.target.checked) {
      // Set default anonymous values
      setDonationData({
        ...donationData,
        donator: {
          name: "Anónimo",
          email: "anonimo@mail.com",
          phone: "0000000000",
          isSendEmails: false,
        },
      });
    } else {
      // Clear the values if unselected
      setDonationData({
        ...donationData,
        donator: {
          name: "",
          email: "",
          phone: "",
          isSendEmails: false,
        },
      });
    }
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
        <img
          src={Logo_Sanders}
          alt="Nosotros"
          className={styles.sectionImage}
        />
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
            Fundación Sanders A.C., es una Asociación Civil sin fines de lucro
            creada en el año 2016 por iniciativa del empresario mexicano
            Guillermo Sanders Acedo (1935-2019), para contribuir a la mejora de
            la calidad de vida en grupos sociales en situación de
            vulnerabilidad, mediante la promoción de la salud sexual y
            reproductiva, la nutrición comunitaria y el abastecimiento de agua.
          </p>
        </div>
      </section>

      <section id="activities" className={styles.infoSection}>
        <div className={styles.textContent}>
          <h2>Actividades</h2>
          <h1>TEC HIDALGO</h1>
          <p>
            Tuvimos la oportunidad de platicar en HIDALMUN 2022 compartiendo con
            alumnos, directivos y líderes sobre el surgimiento de Fundación
            Sanders A. C.
          </p>
          <h1>HIPGIVE</h1>
          <p>
            Es la plataforma de herramientas digitales de “Hispanics in
            Philanthropy” que posibilita la movilización de recursos para
            proyectos de impacto social en el continente americano.
          </p>
          <h1>INSTITUTO TLALPAN</h1>
          <p>
            Con el instituto Tlalpan llevamos a cabo programa con alumnos de 3°
            de preparatoria.
          </p>
        </div>

        <div className={styles.videoSection}>
          <a
            href="https://www.youtube.com/watch?v=G0igvtwkJv4&t=3s"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.videoLink}
          >
            Ver video en YouTube
          </a>
          <div className={styles.videoWrapper}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/G0igvtwkJv4"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section
        id="donations"
        className={`${styles.infoSection}`}
        ref={donationSectionRef}
      >
        <img src={Agua} alt="Donaciones" className={styles.sectionImage} />
        <div className={styles.textContent}>
          <h2>Donaciones</h2>
          <p>
            Con tu apoyo, podemos seguir llevando agua y educación a más niños.
            ¡Haz tu donación hoy!
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              makeDonation(donationData);
            }}
          >
            <input
              type="text"
              value={donationData.donator.name} // New: Name input
              onChange={(e) =>
                setDonationData({
                  ...donationData,
                  donator: { ...donationData.donator, name: e.target.value },
                })
              }
              placeholder="Tu nombre"
              disabled={isAnonymous} // Disable if anonymous
              required={!isAnonymous}
            />
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
              disabled={isAnonymous} // Disable if anonymous
              required={!isAnonymous}
            />
            <input
              type="tel"
              value={donationData.donator.phone} // New: Phone input
              onChange={(e) =>
                setDonationData({
                  ...donationData,
                  donator: { ...donationData.donator, phone: e.target.value },
                })
              }
              placeholder="Tu teléfono"
              disabled={isAnonymous} // Disable if anonymous
              required={!isAnonymous}
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
            <div className={styles.anonymousCheckbox}>
              <label>Donar de forma anónima</label>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={handleAnonymousChange}
              />
            </div>
            <div className={styles.anonymousCheckbox}>
              <label>
                Acepto recibir correos electrónicos informativos con información
                sobre la fundación
              </label>
              <input
                type="checkbox"
                defaultChecked={true}
                onChange={(e) => {
                  console.log(
                    "!donationData.donator.isSendEmails",
                    !donationData.donator.isSendEmails
                  );
                  setDonationData({
                    ...donationData,
                    donator: {
                      ...donationData.donator,
                      isSendEmails: !donationData.donator.isSendEmails,
                    },
                  });
                }}
              />
            </div>
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
          <p>
            Melchor Ocampo 193, Torre A, Piso 1, CP 11300 Col. Verónica Anzures
          </p>
          <h1>TELÉFONO</h1>
          <p>55 1707-6203</p>
          <h1>CORREO</h1>
          <p>contacto@sanders.com.mx</p>
        </div>
        <img
          src={Donaciones}
          alt="Donaciones"
          className={styles.sectionImage1}
        />
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 Fundación Sanders. Derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Landing;

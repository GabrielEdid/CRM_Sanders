import React from "react";
import styles from "./Landing.module.css";
import Logo from "./img/Logo.jpg";
import Equipo from "./img/Equipo.jpeg";
import Agua from "./img/Agua.jpg";

const Landing = () => (
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
      <button className={styles.heroButton}>Haz una donación</button>
    </section>

    <section id="about" className={`${styles.infoSection} ${styles.reverse}`}>
      <img src={Logo} alt="Nosotros" className={styles.sectionImage} />
      <div className={styles.textContent}>
        <h2>Nosotros</h2>
        <p>
          En Fundación Sanders, creemos en el poder de la tecnología para mejorar la calidad de vida de quienes más lo necesitan.
          Proveemos agua limpia y oportunidades de educación.
        </p>
      </div>
    </section>

    <section id="activities" className={styles.infoSection}>
      <img src={Equipo} alt="Actividades" className={styles.sectionImage} />
      <div className={styles.textContent}>
        <h2>Actividades</h2>
        <p>Ofrecemos talleres de robótica, impresión 3D y mucho más. ¡Únete a nuestras actividades!</p>
      </div>
    </section>

    <section id="donations" className={`${styles.infoSection} ${styles.reverse}`}>
      <img src={Agua} alt="Donaciones" className={styles.sectionImage} />
      <div className={styles.textContent}>
        <h2>Donaciones</h2>
        <p>Con tu apoyo, podemos seguir llevando agua y educación a más niños. ¡Haz tu donación hoy!</p>
        <button className={styles.donateButton}>Donar ahora</button>
      </div>
    </section>

    <section id="contact" className={styles.infoSection}>
      <div className={styles.textContent}>
        <h2>Contacto</h2>
        <p>¿Tienes preguntas? ¡Contáctanos y te responderemos lo antes posible!</p>
      </div>
    </section>

    <footer className={styles.footer}>
      <p>&copy; 2024 Fundación Sanders. Derechos reservados.</p>
    </footer>
  </div>
);

export default Landing;

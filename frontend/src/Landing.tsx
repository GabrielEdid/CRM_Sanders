import React from "react";
import styles from "./Landing.module.css";
import Logo from "./img/Logo.jpg";
import Equipo from "./img/Equipo.jpeg";
import Agua from "./img/Agua.jpg";
import Donaciones from "./img/Donaciones.jpg";
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
      <img src={Logo} alt="Nosotros" className={styles.sectionImage} />
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
          Fundación Sanders A.C., es una Asociación Civil sin fines de lucro creada 
          en el año 2016 por iniciativa del empresario mexicano Guillermo Sanders 
          Acedo (1935-2019), para contribuir a la mejora de la calidad de vida en 
          grupos sociales en situación de vulnerabilidad, mediante la promoción de
          la salud sexual y reproductiva, la nutrición comunitaria y el abastecimiento de agua.
        </p>
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

    <section id="activities" className={styles.infoSection}>
      
      
      <div className={styles.textContent}>
        <h2>Actividades</h2>
        <h1>TEC HIDALGO</h1>
        <p>
        Tuvimos la oportunidad de platicar en HIDALMUN 2022 compartiendo con alumnos,
        \ directivos y líderes sobre el surgimiento de Fundación Sanders A. C</p>
     
        <p>
          <h1>HIPGIVE</h1>
        Es la plataforma de herramientas digitales de “Hispanics in Philanthropy” 
        que posibilita la movilización de recursos para proyectos de impacto social 
        en el continente americano.
        </p>
        <h1>INSTITUTO TLALPAN</h1>
        <p>
        Con el instituto Tlalpan llevamos a cabo programa con alumnos de 3° de preparatoria</p>
      </div>

      <div className={styles.videoSection}>
      
        
    
        <a href="https://www.youtube.com/watch?v=G0igvtwkJv4&t=3s" target="_blank" rel="noopener noreferrer" className={styles.videoLink}>
          Ver video en YouTube
        </a>

   
        <div className={styles.videoWrapper}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/G0igvtwkJv4" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
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

export default Landing;

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>METHODIUS<span className={styles.dot}>.</span></span>
            <p className={styles.tagline}>Arquitectos de Sistemas que Escalan.</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>Navegación</h4>
              <a href="#servicios">Servicios</a>
              <a href="#productos">Productos</a>
              <a href="#metodologia">Metodología</a>
            </div>
            <div className={styles.linkGroup}>
              <h4>Contacto</h4>
              <a href="mailto:info@methodius.tech">info@methodius.tech</a>
              <a href="https://wa.me/58XXXXXXXXXX">WhatsApp</a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Methodius Tech. Todos los derechos reservados.</p>
          <p className={styles.tech}>Powered by Rust 🦀 & React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from 'react';
import Button from '../common/Button';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>METHODIUS</span>
          <span className={styles.logoDot}>.</span>
        </div>
        
        <ul className={styles.navLinks}>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#metodologia">Metodología</a></li>
        </ul>

        <div className={styles.actions}>
          <Button variant="outline" className={styles.ctaDesktop}>
            Diagnóstico Gratis
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

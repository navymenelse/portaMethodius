import Button from '../common/Button';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.grid}></div>
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          Adiós al Caos Operativo. <br />
          <span className={styles.highlight}>Bienvenido al Sistema.</span>
        </h1>
        
        <p className={styles.subtitle}>
          Construimos la infraestructura digital que tu empresa necesita para escalar 
          sin límites, automatizando lo complejo y optimizando lo vital.
        </p>
        
        <div className={styles.actions}>
          <Button variant="primary" className={styles.cta}>
            Ver Soluciones
          </Button>
          <Button variant="secondary" className={styles.cta}>
            Hablar con un Asesor
          </Button>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

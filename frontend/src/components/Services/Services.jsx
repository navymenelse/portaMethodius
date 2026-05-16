import SectionTitle from '../common/SectionTitle';
import styles from './Services.module.css';

const services = [
  {
    icon: '🔍',
    title: 'Diagnóstico',
    description: 'Identificamos los cuellos de botella y fugas de eficiencia en tus procesos actuales.',
    color: 'var(--cyan)'
  },
  {
    icon: '🏗️',
    title: 'Arquitectura',
    description: 'Diseñamos sistemas robustos y escalables que actúan como el motor de tu empresa.',
    color: 'var(--white)'
  },
  {
    icon: '🎯',
    title: 'Control',
    description: 'Automatizamos y monitoreamos cada variable para asegurar un crecimiento sostenido.',
    color: 'var(--cyan)'
  }
];

const Services = () => {
  return (
    <section id="servicios" className={styles.services}>
      <div className={styles.container}>
        <SectionTitle 
          title="Nuestra Metodología" 
          subtitle="Transformamos el caos en estructuras de alto rendimiento siguiendo tres fases clave."
        />
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper} style={{ '--accent': service.color }}>
                <span className={styles.icon}>{service.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.fase}>FASE 0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

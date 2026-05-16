import styles from './SectionTitle.module.css';

const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`${styles.container} ${centered ? styles.centered : ''}`}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.divider}></div>
    </div>
  );
};

export default SectionTitle;

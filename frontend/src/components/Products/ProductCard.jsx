import Button from '../common/Button';
import styles from './ProductCard.module.css';

const ProductCard = ({ title, tagline, tags, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        <div className={styles.overlay}>
          <div className={styles.tags}>
            {tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.tagline}>{tagline}</p>
        <Button variant="outline" className={styles.button}>
          Saber más
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

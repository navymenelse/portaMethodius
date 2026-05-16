import SectionTitle from '../common/SectionTitle';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

const products = [
  {
    id: 1,
    title: 'Gestión Naval Pro',
    tagline: 'Trazabilidad total en alta mar.',
    tags: ['ODT', 'Bitácora', 'Cloud'],
    image: 'https://images.unsplash.com/photo-1559139225-421502da1c45?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Methodius AI core',
    tagline: 'SOPs convertidos en prompts ejecutables.',
    tags: ['IA', 'Automation', 'LLM'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Insight Dashboard',
    tagline: 'Métricas críticas en tiempo real.',
    tags: ['Analytics', 'Real-time', 'BI'],
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Custom Systems',
    tagline: 'Desarrollo de software a medida.',
    tags: ['Web', 'Mobile', 'Scalable'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  }
];

const ProductGrid = () => {
  return (
    <section id="productos" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle 
          title="Vitrina de Soluciones" 
          subtitle="Productos diseñados para eliminar el caos y potenciar la escalabilidad."
        />
        
        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

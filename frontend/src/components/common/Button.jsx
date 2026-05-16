import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

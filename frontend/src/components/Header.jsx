import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';

function Header() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  }

  return (
    <header className={styles.container}>
      <div className={styles.container_links}>
        <Link className={`${styles.links} btn btn-outline-light`} to="/home">Início</Link>
        <Link className={`${styles.links} btn btn-outline-light`} to="/product">Meus Produtos</Link>
        <Link className={`${styles.links} btn btn-outline-light`} to="/create">Novo Produto</Link>
      </div>
      <div className={styles.container_btn}>
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={logOut}
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;

import { useContext, useEffect } from 'react';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/AccountProducts.module.css';

function AccountProducts() {
  const {
    checkLogin,
    userInfo,
    userProducts,
    accountProducts,
    isLoading,
    deleteProduct,
  } = useContext(MainContext);

  useEffect(() => {
    checkLogin();
    userInfo();
    userProducts();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Header />
        <p className={styles.loading}>Carregando...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.container_main}>
        <div className={styles.container_title}>
          <h1>Meus Produtos</h1>
        </div>
        <div className={styles.container_products}>
          {
            accountProducts.length === 0 ? (
              <p className={styles.p_product}>Nenhum produto encontrado!</p>
            ) : (
              <ul className={styles.list_products}>
                {accountProducts.map((product) => (
                  <li key={product.id}>
                    <h3>{product.name}</h3>
                    <p>
                      Marca:
                      {' '}
                      {product.brand}
                    </p>
                    <p>
                      Modelo:
                      {' '}
                      {product.model}
                    </p>
                    <p>
                      Preço:
                      {' '}
                      R$
                      {' '}
                      {product.price.toFixed(2)}
                    </p>
                    <p>
                      Cor:
                      {' '}
                      {product.color}
                    </p>
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            )
          }
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AccountProducts;

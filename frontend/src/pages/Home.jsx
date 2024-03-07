import { useContext, useEffect } from 'react';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

function Home() {
  const {
    checkLogin,
    userInfo,
    products,
    allProducts,
    isLoading,
  } = useContext(MainContext);

  useEffect(() => {
    checkLogin();
    userInfo();
    allProducts();
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
          <h1>Produtos Disponíveis</h1>
        </div>
        <div className={styles.container_products}>
          {
            products.length === 0 ? (
              <p className={styles.p_product}>Nenhum produto encontrado!</p>
            ) : (
              <ul className={styles.list_products}>
                {products.map((product) => (
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

export default Home;

import { useContext, useEffect } from 'react';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <>
        <Header />
        <p>Carregando...</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div>
          <h1>Produtos Disponíveis</h1>
        </div>
        <div>
          {
            products.length === 0 ? (
              <p>Nenhum produto encontrado</p>
            ) : (
              <ul>
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
    </>
  );
}

export default Home;

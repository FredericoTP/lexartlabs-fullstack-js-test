import { useContext, useEffect } from 'react';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
          <h1>Meus Produtos</h1>
        </div>
        <div>
          {
            accountProducts.length === 0 ? (
              <p>Nenhum produto encontrado!</p>
            ) : (
              <ul>
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
    </>
  );
}

export default AccountProducts;

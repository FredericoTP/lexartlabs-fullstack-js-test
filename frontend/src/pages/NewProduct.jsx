import { useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/apiInstance';
import useInput from '../hooks/useInput';
import useInputNumber from '../hooks/useInputNumber';
import { getToken } from '../utils/authentication';
import styles from '../styles/NewProduct.module.css';

function NewProduct() {
  const { checkLogin } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const nameInput = useInput('');
  const brandInput = useInput('');
  const modelInput = useInput('');
  const priceInput = useInputNumber('0');
  const colorInput = useInput('');

  const NUMBER3 = 3;

  useEffect(() => {
    checkLogin();
  }, []);

  function resetForm() {
    nameInput.setValue('');
    brandInput.setValue('');
    modelInput.setValue('');
    priceInput.setValue(0);
    colorInput.setValue('');
  }

  function verifyProduct() {
    if (nameInput.value === '' || brandInput.value === '' || modelInput.value === '' || colorInput.value === '' || priceInput.value === 0) {
      setAlertMessage('Preencha todos os campos');
      return false;
    }

    if (nameInput.value.length < NUMBER3) {
      setAlertMessage('Nome deve ter no mínimo 3 caracteres');
      return false;
    }

    if (+priceInput.value < 0) {
      setAlertMessage('Preço deve ser maior que 0');
      return false;
    }

    setAlertMessage('');

    return true;
  }

  async function handleCreate(event) {
    try {
      event.preventDefault();

      if (!verifyProduct()) return;

      setIsLoading(true);

      const newProduct = {
        name: nameInput.value,
        brand: brandInput.value,
        model: modelInput.value,
        price: +priceInput.value,
        color: colorInput.value,
      };

      const token = getToken();

      const response = await api.post('/product', newProduct, { headers: { Authorization: token } });

      if (response.status === 201) {
        setIsLoading(false);
        resetForm();
        alert('Produto criado com sucesso!');
      }

      resetForm();
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.container_main}>
        <div className={styles.container_title}>
          <h2>Criar Novo Produto</h2>
        </div>
        <form className={styles.container_form} onSubmit={(e) => handleCreate(e)}>
          <div className={styles.container_input}>
            <label className="form-label" htmlFor="name-input">Nome: </label>
            <input
              className="form-control"
              id="name-input"
              type="text"
              placeholder="Nome"
              value={nameInput.value}
              onChange={nameInput.handleChange}
            />
          </div>
          <div className={styles.container_input}>
            <label className="form-label" htmlFor="brand-input">Marca: </label>
            <input
              className="form-control"
              id="brand-input"
              type="text"
              placeholder="Marca"
              value={brandInput.value}
              onChange={brandInput.handleChange}
            />
          </div>
          <div className={styles.container_input}>
            <label className="form-label" htmlFor="model-input">Modelo: </label>
            <input
              className="form-control"
              id="model-input"
              type="text"
              placeholder="Modelo"
              value={modelInput.value}
              onChange={modelInput.handleChange}
            />
          </div>
          <div className={styles.container_input}>
            <label className="form-label" htmlFor="price-input">Preço: </label>
            <input
              className="form-control"
              id="price-input"
              type="number"
              placeholder="Valor"
              value={priceInput.value}
              onChange={priceInput.handleChange}
            />
          </div>
          <div className={styles.container_input}>
            <label className="form-label" htmlFor="color-input">Cor: </label>
            <input
              className="form-control"
              id="color-input"
              type="text"
              placeholder="Cor"
              value={colorInput.value}
              onChange={colorInput.handleChange}
            />
          </div>
          <div className={styles.container_btn}>
            {
            isLoading ? (
              <p>Carregando...</p>
            ) : (
              <button
                className={`${styles.btn} btn btn-outline-light`}
                type="submit"
              >
                Cadastrar
              </button>
            )
          }
            <small className={styles.small_warning}>{alertMessage}</small>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default NewProduct;

import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../utils/apiInstance';
import useInput from '../hooks/useInput';
import styles from '../styles/Register.module.css';

function Register() {
  const nameInput = useInput('');
  const emailInput = useInput('');
  const passwordOneInput = useInput('');
  const passwordTwoInput = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const NUMBER3 = 3;
  const NUMBER6 = 6;

  function resetForm() {
    nameInput.setValue('');
    emailInput.setValue('');
    passwordOneInput.setValue('');
    passwordTwoInput.setValue('');
  }

  function verifyAccount() {
    if (nameInput.value === '' || emailInput.value === '' || passwordOneInput.value === '' || passwordTwoInput.value === '') {
      setAlertMessage('Preencha todos os campos');
      return false;
    }

    if (nameInput.value.length < NUMBER3) {
      setAlertMessage('Nome deve ter no mínimo 3 caracteres');
      return false;
    }

    if (passwordOneInput.value.length < NUMBER6 || passwordTwoInput.value.length < NUMBER6) {
      setAlertMessage('Senha deve ter no mínimo 6 caracteres');
      return false;
    }

    if (passwordOneInput.value !== passwordTwoInput.value) {
      setAlertMessage('As senhas devem ser iguais');
      return false;
    }

    setAlertMessage('');

    return true;
  }

  async function handleRegister(event) {
    try {
      event.preventDefault();

      if (!verifyAccount()) return;

      setIsLoading(true);

      const newAccount = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordOneInput.value,
      };

      const response = await api.post('/account', newAccount);

      if (response.status === 201) {
        setIsLoading(false);
        resetForm();
        alert('Conta criada com sucesso!');
        navigate('/', { replace: true });
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
    <main className={styles.container}>
      <div className={styles.container_title}>
        <h2>Criar nova conta</h2>
      </div>
      <form className={styles.container_form} onSubmit={(e) => handleRegister(e)}>
        <div className={styles.container_input}>
          <label
            className="form-label"
            htmlFor="name-input"
          >
            Nome:
          </label>
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
          <label
            className="form-label"
            htmlFor="email-input"
          >
            Email:
          </label>
          <input
            className="form-control"
            id="email-input"
            type="email"
            placeholder="Email"
            value={emailInput.value}
            onChange={emailInput.handleChange}
          />
        </div>
        <div className={styles.container_input}>
          <label
            className="form-label"
            htmlFor="passwordOne-input"
          >
            Password:
          </label>
          <input
            className="form-control"
            id="passwordOne-input"
            type="password"
            placeholder="Password"
            value={passwordOneInput.value}
            onChange={passwordOneInput.handleChange}
          />
        </div>
        <div className={styles.container_input}>
          <label
            className="form-label"
            htmlFor="passwordTwo-input"
          >
            Password:
          </label>
          <input
            className="form-control"
            id="passwordTwo-input"
            type="password"
            placeholder="Password"
            value={passwordTwoInput.value}
            onChange={passwordTwoInput.handleChange}
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
  );
}

export default Register;

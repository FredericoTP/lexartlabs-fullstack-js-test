import { useContext } from 'react';
import LoginContext from '../context/LoginContext';
import styles from '../styles/Login.module.css';

function Login() {
  const {
    emailInput, passwordInput, isBtnDisabled, handleLogin, isLoading, alertMessage,
  } = useContext(LoginContext);
  const NUMBER6 = 6;

  return (
    <main className={styles.container}>
      <div className={styles.container_title}>
        <h2>Login</h2>
      </div>
      <div className={styles.container_inputs}>
        <input
          className={`${styles.inputs} form-control`}
          type="email"
          placeholder="Email"
          value={emailInput.value}
          onChange={emailInput.handleChange}
        />
        <input
          className={`${styles.inputs} form-control`}
          type="password"
          placeholder="Password"
          value={passwordInput.value}
          onChange={passwordInput.handleChange}
        />
        {
          (passwordInput.value.length > 0 && passwordInput.value.length < NUMBER6) && (
            <small className={styles.small_warning}>
              Password deve conter no mínimo 6 caracteres
            </small>
          )
        }
        <button
          className={`${styles.btn} btn btn-outline-light`}
          type="button"
          disabled={isBtnDisabled()}
          onClick={handleLogin}
        >
          {
            isLoading ? 'Carregando...' : 'Entrar'
          }
        </button>
        <small>{alertMessage}</small>
      </div>
      <div className={styles.container_register}>
        <p>
          Novo por aqui?
          {' '}
          <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </main>
  );
}

export default Login;

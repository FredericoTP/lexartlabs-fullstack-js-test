import { useContext } from 'react';
import LoginContext from '../context/LoginContext';

function Login() {
  const {
    emailInput, passwordInput, isBtnDisabled, handleLogin, isLoading, alertMessage,
  } = useContext(LoginContext);
  const NUMBER6 = 6;

  return (
    <div>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={emailInput.value}
          onChange={emailInput.handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordInput.value}
          onChange={passwordInput.handleChange}
        />
        {
          (passwordInput.value.length > 0 && passwordInput.value.length < NUMBER6) && (
            <small>
              Password deve conter no mínimo 6 caracteres
            </small>
          )
        }
        <button
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
      <div>
        <p>
          Novo por aqui?
          {' '}
          <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

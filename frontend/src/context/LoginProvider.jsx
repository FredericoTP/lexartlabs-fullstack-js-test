import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';
import useInput from '../hooks/useInput';
import api from '../utils/apiInstance';

function LoginProvider({ children }) {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function isBtnDisabled() {
    const NUMBER5 = 5;
    const validatePassword = passwordInput.value.length > NUMBER5;
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    return !(validatePassword && validEmail.test(emailInput.value));
  }

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const response = await api.post('/login', {
        email: emailInput.value,
        password: passwordInput.value,
      });

      if (response.data.token) {
        setAlertMessage('Login realizado com sucesso!');
        localStorage.setItem('token', response.data.token);
        setIsLoading(false);
        navigate('/home', { replace: true });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message);
      }
      setIsLoading(false);
    }
  };

  const valueLogin = useMemo(() => ({
    emailInput,
    passwordInput,
    alertMessage,
    isLoading,
    isBtnDisabled,
    handleLogin,
  }), [emailInput, passwordInput, alertMessage, isLoading]);

  return (
    <LoginContext.Provider value={valueLogin}>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LoginProvider;

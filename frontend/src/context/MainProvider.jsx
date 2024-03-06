import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import PropTypes from 'prop-types';
import MainContext from './MainContext';
import api from '../utils/apiInstance';
import { hasSession, decodeToken, getToken } from '../utils/authentication';

function MainProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [accountProducts, setAccountProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  function checkLogin() {
    const token = hasSession();

    if (!token) {
      alert('Você precisa estar logado para acessar esta página!');
      navigate('/', { replace: true });
    }
  }

  function userInfo() {
    setUser(decodeToken());
  }

  async function userProducts() {
    try {
      setIsLoading(true);
      const token = getToken();

      const response = await api.get('/product/account', { headers: { Authorization: token } });
      setAccountProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message);
      }
      setIsLoading(false);
    }
  }

  async function allProducts() {
    try {
      setIsLoading(true);
      const token = getToken();

      const response = await api.get('/product', { headers: { Authorization: token } });
      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message);
      }
      setIsLoading(false);
    }
  }

  const valueMain = useMemo(() => ({
    checkLogin,
    userInfo,
    user,
    userProducts,
    accountProducts,
    products,
    allProducts,
    isLoading,
    alertMessage,
  }), [user, accountProducts, products, isLoading, alertMessage]);

  return (
    <MainContext.Provider value={valueMain}>
      {children}
    </MainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainProvider;

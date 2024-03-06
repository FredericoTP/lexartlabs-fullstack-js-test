import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  }

  return (
    <header>
      <div>
        <Link to="/home">Início</Link>
        <Link to="/product">Meus Produtos</Link>
        <Link to="/create">Novo Produto</Link>
      </div>
      <div>
        <button
          type="button"
          onClick={logOut}
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;

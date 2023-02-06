import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="container d-flex align-items-center justify-content-around mr-5">
          <Link className="link1" to="/">
            <div className="logo d-flex flex-row col-6 ms-5">
              <h1 className="hyde">Hyde</h1>
              <h1 className="desk">Desk</h1>
            </div>
            
          </Link>
          <div className="container-info col-6 h-100 d-flex align-items-center justify-content-around me-5">
            <Link className="link1" to="/">
              <div className="sobre">
                <h2 className="sobre">Sobre nós</h2>
              </div>
            </Link>
            <Link className="link1" to="/">
              <div className="informacoes">
                <h2 className="informacoes">Informações</h2>
              </div>
            </Link>
            <Link className="link1" to="/login">
              <div className="login">
                <h2 className="login">Login</h2>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

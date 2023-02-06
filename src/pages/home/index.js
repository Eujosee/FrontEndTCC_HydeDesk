import { useContext } from 'react';
import Header from '../../components/header';
import { Context } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
    const { handleLogout } = useContext(Context)
          return (
           <div>
            <Header/>
            <button
            className="hover:bg-cyan-600 mb-6 bg-cyan-500 p-2 rounded-3xl text-white font-bold text-lg"
            onClick={() => handleLogout()}>Sair</button>
            <Link className="no-underline flex items-center " to='/cadastro-funcionario'>
                        <p className="text-black font-medium mb-1">Cadastrar funcionario</p>
            </Link>   
           </div>
          )
}

export default Home;
import React from 'react';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import './styles.css';
import imageHome from '../../assets/analisys.svg'
import RegisterClient from '../../components/modals/RegisterClient';
import RegisterSales from '../../components/modals/RegisterSales';
import iconClient from '../../assets/add.png'
import iconSale from '../../assets/discount.png';

const Home = () => (
    <div>
        <header className = 'header-home'>
            <img src={logo} alt="ffdiamonds" className = 'logo'/>

            <section className = 'links'>
                <Link to = '/Clients'>Clientes</Link>
                <Link to = '/Sales'>Vendas</Link>
            </section>
        </header>

        <main className = 'main-home'>
            <img src = {imageHome} id = 'imgHome'
            alt = 'ilustration'/>

            <section className = 'actions'> 

            <button type="button" className = 'buttonModal' data-toggle="modal" data-target="#RegisterClient">
                <img className = 'icons' src= {iconClient} alt="icone cliente"/>
                Cadastrar Clientes
            </button>

            <button type="button" className="buttonModal" data-toggle="modal" data-target="#RegisterSales">
                <img src={iconSale} alt="icone venda" className = 'icons'/>
                Registrar Venda
            </button>

            <RegisterClient />
            <RegisterSales />
            </section>
        </main>
    </div>
)

export default Home;
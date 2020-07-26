import React, { useState, useEffect, ChangeEvent } from 'react';

import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import {BsBoxArrowInLeft, BsJustify} from 'react-icons/bs';
import {FiEdit} from 'react-icons/fi';
import api from '../../services/api';
import {DebounceInput} from 'react-debounce-input';
import EditClient from '../../components/modals/EditClient';
import {ToastContainer} from 'react-toastify';

import './styles.css';

interface Clients{
    id: number,
    name: string,
    ff_id: string,
    nickname: string,
    city: string,
    telephone: string,
    uf: string
}



const Clients = () => {
    const [clients, setClients] = useState<Clients[]>([])
    const [editClient,setEditclient] = useState({
        id: NaN,
        name: '',
        ff_id: '',
        nickname: '',
        city: '',
        telephone: '',
        uf: ''
    });

    function handleValuesEditClient(client: Clients){
        setEditclient(client)
    }

    useEffect(() => {
        
        api.get<Clients[]>('/clients').then(response => {
            return setClients(response.data)
        })

    },[])

    async function handleSearch(event: ChangeEvent<HTMLInputElement>){
        const search = event.target.value

        const searchClients = await api.get(`/searchClients?search=${search}`)
        setClients(searchClients.data)
    }

    return(
        <div className = 'body-client'>
            <header className = 'header-client'>
                <Link to = '/'>
                    <BsBoxArrowInLeft style = {{width: '26px', height: '26px'}}/>
                    Home
                </Link>
        
                <h2>Clientes</h2>
            </header>

            <main className = 'main-client'>
                <section>
                    <img src={logo} alt="Logo" className = 'logo'/>

                    <span>
                        <DebounceInput 
                        type = 'search' 
                        className = 'search' 
                        debounceTimeout = {800} 
                        onChange = {handleSearch}
                        placeholder = 'Pesquise clientes' />
                        
                        
                    </span>
                    
                </section>

                <section>
                    <div className = 'table-client'>
                        <strong>FF-ID</strong>
                        
                        <strong>Nick</strong>
                       
                        <strong>Nome</strong>
                        
                        <strong>Contato</strong>
                        
                        <strong>Cidade</strong>
                        
                        <strong>UF</strong>
                    </div>
                    
                    {clients.map(client => (
                        <div className="clients-info" key = {client.id}>

                            <strong>{client.ff_id}</strong>
                            
                            <strong>{client.nickname}</strong>
                        
                            <strong>{client.name}</strong>
                            
                            <strong>{client.telephone}</strong>
                            
                            <strong>{client.city}</strong>
                            
                            <strong style = {{justifyContent: 'space-evenly'}}>
                                {client.uf}
                                <button onClick = {() => handleValuesEditClient(client) }
                                style = {{outline: 'none', background: 'none'}}
                                type="button" className = 'buttonModal' data-toggle="modal" data-target="#EditClient">

                                    <FiEdit id = 'editIcon' style = {{width : '1.3em', height: '1.3em'}} color = 'rgb(80, 154, 238)' />
                                </button>
                            </strong>
                            
                           
                            
                        </div>
                    ))}
                    
                </section>
                
            </main>
            <EditClient client = {editClient} />
            <ToastContainer limit = {1} className = 'toast-container' />

        </div>
    )
}

export default Clients;

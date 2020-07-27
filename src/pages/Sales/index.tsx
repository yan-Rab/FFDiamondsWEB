import React, { useState, useEffect, ChangeEvent } from 'react';

import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import {BsBoxArrowInLeft} from 'react-icons/bs';
import {FiEdit} from 'react-icons/fi';
import api from '../../services/api';
import {DebounceInput} from 'react-debounce-input';
import EditSales from '../../components/modals/EditSale';

import {ToastContainer} from 'react-toastify';
import iconSale from '../../assets/discount.png';
import './styles.css'

interface SalesTable{
    _id: string,
    id_client: string,
    ff_id: string,
    name: string,
    content: string,
    value: number,
    payment: string,
    obs: string
}

interface SalesResponse{
    _id: string,
    id_client: string,
    client: {
        
        ff_id: string,
        name: string,
    }[],
    content: string,
    value: number,
    payment: string,
    obs: string
}

const Sales = () => {
    const [sales,setSales] = useState<SalesTable[]>([])
    const [editSales, setEditSales] = useState({
            _id: '',
            id_client: '',
            ff_id: '',
            name: '',
            content: '',
            value: 0,
            payment: '',
            obs: ''
    })

    useEffect(() => {
        api.get<SalesResponse[]>('/sales').then(response => {

            const salesArray = response.data.map(sale => {
                const {content, _id, payment,obs,value,id_client} = sale
                const dataClient = sale.client[0]
                const {ff_id,name} = dataClient
                
                return {
                    content, _id, payment,obs,value,
                    id_client,
                    ff_id,
                    name
                }
            })
            setSales(salesArray)
        })
    },[])

    async function handleSearch(event: ChangeEvent<HTMLInputElement>){
        const search = event.target.value;
        api.get<SalesResponse[]>(`/searchSales?search=${search}`).then(response => {
            const salesArray = response.data.map(sale => {
                const {content, _id, payment,obs,value,id_client} = sale
                const dataClient = sale.client[0]
                const {ff_id,name} = dataClient
                
                return {
                    content, _id, payment,obs,value,
                    id_client,
                    ff_id,
                    name
                }
            })

            setSales(salesArray)
        })
       
    }

    function handleValuesEditSale(sale: SalesTable){
        setEditSales(sale)
    }

    return(
        <div className = 'body-sale'>
             <header className = 'header-sale'>
                <Link to = '/'>
                    <BsBoxArrowInLeft style = {{width: '26px', height: '26px'}}/>
                    Home
                </Link>
        
                <h2>Vendas</h2>
            </header>

            <main className = 'main-sale'>
                <section>
                    <img src={logo} alt="Logo" className = 'logo'/>

                    <span>
                        <DebounceInput 
                        type = 'search' 
                        className = 'search' 
                        debounceTimeout = {800} 
                        onChange = {handleSearch}
                        placeholder = 'Busque por vendas' />
                        
                        <img src={iconSale} alt="icone venda" style = {{width: '50px', height: '50px'}}/>
                    </span>
                    
                </section>

                
                <section>
                    <div className = 'table-sale'>
                        <strong>FF-ID</strong>
    
                        <strong>Nome</strong>
                        
                        <strong>Conteúdo</strong>
                        <strong>Obs</strong>
                        
                        
                        <strong>Pagamento</strong>
                        <strong>Valor</strong>
                        
                    </div>

                    {sales.map(sale => (
                        <div className="sales-info" key = {sale._id}>
                            
                            <strong>{sale.ff_id}</strong>
                            
                            <strong>{sale.name}</strong>
                        
                            <strong>{sale.content}</strong>
                            <strong>{sale.obs}</strong>
                           
                            
                            <strong>{sale.payment}</strong>
                            
                            
                            <strong>{sale.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong>
                          

                            <button onClick = {() => {handleValuesEditSale(sale)} }
                                style = {{outline: 'none', background: 'none', marginRight:'8px'}}
                                type="button" className = 'buttonModal' data-toggle="modal" data-target="#EditSales">

                                    <FiEdit id = 'editIcon' style = {{width : '1em', height: '1em'}} color = 'rgba(250, 139, 157, 0.918)' />
                            </button>
                            
                           
                            
                        </div>
                    ))}
                    
                    
                </section>
            </main>
            <ToastContainer limit = {1} className = 'toast-container' />
            
            <EditSales sale = {editSales} />
        </div>
    )
}

export default Sales;
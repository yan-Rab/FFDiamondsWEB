import React, {useState, ChangeEvent, FormEvent} from 'react';
import iconClose from '../../assets/back.png'
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify';
const RegisterSales = () => {

    const [dataSale, setDataSale] = useState({
        value: '',
        payment: '',
        content: '',
        obs: ''
    })
    const [ff_id, setFF_id] = useState('');

    function handleInputsDataSale(event: ChangeEvent<HTMLInputElement>){
        const names = event.target.name;
        const values = event.target.value;
        setDataSale({...dataSale, [names]: values})
    }

    function handleFF_ID(event:ChangeEvent<HTMLInputElement>){
        setFF_id(event.target.value)
    }

    function handleSelectDataSale(event: ChangeEvent<HTMLSelectElement>){
        const names = event.target.name;
        const values = event.target.value;
        setDataSale({...dataSale, [names]: values})
    }

    async function registerSale(event: FormEvent){
       event.preventDefault();

        try{
            const client = await api.get(`/client/${ff_id}`)
            const {content,obs,payment,value} = dataSale
            await api.post('/sale', 
            {
                id_client: client.data.id,
                content, value, obs, payment
            })

            
        }catch(error){
            return
        }
       
    }

    return(
    <div className="modal fade" id="RegisterSales" tabIndex = {-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
        <div className="modal-header">
        <h5 style = {{fontFamily: 'Poppins,sans-serif'}}
        className="modal-title" id="exampleModalLabel">Venda</h5>
        <button style = {{outline: "none"}}
        type="button" className="close" data-dismiss="modal" aria-label="Close">
        
            <img src={iconClose} alt=""  style = {{width:'40px', height: '40px'}}/>
        </button>
        </div>

        <form onSubmit = {registerSale}>
        <div className="modal-body">
            <div className="group-inputs">
            <input onChange = {handleFF_ID}
            className = 'inputs' type="text" name="ff_id" placeholder = 'ID-Jogador'
            id="ff_id" required/>
            
            </div>

            <div className="group-inputs">
                <input  onChange = {handleInputsDataSale}
                className = 'inputs' type="number" name="value" id="value" 
                placeholder = 'Valor R$' required/>

                <select onChange = {handleSelectDataSale} 
                className = 'inputs' name="payment" id="payment">
                    <option value="">Pagamento</option>
                    <option value="Á Vista">Á Vista</option>
                    <option value="Boleto">Boleto</option>
                    <option value="Transferência">Transferência</option>
                </select>
            </div>

            <div className="group-inputs">
                <input  onChange = {handleInputsDataSale}
                type= 'text' className = 'inputs' name="content" id="content" placeholder = 'Conteúdo' required/>
            </div>

            <div className="group-inputs">
                <input  onChange = {handleInputsDataSale}
                className = 'inputs' type="text" name="obs" id="obs" placeholder = 'Observação'/>
            </div>

           
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="submit" className="btn btn-primary">Registrar</button>
        </div>

        </form>
    </div>
    </div>
    <ToastContainer limit = {1} className = 'toast-container' />
    </div>
    )
}

export default RegisterSales
import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import iconClose from '../../assets/back.png'
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify';

interface Props{
    sale: {
        _id: string,
        id_client: string,
        ff_id: string,
        name: string,
        content: string,
        value: number,
        payment: string,
        obs: string
    }
}

const EditSale: React.FC<Props> = ({sale}) => {

    const [dataSale, setDataSale] = useState({
        _id: '',
        ff_id: '',
        id_client: '',
        name: '',
        value: 0,
        payment: '',
        content: '',
        obs: ''
    })

    useEffect(() => {
        setDataSale(sale)
    }, [sale])

    function handleInputsDataSale(event: ChangeEvent<HTMLInputElement>){
        const names = event.target.name;
        const values = event.target.value;
        setDataSale({...dataSale, [names]: values})
    }

    

    function handleSelectDataSale(event: ChangeEvent<HTMLSelectElement>){
        const names = event.target.name;
        const values = event.target.value;
        setDataSale({...dataSale, [names]: values})
    }

    async function registerSale(event: FormEvent){
       event.preventDefault();
    
        try{
            const client = await api.get(`/client/${dataSale.ff_id}`)
            
            const {content,obs,payment,value} = dataSale
            
            await api.put('/sales', 
            {
                _id: sale._id,
                id_client: client.data,
                content, value, obs, payment
            })

            
        }catch(error){
            return
        }
       
    }

    return(
    <div className="modal fade" id="EditSales" tabIndex = {-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <input onChange = {handleInputsDataSale}
            className = 'inputs' type="text" name="ff_id" value = {dataSale.ff_id} placeholder = 'ID-Jogador'
            id="ff_id" required/>
            
            </div>

            <div className="group-inputs">
                <input  onChange = {handleInputsDataSale}
                className = 'inputs' type="number" name="value" id="value" 
                placeholder = 'Valor R$' value = {dataSale.value} required/>

                <select onChange = {handleSelectDataSale} 
                className = 'inputs' name="payment" id="payment" value = {dataSale.payment}>
                    <option value="">Pagamento</option>
                    <option value="Á Vista">Á Vista</option>
                    <option value="Boleto">Boleto</option>
                    <option value="Transferência">Transferência</option>
                </select>
            </div>

            <div className="group-inputs">
                <input  onChange = {handleInputsDataSale}
                type= 'text' className = 'inputs' name="content" id="content" 
                value = {dataSale.content}
                placeholder = 'Conteúdo' required/>
            </div>

            <div className="group-inputs">
                <input  onChange = {handleInputsDataSale}
                className = 'inputs' type="text" name="obs" 
                value = {dataSale.obs}
                id="obs" placeholder = 'Observação'/>
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

export default EditSale;
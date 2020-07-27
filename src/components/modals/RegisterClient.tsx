import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import axios from 'axios';
import iconClose from '../../assets/back.png';

import api from '../../services/api';

interface IBGEUF{
    sigla: string
}

interface IBGECITIES{
    nome : string
}

const RegisterClient = () => {
    const [ufs, setUfs] = useState<String[]>([]);
    const [cities, setCities] = useState<String[]>([])
    const [dataClient, setDataClient] = useState({
        name: '',
        nickname: '',
        telephone: '',
        city: '',
        uf: '',
        ff_id: ''
    })

    useEffect(() => {
        axios.get<IBGEUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const ufs = response.data.map(uf => uf.sigla)
            setUfs(ufs)
        })
    }, [])

    useEffect(() => {
        axios.get<IBGECITIES[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dataClient.uf}/municipios`)
        .then(response => {
            const cities = response.data.map(city => city.nome)
            setCities(cities)
        })
    },[dataClient.uf])

    function handleInputsDataClient(event: ChangeEvent<HTMLInputElement>){
        const names = event.target.name;
        const values = event.target.value;

        setDataClient({...dataClient, [names]: values})
    }

    function handleSelectsDataClient(event: ChangeEvent<HTMLSelectElement>){
        const names = event.target.name;
        const values = event.target.value;

        setDataClient({...dataClient, [names]: values})
    }


    async function registerClient(event: FormEvent){
        event.preventDefault();
        try{
            await api.post('/client', {dataClient})

        }catch(error){
            return
        }
    }

    return(
    <div className="modal fade" id="RegisterClient" tabIndex = {-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
        <div className="modal-header">
        <h5 style = {{fontFamily: 'Poppins,sans-serif'}}
        className="modal-title" id="exampleModalLabel">Cliente</h5>
        <button style = {{outline: "none"}} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <img src={iconClose} alt=""  style = {{width:'40px', height: '40px'}}/>
        </button>
        </div>

        <form onSubmit = {registerClient}>

        <div className="modal-body">
            <div className="group-inputs">
                <input onChange = {handleInputsDataClient}
                type="text" className = 'inputs'  name="name" id="name" required placeholder = "Nome Completo"/>
                
                <input onChange = {handleInputsDataClient}
                type="text" className = 'inputs'  name="telephone" id="telephone" required placeholder = "Contato"/>

            </div>

            <div className="group-inputs">
                <select className = 'inputs' name="uf" id="uf" onChange = {handleSelectsDataClient}>
                    <option value="">UF</option>
                    {ufs.map(uf => (
                        <option value={`${uf}`} key = {`${uf}`} >{uf}</option>
                    ))}
                </select>

                <select className = 'inputs' name="city" id="city" onChange = {handleSelectsDataClient}>
                        <option value="">Cidade</option>
                        {cities.map(city => (
                            <option value={`${city}`} key = {`${city}`}>{city}</option>
                        ))}
                </select>
            </div>

            <div className="group-inputs">
                <input className = 'inputs' type="text" name="nickname" placeholder = 'NickName'
                id="nickname" onChange = {handleInputsDataClient} required/>

                <input onChange = {handleInputsDataClient}
                className = 'inputs' type="text" name="ff_id" id="ff_id" required placeholder = 'ID-Jogador'/>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="submit" className="btn btn-primary">Registrar</button>
        </div>

        </form>
        
    </div>
    </div>
    
    </div>
    )
}

export default RegisterClient;
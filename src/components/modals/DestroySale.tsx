import React from 'react';
import iconClose from '../../assets/back.png';
import api from '../../services/api';

interface Props{
  _id: string
}

const DestroySale: React.FC<Props> = ({_id}) => {

  async function destroySale(){
    await api.delete(`/sale/${_id}`)
  }

    return(
        <div className="modal fade" id="DestroySale" tabIndex = {-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 style = {{fontFamily: 'Poppins,sans-serif'}}
        className="modal-title" id="exampleModalLabel">Venda</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <img src={iconClose} alt=""  style = {{width:'40px', height: '40px'}}/>
        </button>
      </div>
      <div className="modal-body">
        Tem certeza que deseja excluir esta venda?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button style = {{backgroundColor: 'red',borderColor: 'red', outline: 'none'}} 
        type="button" className="btn btn-primary" onClick = {destroySale}>
          Excluir
        </button>
      </div>
    </div>
  </div>
</div>
    )
}

export default DestroySale
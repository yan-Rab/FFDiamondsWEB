import React from 'react';
import {toast} from 'react-toastify';



const bodyToastNotification = (icon: string, text: string) => (
    <div className = "icon-text">
        <img src={icon} alt="icone de notificação"/>
        <b>{text}</b>
    </div>
);



export default class Toasts {
    success(icon: string, text: string){ 

        return toast.success(bodyToastNotification(icon,text),{
            position: 'top-right',
            className: 'toast-success',
            closeButton: true,
            draggable: true,
            hideProgressBar: false,
            pauseOnHover: false,
            autoClose: 2500,
            closeOnClick: true,
        })
    }

    error(icon: string, text: string){
        return toast.error(bodyToastNotification(icon,text),{
            position: 'bottom-right',
            className: 'toast-error',
            closeButton: true,
            autoClose: 3000,
            draggable: true,
            closeOnClick: true,
            pauseOnHover: false,
            hideProgressBar:false,

        })
    }
}
import Modal from 'react-bootstrap/Modal';
import React from 'react'
import Login from "../components/Login"
import { ButtonContainer } from './Button';
import Signup from './Signup';

const LoginModal = (props) => {
    const fontsize = { fontSize: 'x-small' };
    const fontfamily = { fontFamily: "Times New Roman" };
    const borderHello = { border: "none" };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modalAreaEcommerce'
        >
            <button type="button" onClick={props.onHide} class="close closeButton" aria-label="Close">
                <span>&times;</span>
            </button>
            <div className='w-100 modalInputArea p-4'>
                <div className='w-50'>
                    <span className='text-center mt-3' style={{ fontSize: '32px', color: '#55311C', fontWeight: 'bold' }} id="contained-modal-title-vcenter">
                        {props.name}!
                    </span>
                    <p className='m-0'>Discover the latest deals and exclusive offers at our E-Commerce! {props.name} now to start shopping and save big!</p>
                    <Modal.Body className='mb-2'>
                        {props.name == "Login" ? <Login /> : <Signup />}
                    </Modal.Body>
                </div>
                <div className='w-50 modalImage'>
                    <img src={require('../img/eCommerceLoginModal.png')} alt='e Commerce Illustartion' />
                </div>
            </div>
        </Modal>
    );
}

export default LoginModal;

import Modal from 'react-bootstrap/Modal';
import React from 'react'
import Login from "../components/Login"
import { ButtonContainer } from './Button';
import Signup from './Signup';

const LoginModal = (props) => {
    const fontsize = {fontSize: 'x-small'};
    const fontfamily = {fontFamily: "Times New Roman"};
    const borderHello={border:"none"};
    return (
        <Modal style={{width:'50%',marginLeft:'330px'}}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
        >
            <Modal.Header>
                <button type="button" onClick={props.onHide} class="close" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <span style={{...fontfamily,fontSize:'20px',fontWeight:'bold',marginLeft:'30%'}} id="contained-modal-title-vcenter">
                    {props.name}
                </span>
            <Modal.Body>
                {props.name == "Login" ? <Login /> : <Signup />}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;

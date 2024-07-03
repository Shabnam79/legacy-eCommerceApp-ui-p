import React from 'react'
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../utils/productSlice';

const Modal = () => {
    const { modalOpen, modalProduct } = useSelector((state) => state.allproducts);
    const dispatch = useDispatch();

    const closeCartModal = (item) => {
        dispatch(closeModal(item));
    }

    return (
        <>
            {
                !modalOpen
                    ? null
                    :
                    < ModalContainer style={{ zIndex: '11' }} >
                        <div className="container">
                            <div className="row">
                                <div id="modal" className="mx-auto text-capitalize text-center px-2 py-4" style={{ width: '45%' }}>
                                    <h3 id="hdItemCart" className='text-title'>
                                        item added to the cart
                                    </h3>
                                    <div className='mt-3 w-100' style={{ height: '300px' }}>
                                        <img src={`data:image/png;base64, ${modalProduct.imageData}`} className="h-100 w-auto" alt="product" />
                                    </div>
                                    <h5 id="hdItemCartTitle" className='mt-3'>{modalProduct.title}</h5>
                                    <h5 id="hdItemCartPrice" className="text-muted">price : $ {modalProduct.price}</h5>
                                    <Link id="lnkshopping" to='/'>
                                        <ButtonContainer onClick={() => closeCartModal()}>
                                            continue shopping
                                        </ButtonContainer>
                                    </Link>
                                    <Link to='/cart'>
                                        <ButtonContainer cart onClick={() => closeCartModal()}>
                                            go to cart
                                        </ButtonContainer>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ModalContainer>
            }
        </>
    );
}

const ModalContainer = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0,0,0,0.3);
display:flex;
align-items:center;
justify-content:center;
#modal{
    background:var(--mainWhite);
}
`;

export default Modal;
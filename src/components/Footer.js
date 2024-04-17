import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="footer-section">
                <div className="container">
                    <div className="footer-content pt-5 pb-5">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        <a href="/">
                                            <img src={require('../TX-eComLogo-Cropped.png')} style={{ backgroundColor: '#fff', padding: '7.5px 10px' }} className="img-fluid" alt="logo" />
                                        </a>
                                    </div>
                                    <div className="footer-text">
                                        <p>
                                            At TestingXperts, our expertise shines through a comprehensive
                                            spectrum of Digital Assurance and Quality Engineering services that encompass QA/Test Advisory,
                                            as well as Functional and Non-Functional testing.
                                            These services are impeccably tailored to meet the demands of Next Gen technologies.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul className='d-flex flex-column'>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/wishlist">Wishlist</Link></li>
                                        <li><Link to="/orders">Orders</Link></li>
                                        <li><Link to="/cart">Cart</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>TestingXperts Pvt. Ltd.</h3>
                                    </div>
                                    <div className="footer-text">
                                        <p>Don't miss out on great deals from our app! <br />
                                            Make sure not to miss the fantastic deals available on our application. Take advantage of the great offers waiting for you to grab!
                                        </p>
                                    </div>
                                    <div className="footer-widget-heading">
                                        <h3>Follow us on Social Media.</h3>
                                    </div>
                                    <div className='footer-text-icon'>
                                        <i class="fab fa-facebook"></i>
                                        <i class="fab fa-twitter"></i>
                                        <i class="fab fa-linkedin"></i>
                                        <i class="fab fa-youtube"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                                <div className="copyright-text">
                                    <p>Copyright &copy; 2024, All Right Reserved <a href="https://www.testingxperts.com/">TestingXperts</a></p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                                <div className="footer-menu">
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/wishlist">Wishlist</Link></li>
                                        <li><Link to="/orders">Orders</Link></li>
                                        <li><Link to="/cart">Cart</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
const Footer = () => {
    return (
        <footer className="footer-area bg-f">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <h3>About Us</h3>
                        <p>Integer cursus scelerisque ipsum id efficitur. Donec a dui fringilla, gravida lorem ac, semper magna. Aenean rhoncus ac lectus a interdum. Vivamus semper posuere dui, at ornare turpis ultrices sit amet. Nulla cursus lorem ut nisi porta, ac eleifend arcu ultrices.</p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h3>Opening hours</h3>
                        <p><span className="text-color">Monday: </span>Closed</p>
                        <p><span className="text-color">Tue-Wed :</span> 9:Am - 10PM</p>
                        <p><span className="text-color">Thu-Fri :</span> 9:Am - 10PM</p>
                        <p><span className="text-color">Sat-Sun :</span> 5:PM - 10PM</p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h3>Contact information</h3>
                        <p className="lead">Ipsum Street, Lorem Tower, MO, Columbia, 508000</p>
                        <p className="lead"><a href="#">+01 2000 800 9999</a></p>
                        <p><a href="#"> info@admin.com</a></p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h3>Subscribe</h3>
                        <div className="subscribe_form">
                            <form className="subscribe_form">
                                <input name="EMAIL" id="subs-email" className="form_input" placeholder="Email Address..." type="email" />
                                <button type="submit" className="submit">SUBSCRIBE</button>
                                <div className="clearfix"></div>
                            </form>
                        </div>
                        <ul className="list-inline f-social">
                            <li className="list-inline-item"><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="company-name">All Rights Reserved. &copy; 2018 <a href="#">Yamifood Restaurant</a> Design By :
                                <a href="https://html.design/">html design</a></p>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer
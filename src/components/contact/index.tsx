import './index.css'

const Contact = () => {
    return (
        <div>
            {/* <!-- Start Contact info --> */}
            <div className="contact-imfo-box">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <i className="fa fa-volume-control-phone"></i>
                            <div className="overflow-hidden">
                                <h4>Phone</h4>
                                <p className="lead">
                                    +01 123-456-4590
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <i className="fa fa-envelope"></i>
                            <div className="overflow-hidden">
                                <h4>Email</h4>
                                <p className="lead">
                                    yourmail@gmail.com
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <i className="fa fa-map-marker"></i>
                            <div className="overflow-hidden">
                                <h4>Location</h4>
                                <p className="lead">
                                    800, Lorem Street, US
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
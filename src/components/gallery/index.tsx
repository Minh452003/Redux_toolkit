import './index.css'

const Gallery = () => {
    return (
        <div>
            {/* <!-- Start Gallery --> */}
            <div className="gallery-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-title text-center">
                                <h2>Gallery</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            </div>
                        </div>
                    </div>
                    <div className="tz-gallery">
                        <div className="row">
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-01.jpg">
                                    <img className="img-fluid" src="images/gallery-img-01.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-02.jpg">
                                    <img className="img-fluid" src="images/gallery-img-02.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-03.jpg">
                                    <img className="img-fluid" src="images/gallery-img-03.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-04.jpg">
                                    <img className="img-fluid" src="images/gallery-img-04.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-05.jpg">
                                    <img className="img-fluid" src="images/gallery-img-05.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-06.jpg">
                                    <img className="img-fluid" src="images/gallery-img-06.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Gallery --> */}
        </div>
    )
}

export default Gallery
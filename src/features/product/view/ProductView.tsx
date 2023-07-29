

import './product.css'
const ProductView = () => {
    return (
        <div>
            {/* <!-- Start Menu --> */}
            <div className="menu-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-title text-center">
                                <h2>Special Menu</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="special-menu text-center">
                                <div className="button-group filter-button-group">
                                    <button className="active" data-filter="*">All</button>
                                    <button data-filter=".drinks">Drinks</button>
                                    <button data-filter=".lunch">Lunch</button>
                                    <button data-filter=".dinner">Dinner</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row special-list">
                        <div className="col-lg-4 col-md-6 special-grid drinks">
                            <div className="gallery-single fix">
                                <img src="https://dayphache.edu.vn/wp-content/uploads/2016/09/mojito-raspberry.jpg" className="img-fluid" alt="Image" />
                                <div className="why-text">
                                    <h4>Special Drinks 1</h4>
                                    <p>Sed id magna vitae eros sagittis euismod.</p>
                                    <h5> $7.79</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 special-grid drinks">
                            <div className="gallery-single fix">
                                <img src="https://dayphache.edu.vn/wp-content/uploads/2016/09/mojito-raspberry.jpg" className="img-fluid" alt="Image" />
                                <div className="why-text">
                                    <h4>Special Drinks 2</h4>
                                    <p>Sed id magna vitae eros sagittis euismod.</p>
                                    <h5> $9.79</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 special-grid drinks">
                            <div className="gallery-single fix">
                                <img src="https://dayphache.edu.vn/wp-content/uploads/2016/09/mojito-raspberry.jpg" className="img-fluid" alt="Image" />
                                <div className="why-text">
                                    <h4>Special Drinks 3</h4>
                                    <p>Sed id magna vitae eros sagittis euismod.</p>
                                    <h5> $10.79</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 special-grid lunch">
                            <div className="gallery-single fix">
                                <img src="https://dayphache.edu.vn/wp-content/uploads/2016/09/mojito-raspberry.jpg" className="img-fluid" alt="Image" />
                                <div className="why-text">
                                    <h4>Special Lunch 1</h4>
                                    <p>Sed id magna vitae eros sagittis euismod.</p>
                                    <h5> $15.79</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 special-grid lunch">
                            <div className="gallery-single fix">
                                <img src="https://dayphache.edu.vn/wp-content/uploads/2016/09/mojito-raspberry.jpg" className="img-fluid" alt="Image" />
                                <div className="why-text">
                                    <h4>Special Lunch 2</h4>
                                    <p>Sed id magna vitae eros sagittis euismod.</p>
                                    <h5> $18.79</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 special-grid lunch">
                            <div className="gallery-single fix">
                                <img src="https://dayphache.edu.vn/wp-content/uploads/2016/09/mojito-raspberry.jpg" className="img-fluid" alt="Image" />
                                <div className="why-text">
                                    <h4>Special Lunch 3</h4>
                                    <p>Sed id magna vitae eros sagittis euismod.</p>
                                    <h5> $20.79</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 special-grid dinner">
                            <div className="gallery-single fix">
                                <img src="https://dayphache.edu.vn/wp-content/uploads/2016/09/mojito-raspberry.jpg" className="img-fluid" alt="Image" />
                                <div className="why-text">
                                    <h4>Special Dinner 1</h4>
                                    <p>Sed id magna vitae eros sagittis euismod.</p>
                                    <h5> $25.79</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 special-grid dinner">
                            <div className="gallery-single fix">
                                <img src="https://dayphache.edu.vn/wp-content/uploads/2016/09/mojito-raspberry.jpg" className="img-fluid" alt="Image" />
                                <div className="why-text">
                                    <h4>Special Dinner 2</h4>
                                    <p>Sed id magna vitae eros sagittis euismod.</p>
                                    <h5> $22.79</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 special-grid dinner">
                            <div className="gallery-single fix">
                                <img src="https://dayphache.edu.vn/wp-content/uploads/2016/09/mojito-raspberry.jpg" className="img-fluid" alt="Image" />
                                <div className="why-text">
                                    <h4>Special Dinner 3</h4>
                                    <p>Sed id magna vitae eros sagittis euismod.</p>
                                    <h5> $24.79</h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- End Menu --> */}
        </div>
    )
}

export default ProductView

import './index.css'
const About = () => {
    return (
        <div>
            {/* <!-- Start About --> */}
            <div className="about-section-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfxK2i_noapa5sHVnm6UwD8IEQUDgUdU0Tdmbj7YO8mYns_Wlu" alt="" className="img-fluid" width={'100%'} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 text-center">
                            <div className="inner-column">
                                <h1>Welcome To <span>Yamifood Restaurant</span></h1>
                                <h4>Little Story</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor suscipit feugiat. Ut at pellentesque ante, sed convallis arcu. Nullam facilisis, eros in eleifend luctus, odio ante sodales augue, eget lacinia lectus erat et sem. </p>
                                <p>Sed semper orci sit amet porta placerat. Etiam quis finibus eros. Sed aliquam metus lorem, a pellentesque tellus pretium a. Nulla placerat elit in justo vestibulum, et maximus sem pulvinar.</p>
                                <br />
                                <a className="reservation" href="#">Reservation</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End About --> */}
        </div>
    )
}

export default About
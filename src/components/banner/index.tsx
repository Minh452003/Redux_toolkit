import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import './index.css'

const Banner = () => {
    const progressCircle: any = useRef(null);
    const progressContent: any = useRef(null);

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper">

            <SwiperSlide>
                <div className="container4">
                    <div className="card4">
                        <img src="https://res.cloudinary.com/dkvghcobl/image/upload/v1691053368/lbnf4cwghozt7ebebetj.png" className="card-img4 slowfloat" />
                        <div className="card-body4">
                            <h5 className='namebaner'>Deluxe Rice</h5>
                            <p className='bannerdes'>A nutritious full-course deluxe meal, mainly consisting of grilled or stewed beef or chicken, potatoes, beans, boiled vegetables, and a piece of cake served with sauce. All for just 25,000 Vietnamese dong</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="container4">
                    <div className="card4">
                        <img src="https://res.cloudinary.com/dkvghcobl/image/upload/v1691053367/lbstthllttysy6v3ykxo.png" className="card-img4 slowfloat" />
                        <div className="card-body4">
                            <h5 className='namebaner'>Chia seed drink</h5>
                            <p className='bannerdes'>Chia seed drink contains many beneficial nutrients for health. Only for 15,000 Vietnamese dong.</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="container4">
                    <div className="card4">
                        <img src="https://res.cloudinary.com/dkvghcobl/image/upload/v1691053367/gqamsw8n0k9h4aeyfl00.png" className="card-img4 slowfloat" />
                        <div className="card-body4">
                            <h5 className='namebaner'>Passion fruit lemon tea</h5>
                            <p className='bannerdes'>You're already quite familiar with lemon tea, lemon water, lemon smoothies... So how about passion fruit lemon tea? Only for 15,000 Vietnamese dong.</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div>
        </Swiper>

    )
}

export default Banner;
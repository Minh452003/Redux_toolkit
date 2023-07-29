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
    const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

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
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper">

            <SwiperSlide

            >
                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQYeKuDwTXVtCFAAFiEoc0hwDyFgSMQ-32L7mDpQmKEAFp1A3Sr" alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Welcome To <br /> Yamifood Restaurant</strong></h1>
                            <p className="m-b-40">See how your users experience your website in realtime or view
                                <br />
                                trends to see any changes in performance over time.</p>
                            <br />
                            <p><a className="reservation" href="#">Reservation</a></p>
                        </div>
                    </div>
                </div>


            </SwiperSlide>
            <SwiperSlide>
                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQYeKuDwTXVtCFAAFiEoc0hwDyFgSMQ-32L7mDpQmKEAFp1A3Sr" alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Welcome To <br /> Yamifood Restaurant</strong></h1>
                            <p className="m-b-40">See how your users experience your website in realtime or view
                                <br />
                                trends to see any changes in performance over time.</p>
                            <br />

                            <p><a className="reservation" href="#">Reservation</a></p>
                        </div>
                    </div>
                </div>

            </SwiperSlide>
            <SwiperSlide>
                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQYeKuDwTXVtCFAAFiEoc0hwDyFgSMQ-32L7mDpQmKEAFp1A3Sr" alt="" className='banner' />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Welcome To <br /> Yamifood Restaurant</strong></h1>
                            <p className="m-b-40">See how your users experience your website in realtime or view
                                <br />
                                trends to see any changes in performance over time.</p>
                            <br />
                            <p><a className="reservation" href="#">Reservation</a></p>
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
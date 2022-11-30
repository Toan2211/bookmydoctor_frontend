import hospitalApi from 'api/hospitalApi'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import HospitalItem from '../../../../components/HospitalItem'
import './index.scss'
function TopHospitals() {
    const [hospitalData, setHospitalData] = useState([])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    }
    useEffect(() => {
        (async () => {
            const data = await hospitalApi.getAllHospital()
            setHospitalData(data.hospital.slice(0, 6))
        })()
    }, [])
    return (
        <div className="topHospitals">
            <div className="topHospitals__container">
                <header>Bệnh viện tiêu biểu</header>
                <Slider {...settings}>
                    {hospitalData.map (hospital => <HospitalItem key={hospital.id} data = {hospital}/>)}
                </Slider>
            </div>
        </div>
    )
}

export default TopHospitals

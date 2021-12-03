import React,{ useEffect } from 'react';
import Icon1 from '../../images/svg-7.svg'
import Icon2 from '../../images/svg-2.svg'
import Icon3 from '../../images/svg-3.svg'
import {
         ServicesH2,
         ServicesContainer,
         ServicesWrapper,
         ServicesCard,
         ServicesIcon,
         Servicesp
} from './Advertisements-styles';
import Aos from 'aos';
import "aos/dist/aos.css";


const Services = () => {

    useEffect(()=>{
        Aos.init({duration: 2000 });
    },[])

    return (
        <ServicesContainer id="services">
            <ServicesWrapper>

                <ServicesCard data-aos="fade-right" >
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2>Enjoy on your mobile</ServicesH2>
                    <Servicesp>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV</Servicesp>
                </ServicesCard>

                <ServicesCard data-aos="fade-right">
                    <ServicesIcon src={Icon2} />
                    <ServicesH2>Watch anywhere</ServicesH2>
                    <Servicesp>Enjoy from the web or with the Prime Video app on your phone, tablet, or select Smart TVs — on up to 3 devices at once.</Servicesp>
                </ServicesCard>

                <ServicesCard data-aos="fade-right">
                    <ServicesIcon src={Icon3} />
                    <ServicesH2>Gather your favorite shows to a One place</ServicesH2>
                    <Servicesp>Save your favorites easily and always have something to watch.</Servicesp>
                </ServicesCard>



            </ServicesWrapper>

        </ServicesContainer>
    )
}

export default Services

import React, { useState, useEffect} from 'react';
import Background from '../../images/movie-reel-purple-background.jpg'; 
import { HeroContainer,
         HeroBg,
         VideoBg,
         HeroContent,
         HeroH1,
         HeroP,
         HeroBtnWrapper,
         ArrowForward,
         ArrowRight,
         Buttong,
          } from './HeroElements';
import Aos from 'aos';
import "aos/dist/aos.css";

const HeroSection = () => {

    const [hover, setHover] = useState(false)

    const onHover = ()=>{
        setHover(!hover)
    }

    useEffect(()=>{
        Aos.init({duration: 2000 });
    },[])

    return (
        <HeroContainer id='home'>
            <HeroBg>
                <VideoBg style={{ backgroundImage: `url(${Background})`}}/>
            </HeroBg>
            <HeroContent>
                <HeroH1 data-aos="fade-right">Welcome to FlickPlix</HeroH1>
                <HeroP data-aos="fade-left">
                Enjoy popular movies and TV shows. Join FlickPlix now 
                for USD 5.99 per month. Cancel anytime.
                </HeroP>
                <HeroBtnWrapper data-aos="fade-up">
                    <Buttong to='/customer/register' onMouseEnter = {onHover} 
                    onMouseLeave = {onHover}
                    >
                        Get started {hover ? <ArrowForward/>:<ArrowRight/>}
                    </Buttong>
                </HeroBtnWrapper>
            </HeroContent>

        </HeroContainer>
            
        
    );
};

export default HeroSection;

import React, { useState, useEffect} from 'react';
import Video from '../../videos/video3.mp4'
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
      <HeroContainer id="home">
        <HeroBg>
          <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
        </HeroBg>
        <HeroContent>
          <HeroH1 data-aos="fade-right">Welcome to FlickPlix</HeroH1>
          <HeroP data-aos="fade-left">
            Enjoy popular movies and TV shows. Join FlickPlix now for USD 5.99
            per month. Cancel anytime.
          </HeroP>
          <HeroBtnWrapper data-aos="fade-up">
            <Buttong
              to="/register"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
            >
              Get started {hover ? <ArrowForward /> : <ArrowRight />}
            </Buttong>
          </HeroBtnWrapper>
        </HeroContent>
      </HeroContainer>
    );
};

export default HeroSection;

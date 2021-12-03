import React from 'react';
import HeroSection from '../../components/HeroSection';
import InfoSection from '../../components/InfoSection';
import Services from '../../components/Advertisements';
import { homeObjOne,homeObjTwo,homeObjThree  } from '../../components/InfoSection/Data';


const Home = () => {

    return (
       <>
        
        <HeroSection />
        <Services/>
        <InfoSection {...homeObjTwo}/>
        <InfoSection {...homeObjOne}/>
        <InfoSection {...homeObjThree}/>
        
   
        
        </>
    )
}

export default Home

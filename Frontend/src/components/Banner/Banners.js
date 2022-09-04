import React, { useEffect } from "react";
import './Banner.css'
import Aos from "aos";
import "aos/dist/aos.css";
import SimpleImageSlider from "react-simple-image-slider";

const Banners = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

    const images = [
      {
        url: "https://collider.com/wp-content/uploads/avengers-character-poster-banner.jpeg",
      },
      {
        url: "https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg",
      },
      {
        url: "https://collider.com/wp-content/uploads/inception_movie_poster_banner_01.jpg",
      },
      {
        url: "http://host.trivialbeing.org/up/tdk-jun5-bannerbatmanexclusivo2.jpg",
      },
    ];

  return (
    <div className="BannerContainer" id="banner">
      <div>
        <center>
          <SimpleImageSlider
            width={1400}
            height={450}
            images={images}
            showBullets={true}
            showNavs={true}
            slideDuration={1}
            autoPlay={true}
            autoPlayDelay={2}
            loop={true}
            style={{
              
            }}
          />
        </center>
      </div>
    </div>
  );
};

export default Banners;

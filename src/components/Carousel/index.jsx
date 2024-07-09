import React, { useState, useEffect, useCallback } from "react";
import "./carousel.scss";
import DatasCarousel from '../../DatasProjects/datasCarrouselHome.json';

function Carousel(){
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = DatasCarousel; 
    const length = slides.length;

    // Function to handle next slide //
    const nextSlide = useCallback(() => {
        setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
    }, [currentSlide, length]);

    // Function to handle previous slide //
    const previousSlide = useCallback(() => {
        setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
    }, [currentSlide, length]);

    // Automatic slide change //
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 2 seconds
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div className ="carousel">
            <div className="container-arrows">
                {length > 1 && <i className="fa-solid fa-chevron-left left" onClick={previousSlide}></i>}
                {length > 1 && <i className="fa-solid fa-chevron-right right" onClick={nextSlide}></i>}
            </div>
            <div className = "slide">
                <img src= {slides[currentSlide].cover} alt={slides[currentSlide].alt} className="cover-slide"/>
                <h3 className = "title-slide">{slides[currentSlide].title}</h3>
            </div>
        </div>
    )
}
export default Carousel;
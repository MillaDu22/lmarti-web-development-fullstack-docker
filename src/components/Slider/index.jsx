import React, { useState, useEffect, useCallback } from 'react';
import './slider.css';

function Slider({ images })  {
    const [currentImage, setCurrentImage] = useState(0);
    const length = images.length;

    // Function to handle next slide //
    const nextImage = useCallback(() => {
        setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1);
    }, [currentImage, length]);

    // Function to handle previous slide //
    const previousImage = useCallback(() => {
        setCurrentImage(currentImage === 0 ? length - 1 : currentImage - 1);
    }, [currentImage, length]);

    // Automatic slide change //
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000); // Change slide toutes les 5 seconds //
        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <div className="slider-slider">
            <div className='slider-container-arrows'>
                {length > 1 && <i className="fa-solid fa-chevron-left slider-left" onClick={previousImage}></i>}
                {length > 1 && <i className="fa-solid fa-chevron-right slider-right" onClick={nextImage}></i>}
            </div>
            {images.map((image, index) => (
                <div key={index} className={index === currentImage ? "slider-slides slider-active" : "slider-slides"}>
                    {index === currentImage && (<img className="slider-imgSlider" src={image} alt="slider-imgSlider" />)}
                    <div className="slider-counterSlide">
                        {length > 1 && <span className="slider-count">{currentImage + 1}/{images.length}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Slider;

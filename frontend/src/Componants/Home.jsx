    import React, { useState } from 'react';
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { useEffect } from 'react';

const Home = () => {
    const images = [
        "/public/main_page_img/main.webp",
        "/public/main_page_img/main.webp",
        "/public/main_page_img/main1.webp"
    ];

    // Use state for current index
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000)
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <>
        <div className="m-4 ">
            <div className="max-h-80 ">
                <div className="max-h-40 ">
                    <img
                        src={images[currentIndex]}
                        alt="slider"
                        className='max-h-80 w-full'

                    />
                </div>
                <button
                    className="absolute left-0 top-1/1 transform -translate-y-1/2 bg-gray-800 text-white p-2 m-4"
                    onClick={prevSlide}
                >
                    <GrLinkPrevious />
                </button>
                <button
                    className="absolute right-0 top-1/1 transform -translate-y-1/2 bg-gray-800 text-white p-2 m-4"
                    onClick={nextSlide}
                >
                    <GrLinkNext />
                </button>
            </div>
           
            </div>
            <div className=" m-4 mt-60 flex justify-evenly">
                <div className="w-[60%]  flex flex-col items-center ">
                    <img className='rounded-full h-40' width={200}src="/public/main_page_img/gardening.webp" alt="Img" />
                    <p className='text-xl'>Gardening</p>
                </div>
                <div className="w-[60%] flex flex-col items-center ">
                    <img className='rounded-full h-40' width={200}  src="/public/main_page_img/main.webp" alt="Img" />
                    <p className='text-xl'>Gardening</p>
                </div>
                <div className="w-[60%] flex flex-col items-center ">
                    <img className='rounded-full h-40' width={200}src="/public/main_page_img/main.webp" alt="Img" />
                    <p className='text-xl'>Gardening</p>
                </div>
                <div className="w-[60%]  flex flex-col items-center ">
                    <img className='rounded-full h-40' width={200}src="/public/main_page_img/main.webp" alt="Img" />
                    <p className='text-xl'>Gardening</p>
                </div>
                <div className="w-[60%] flex flex-col items-center ">
                    <img className='rounded-full h-40' width={200}src="/public/main_page_img/main.webp" alt="Img" />
                    <p className='text-xl'>Gardening</p>
                </div>
                <div className="w-[60%] flex flex-col items-center ">
                    <img className='rounded-full h-40' width={200}src="/public/main_page_img/main.webp" alt="Img" />
                    <p className='text-xl'>Gardening</p>
                </div>
            </div>
        </>
    );
};

export default Home;

import { useState } from "react";

import CarouselNavigation from "./CarouselNavigation";

import MainFeaturesSlide from "../slides/MainFeaturesSlide";
import QualityConditionSlide from "../slides/QualityConditionSlide";
import LandConstructionSlide from "../slides/LandConstructionSlide";
import GarageSaleSlide from "../slides/GarageSaleSlide";

export default function PropertyFeaturesCarousel({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        <MainFeaturesSlide data={data} />,
        <QualityConditionSlide data={data} />,
        <LandConstructionSlide data={data} />,
        <GarageSaleSlide data={data} />,
    ];

    function goPrev() {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }

    function goNext() {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 px-6 pt-5 pb-4">
                {slides[currentIndex]}
            </div>

            <div className="border-t border-slate-100 px-6 py-3">
                <CarouselNavigation
                    total={slides.length}
                    currentIndex={currentIndex}
                    onChange={setCurrentIndex}
                    onPrev={goPrev}
                    onNext={goNext}
                />
            </div>
        </div>
    );
}
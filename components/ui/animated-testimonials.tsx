"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);
    const [visibleTestimonial, setVisibleTestimonial] = useState(
        testimonials[0]
    );

    // ✅ Wrapped in useCallback to prevent unnecessary re-creation
    const handleNext = useCallback(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const handlePrev = () => {
        setActive(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    useEffect(() => {
        setVisibleTestimonial(testimonials[active]);
    }, [active, testimonials]);

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay, handleNext]); // ✅ Now properly includes handleNext

    return (
        <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
                <div>
                    <div className="relative h-80 w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={visibleTestimonial.src}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 origin-bottom"
                            >
                                <Image
                                    src={visibleTestimonial.src}
                                    alt={visibleTestimonial.name}
                                    width={500}
                                    height={500}
                                    draggable={false}
                                    className="h-full w-full rounded-3xl object-cover object-center"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex justify-between flex-col py-4">
                    <motion.div
                        key={active}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <h3 className="text-2xl font-bold dark:text-white text-black">
                            {visibleTestimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-neutral-500">
                            {visibleTestimonial.designation}
                        </p>
                        <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
                            {visibleTestimonial.quote
                                .split(" ")
                                .map((word, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeInOut",
                                            delay: 0.02 * index,
                                        }}
                                        className="inline-block"
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                        </motion.p>
                    </motion.div>
                    <div className="flex gap-4 pt-12 md:pt-0">
                        <button
                            onClick={handlePrev}
                            className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                        >
                            <ArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                        >
                            <ArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

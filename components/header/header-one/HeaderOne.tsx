import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import React, { useEffect, useState } from "react";

const HeaderOne: React.FC = () => {
    const { toast } = useToast();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                day: "2-digit",
                month: "short",
                year: "numeric",
            };
            setCurrentTime(now.toLocaleDateString("en-US", options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopy = () => {
        const phoneNumber = "011-26588500";
        navigator.clipboard.writeText(phoneNumber);
        toast({
            title: "Number Copied!",
            description: `${phoneNumber} has been copied to your clipboard.`,
        });
    };

    return (
        <header className="flex flex-wrap justify-between items-center px-4 md:px-6 dark:bg-transparent py-2">
            {/* Left side: Date, Time, Day */}
            <div className="text-[min(4vw,1rem)] leading-relaxed  text-gray-700 dark:text-gray-300">
                {currentTime}
            </div>

            {/* Right side: Call Button with Copy Functionality */}
            <Button
                onClick={handleCopy}
                className="px-4 mt-2 sm:px-4 py-2 text-primary font-medium rounded-md text-[min(4vw,1rem)] leading-relaxed  dark:text-gray-300"
                variant={"link"}
            >
                Call us now : 011-26588500
            </Button>
        </header>
    );
};

export default HeaderOne;

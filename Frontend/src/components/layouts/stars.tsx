/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';

interface Stars {
    size: number;
    delay: number;
    top: number;
    right: number;
}

const StarryBackground = () => {
    const [stars, setStars] = useState<Stars[]>([]);

    useEffect(() => {
        function generateRandomPosition() {
            const size = Math.floor(Math.random() * 50);
            const delay = Math.floor(Math.random() * 3);
            const top = Math.floor(Math.random() * window.innerHeight);
            const right = Math.floor(Math.random() * window.innerWidth);
            return { size, delay, top, right };
        };

        const starsArray: Stars[] = [];
        for (let i = 0; i < 100; i++) {
            starsArray.push(generateRandomPosition());
        }
        setStars(starsArray);
    }, []);

    return (
        <div className="fixed w-full h-full -mt-36 -z-10">
            {stars.map((star, index) => (
                <div
                    key={index}
                    className="fixed text-slate-50 star stars-bg__star"
                    style={{ top: `${star.top}px`, right: `${star.right}px`, animationDelay: `${star.delay}s`, fontSize: `${star.size}px` }}
                >
                    .
                </div>
            ))}
        </div>
    );
};

export default StarryBackground;
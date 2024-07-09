import React, { useState, useEffect, FC } from 'react';
interface LoaderProps {
    messages: string[];
}

const Loader: FC<LoaderProps> = ({ messages }) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(interval);
    }, [messages]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col justify-center items-center z-50">
            <div className="loader my-5"></div>
            <h2 className="text-2xl font-bold mt-4">Sarvam</h2>
            <p className="mt-2 fade">{messages[currentMessageIndex]}</p>
            <style jsx>{`
                .fade {
                    animation: fadeInOut 3s infinite;
                }

                @keyframes fadeInOut {
                    0% { opacity: 0; }
                    10% { opacity: 0.5; }
                    20% { opacity: 1; }
                    30% { opacity: 1; }
                    40% { opacity: 1; }
                    50% { opacity: 1; }
                    60% { opacity: 1; }
                    70% { opacity: 1; }
                    80% { opacity: 0.5; }
                    90% { opacity: 0; }
                    100% { opacity: 0; }
                }

                .loader {
                    width: 4px;
                    color: #000;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    box-shadow: 
                        19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px,
                        19px 0     0 5px, 38px 0     0 5px, 57px 0     0 5px,
                        19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 0px;
                    transform: translateX(-38px);
                    animation: l26 2s infinite linear;
                }
                
                @keyframes l26 {
                    12.5% {box-shadow: 
                        19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 5px,
                        19px 0     0 5px, 38px 0     0 0px, 57px 0     0 5px,
                        19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 0px}
                    25%   {box-shadow: 
                        19px -19px 0 5px, 38px -19px 0 0px, 57px -19px 0 5px,
                        19px 0     0 0px, 38px 0     0 0px, 57px 0     0 0px,
                        19px 19px  0 0px, 38px 19px  0 5px, 57px 19px  0 0px}
                    50%   {box-shadow: 
                        19px -19px 0 5px, 38px -19px 0 5px, 57px -19px 0 0px,
                        19px 0     0 0px, 38px 0     0 0px, 57px 0     0 0px,
                        19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 5px}
                    62.5% {box-shadow: 
                        19px -19px 0 0px, 38px -19px 0 5px, 57px -19px 0 0px,
                        19px 0     0 0px, 38px 0     0 5px, 57px 0     0 0px,
                        19px 19px  0 5px, 38px 19px  0 0px, 57px 19px  0 0px}
                    100%  {box-shadow: 
                        19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px,
                        19px 0     0 5px, 38px 0     0 5px, 57px 0     0 5px,
                        19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 0px}
                }
            `}</style>
        </div>
    );
};

export default Loader;

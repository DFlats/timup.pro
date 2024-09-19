/* eslint-disable react/react-in-jsx-scope */
import { useRef } from "react";

export function PlusTag() {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef.current)
            inputRef.current.focus();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (inputRef.current && (e.key == 'Enter' || e.key == 'Tab')) {
            console.log(`New tag with value ${inputRef.current.value}`)
        }
    }

    return (
        <button
            className={`btn rounded-full m-2 text-white bg-orange-700`}
            onClick={() => handleClick()}>
            <input
                ref={inputRef}
                placeholder="+"
                className="input"
                onKeyDown={handleKeyDown} />
        </button>
    );
}


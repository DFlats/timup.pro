/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState } from "react";

export function PlusTag() {
    const [characters, setCharacters] = useState(1);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef.current)
            inputRef.current.focus();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!inputRef.current) return;

        setCharacters(inputRef.current.value.length);

        if (e.key == 'Enter' || e.key == 'Tab') {
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
                className="bg-transparent"
                style={{
                    width: `${characters}ch`
                }}
                onKeyDown={handleKeyDown} />
        </button>
    );
}


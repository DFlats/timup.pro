/* eslint-disable react/react-in-jsx-scope */
import { SignUpButton } from "@clerk/clerk-react";
import "./heroSection.css";

export function HeroSection() {

    return (
        <section className="flex justify-around mt-32">
            <div className="max-w-2xl pl-20">
                <h1 className="text-slate-50 text-6xl mt-10">Join the Creative Community!</h1>
                <p className="text-slate-50 text-3xl mt-5">Collaborate on innovative projects with skilled partners who are eager to contribute.</p>
                <SignUpButton mode='modal'>
                    <button className="btn h-14 w-48 btn-accent text-slate-50 text-3xl mt-5">
                        Sign Up
                    </button>
                </SignUpButton>
            </div>
            <div className="floating">
                <img className="contrast-[1.2] brightness-95" src="floating-island-with-a-human-sitting-at-a-computer.png" alt="image of a floating island with a human sitting at a computer" />
            </div>
        </section>
    )
}
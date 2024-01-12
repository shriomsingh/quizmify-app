"use client"
import Image from 'next/image';
import React from 'react';
import { Progress } from './ui/progress';
import ExamsGIF from '../../public/Exams.gif';
import BloodTestGIF from '../../public/Blood test.gif';
import CreativeExperimentGIF from '../../public/Creative experiment.gif';
import GirlStudying from '../../public/GirlStudying.gif';
import BoyStudying from '../../public/BoyStudying.gif';
import Library from '../../public/Library.gif';
import Nerd from '../../public/Nerd.gif';
import StudentStress from '../../public/Student stress.gif';
import TeacherStudent from '../../public/Teacher student.gif';
import VirtualReality from '../../public/Virtual reality.gif';
interface Props {
    finished: boolean,
}

const loadingTexts: string[] = [
        'Generating mind-bending questions just for you....', 
        "Cooking up challenging queries, please wait....",
        "Loading trivia tidbits for your quiz adventure....",
        "Assembling brain teasers with a touch of magic....",
        "Crafting questions that will keep you on your toes....",
        "Brewing a blend of curiosity and knowledge....",
        "Creating a quiz tailored to your intellect....", 
        "Weaving a web of quiz questions, almost there...."
]

const loadingImgs = [ VirtualReality, TeacherStudent, StudentStress, Nerd, Library];

const LoadingQuestions: React.FC<Props> = ({finished}) => {
    const [progress, setProgress] = React.useState(0);
    const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);
    const [loadingImg, setLoadingImg] = React.useState(loadingImgs[0])
    React.useEffect(() =>{
        const interval = setInterval(() =>{
            const randomIndex = Math.floor(Math.random() * loadingTexts.length);
            setLoadingText(loadingTexts[randomIndex]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() =>{
        const interval = setInterval(() =>{
            const randomIndex = Math.floor(Math.random() * loadingImgs.length);
            setLoadingImg(loadingImgs[randomIndex]);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() =>{
            setProgress((prevProgress) => { 
                if(finished) return 100;
                if(prevProgress >= 100) return 0;
                if(prevProgress >= 90 && prevProgress <= 99.5) return prevProgress + 0.05;
                if(Math.random() < 0.1) return prevProgress + 1;
                return prevProgress + 0.5;
            });
        }, 100)
        return () => clearInterval(interval);
    }, [finished])
    console.log(progress);
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
            <Image
                src={loadingImg}
                width={500}
                height={500}
                alt="Loading Animation" 
            />
            <Progress value={progress} max={100} className="w-full mt-4"/>
            <h1 className="mt-2 text-xl">{loadingText}</h1>
        </div>
    )
}

export default LoadingQuestions

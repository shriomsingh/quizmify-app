import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog'
import { Github, HelpCircle, Linkedin } from 'lucide-react';
import Image from 'next/image';
import nextauth from '../../public/nextauth.png';
import nextjs from '../../public/nextjs.png';
import openai from '../../public/openai.png';
import planetscale from '../../public/planetscale.png';
import prismaIcon from '../../public/prisma.png';
import reactquery from '../../public/reactquery.png';
import tailwindcss from '../../public/tailwindcss.png';
import typescript from '../../public/typescript.png';
import langchain from '../../public/langchain.png';
import shadcnui from '../../public/shadcnui.png';
import Link from 'next/link';

interface Props {
    
}

const DetailsDialog: React.FC<Props> = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <span className="flex items-center px-2 py-1 text-white rounded-md bg-slate-800">What is This
                <HelpCircle className="w-5 h-5 ml-1" />
                </span>
            </DialogTrigger>
            <DialogContent className="w-[70vw] max-w-[100vm] md:w-[50vw]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Welcome to Quizmify</DialogTitle>
                    <DialogDescription>
                        <p className="my-2 mt-4 mb-4">Our platform is transforming the quiz and trivia landscape by tapping into the power of artificial intelligence. Say goodbye to the usual, and get ready for an extraordinary quiz experience!</p>
                        <hr />
                        <p className='my-2 font-semibold'>
                            <h4 className="text-base font-semibold">Built With</h4>
                            <div className="grid justify-around grid-cols-4 mt-2 gap-y-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="Next.js"
                                        src={nextjs}
                                        width={35}
                                        height={35}
                                        className='dark:bg-white'
                                    />
                                    <span className="">Next.js</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="LangChain"
                                        src={langchain}
                                        width={35}
                                        height={35}
                                    />
                                    <span className="">LangChain</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="Prisma"
                                        src={prismaIcon}
                                        width={35}
                                        height={35}
                                    />
                                    <span className="">Prisma</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="OpenAI"
                                        src={openai}
                                        width={35}
                                        height={35}
                                    />
                                    <span className="">Open AI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="planetscale"
                                        src={planetscale}
                                        width={35}
                                        height={35}
                                        className='dark:bg-white'
                                    />
                                    <span className="">Planet Scale</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="tailwind css"
                                        src={tailwindcss}
                                        width={35}
                                        height={35}
                                    />
                                    <span className="">Tailwind CSS</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="React Query"
                                        src={reactquery}
                                        width={35}
                                        height={35}

                                    />
                                    <span className="">React Query</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="Next Auth Icon"
                                        src={nextauth}
                                        width={35}
                                        height={35}
                                    />
                                    <span className="">Next Auth</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="Typscript Icon"
                                        src={typescript}
                                        width={35}
                                        height={35}
                                    />
                                    <span className="">Typescript</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image 
                                        alt="Shadcn UI Icon"
                                        src={shadcnui}
                                        width={35}
                                        height={35}
                                        className='dark:bg-white'
                                    />
                                    <span className="">shadcn/ui</span>
                                </div>
                            </div>
                            <hr />
                                <div className='flex flex-row items-center justify-center my-2 gap-2 font-semibold'>
                                    <h4 className="text-base font-semibold">Github</h4>
                                    <Link href="https://github.com/shriomsingh" target='_blank'><Github className='hover:fill-stone-300' /></Link>
                                    <h4 className="text-base font-semibold">LinkedIn</h4>
                                    <Link href="https://www.linkedin.com/in/shriomsinghbhati" target='_blank'><Linkedin className='mb-1 hover:fill-stone-300'/></Link>
                                </div>
                        </p>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DetailsDialog

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Award, Frown, Medal, Trophy } from 'lucide-react'

interface Props {
    correctAnswer: number,
    totalQuestions: number,
}

const ResultCard: React.FC<Props> = ({correctAnswer, totalQuestions}) => {
    const accuracy = (correctAnswer / totalQuestions) * 100;
    return (
        <Card className="md:col-span-7">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <CardTitle className="text-2xl font-bold">Results</CardTitle>
                <Award />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-3/5">
                {
                    accuracy > 90 && (
                        <>
                            <Trophy className="mr-4" stroke="gold" size={50} />
                            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
                                <span className='text-center'>Outstanding!</span>
                                <span className="text-sm text-center text-black dark:text-white opacity-50 ">You got {correctAnswer} out of {totalQuestions} questions right.</span>
                            </div>
                        </>
                    )
                }
                {
                    accuracy <= 90 && accuracy > 75 && (
                        <>
                            <Trophy className="mr-4" stroke="silver" size={50} />
                            <div className="flex flex-col text-2xl font-semibold text-silver">
                                <span className='text-center'>Impressive!</span>
                                <span className="text-sm text-center text-black dark:text-white opacity-50">You got {correctAnswer} out of {totalQuestions} questions right.</span>
                            </div>
                        </>
                    )
                }
                {
                    accuracy <= 75 && accuracy > 60 && (
                        <>
                            <Trophy className="mr-4" stroke="#b08d57" size={50} />
                            <div className="flex flex-col text-2xl font-semibold text-bronze">
                                <span className='text-center'>Average!</span>
                                <span className="text-sm text-center text-black dark:text-white opacity-50">You got {correctAnswer} out of {totalQuestions} questions right.</span>
                            </div>
                        </>
                    )
                }
                {
                    accuracy <= 60 && (
                        <div className="flex flex-col items-center justify-center">
                            <Frown stroke="#b91c1c" size={50} />
                            <div className="flex flex-col text-2xl font-semibold text-red-700">
                                <span className='text-center'>You need to work on your skills!</span>
                                <span className="text-sm text-center text-black dark:text-white opacity-50">You got {correctAnswer} out of {totalQuestions} questions right.</span>
                            </div>
                        </div>
                    )
                }
            </CardContent>
        </Card>
    )
}

export default ResultCard

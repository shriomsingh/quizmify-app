import React from 'react'
import { Card } from './ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Separator } from './ui/separator'

interface Props {
    correctAnswers: number,
    wrongAnswers: number,
}

const MCQCounter: React.FC<Props> = ({correctAnswers, wrongAnswers}) => {
    
    return (
        <Card className="flex flex-rows items-center justify-center p-2">
            <CheckCircle2 color='green' size={30}/>
            <span className="mx-2 text-2xl text-green-800">{correctAnswers}</span>
            <Separator orientation='vertical' />
            <span className="mx-2 text-2xl text-red-800">{wrongAnswers}</span>
            <XCircle color="red" size={30} />
        </Card>
    )
}

export default MCQCounter

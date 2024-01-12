import { Question } from '@prisma/client';
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { cn } from '@/lib/utils';

interface Props {
    questions: Question[];
}

const QuestionList: React.FC<Props> = ({questions}) => {

    return (
            <Table className="mt-4">
                <TableCaption>End of List.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-{100px}">No.</TableHead>
                        <TableHead>Question & Correct Answer</TableHead>
                        <TableHead>Your Answer</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {questions.map(({question, answer, userAnswer, isCorrect}, index) =>{
                    return (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="width-f">
                            {question}
                            <br />
                            <br />
                            <span className="font-semibold">{answer}</span>
                        </TableCell>
                        <TableCell className={cn({"text-green-600" : isCorrect, "text-red-600": !isCorrect}, "font-semibold")}>{userAnswer}</TableCell>
                    </TableRow>
                    )
                
                })}                    
                
            </TableBody>
        </Table>

    )
}

export default QuestionList

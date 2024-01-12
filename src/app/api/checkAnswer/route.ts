import { prisma } from "@/lib/db";
import { checkAnswerSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
export async function POST(req: Request, res: Response){
    try{
        const body = await req.json();
        const { questionId, userAnswer, selectedChoice } = checkAnswerSchema.parse(body);
        const question = await prisma.question.findUnique({
            where:{
                id:questionId
            }
        })
        if(!question){
            return NextResponse.json(
                {
                    error: "Question not found",
                },
                {
                    status: 404,
                }
            )
        }
        await prisma.question.update({
            where:{
                id:questionId
            },
            data: {
                userAnswer
            }
        })

        if(question.questionType === 'topic_based' || question.questionType === 'link_based'){
            let isCorrect : any;
            if(question.answer === "option1" || question.answer === "option2" || question.answer === "option3" || question.answer === "option4"){
                const index: number = parseInt(question.answer[question.answer.length - 1]) - 1;
                isCorrect = index === selectedChoice;
            }else{
                isCorrect = question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
            }
            await prisma.question.update({
                where: {
                    id: questionId,
                },
                data: {
                    isCorrect,
                }
            });
            return NextResponse.json(
            {
                isCorrect,
            }, 
            {
                status: 200,
            })
        }

    }catch(error){
        if(error instanceof ZodError){
            return NextResponse.json(
                {
                    error: error.issues,
            },
            {
                status: 400,
            }
            )
        }
    }
}
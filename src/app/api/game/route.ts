// /api/game
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server"; 
import { z, ZodError } from "zod";
import  axios  from 'axios';
import { GameType } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function POST(req: Request, res: Response){
    try{
        const session = await getAuthSession();
        if(!session?.user){
            return NextResponse.json(
                {
                    error: "User not authenticated",
                },
                {
                    status: 401,
                }
        );}
        const body = await req.json();
        const { topic, type, amount } = quizCreationSchema.parse(body);
        
        const game = await prisma.game.create({
            data: {
              userId: session.user.id,
              timeStarted: new Date(),
              topic,
              gameType: type as GameType,
            },
          });
        await prisma.topic_count.upsert({
            where:{
                topic,
            },
            create: {
                topic,
                count: 1,
            },
            update:{
                count:{
                    increment: 1,
                },
            },
        })
        const { data } = await axios.post(`${process.env.API_URL as string}/api/questions`, {
            topic,
            type,
            amount,
        });
        if(type === 'topic_based' || type === 'link_based'){
            type mcqQuestion = {
                question: string,
                option1: string,
                option2: string,
                option3: string,
                option4: string,
                answer: string,
            }
            let manyData = data.questions.map((question: mcqQuestion) => {
                const options: string[] = [question.option1, question.option2, question.option3, question.option4];
                return {
                    question: question.question,
                    answer: question.answer,
                    options: options,
                    gameId: game.id,
                    questionType: type
                }
            })
            await prisma.question.createMany({
                data: manyData
            })
        }
        return NextResponse.json({
            gameId: game.id
        },{ status: 200})
    } catch(error){
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
        return NextResponse.json(
            {
                error: 'Internal Server Error',
            },{
                status: 500,
            }
        )
    }
}
import { prisma } from "@/lib/db";
import { updateTimeEndedSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response){
    try{
        const body = await req.json();
        const { gameId} = updateTimeEndedSchema.parse(body);

        const game = await prisma.game.findUnique({
            where: {
                id: gameId,
            }
        })

        if(!game){
            return NextResponse.json({error: "Game ID not found"}, {status: 404})
        }
        await prisma.game.update({
            where: {id: gameId,}, data:{ timeEnded: new Date(),}
        })
        return NextResponse.json({message: "Game Ended"}, {status: 200});
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
        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            {
                status: 500,
            }
        )
    }
}
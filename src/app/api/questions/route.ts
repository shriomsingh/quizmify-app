import { quizCreationSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server"
import { ZodError } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getAuthSession } from "@/lib/nextauth";

const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
});



// POST Request mapped to /api/questions
export const POST = async (req: Request, res: Response) => {

    try{
        const session = await getAuthSession();
        // if(!session?.user){
        //     return NextResponse.json(
        //         {
        //             error: 'User not authenticated'
        //         },
        //         {
        //             status: 401,
        //         }
        //     )
        // }

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", "You are a helpful AI that is able to generate pairs of Multiple Choice Questions and answers for a given topic/link, the length of each answer should not be more than 15 words and every question should 4 Options, store the pairs of questions and answers in a JSON array. The JSON format looks like this question:'Generate Question', option1:..., option2:..., option3:..., option4:..., answer:'...'"],
            ["user", "{input}"],
        ]);
        
        const outputParser = new StringOutputParser();
        const llmChain = prompt.pipe(chatModel).pipe(outputParser);
        const body = await req.json();
        const { topic, type, amount} = quizCreationSchema.parse(body);
        let response : any;
        let questions: any;
        if(type === 'topic_based'){              
            response = await llmChain.invoke({
                input: `You have to generate ${amount} extremely hard Multiple Choice question based on ${topic}. Try to make the options randomly arranged to increase difficulty.`,
            })
            questions = JSON.parse(response).map((item : any) => ({question: item.question, option1: item.option1, option2: item.option2, option3: item.option3, option4: item.option4, answer: item.answer}));
           
        }if(type === 'link_based'){              
                response = await llmChain.invoke({
                    input: `You have to generate ${amount} hard Multiple Choice question from this ${topic}`,
                })
                questions = JSON.parse(response).map((item : any) => ({question: item.question, option1: item.option1, option2: item.option2, option3: item.option3, option4: item.option4, answer: item.answer}));
            }
        return NextResponse.json(
            {
                questions,
            }
            ,{ 
                status: 200
            });
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
};
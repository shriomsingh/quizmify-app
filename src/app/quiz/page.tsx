import QuizCreation from '@/components/QuizCreation';
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
    searchParams:{
        topic?: string;
    };
}

const QuizPage: React.FC<Props> = async ({searchParams}) => {
    const session = await getAuthSession();
    if(!session?.user){
        return redirect("/");
    }
    return (
        <div>
            <QuizCreation topicParam = {searchParams.topic ?? ""}/>
        </div>
    )
}

export default QuizPage

"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { quizCreationSchema } from '@/schemas/forms/quiz';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CopyCheck, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingQuestions from './LoadingQuestions';

interface Props {
    topicParam: string;
}

type Schema = z.infer<typeof quizCreationSchema>

const QuizCreation: React.FC<Props> = ({topicParam}) => {
    const router = useRouter();
    const [showLoader, setShowLoader] = React.useState(false);
    const [finished, setFinished] = React.useState(false);
    const {mutate: getQuestions, isLoading} = useMutation({
        mutationFn: async ({topic, type, amount} : Schema) => {  
            const response = await axios.post('/api/game', {
                topic,
                type,
                amount,
            });
            return response.data;
        }
    })

    const form = useForm<Schema>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
          topic: topicParam,
          type: "topic_based",
          amount: 3,
        },
    })
    function onSubmit(schema: Schema){
        setShowLoader(true);
        getQuestions({
            topic: schema.topic,
            type: schema.type,
            amount: schema.amount,
        }, {
            onSuccess: ({gameId}) => {
                setFinished(true);
                setTimeout(() =>{
                const type = schema.type
                router.push(`/play/${type}/${gameId}`)
                }, 1000)
            },
            onError: () => {
                setShowLoader(false);
            }
        })
    }
    form.watch();
    if(showLoader){
        return <LoadingQuestions finished={finished}/>
    }
    return (
        <div className="absolute tap-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
                    <CardDescription>Choose a topic</CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{form.getValues("type") == "topic_based" ? "Topic" : "Link"}</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" placeholder={form.getValues("type") == "topic_based" ? "Enter a topic..." : "Enter a link..."} pattern={form.getValues("type") === "topic_based" ? "^(?!https?://).*$" : "^(http|https)://.*$"} {...field} />
                            </FormControl>
                            <FormDescription>
                            {form.getValues("type") === "topic_based" ? "Please provide a topic" : "Please provide a link"}
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Number of Questions</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder="Enter an amount..." 
                                {...field}
                                type="number" 
                                // min={1}
                                // max={10}
                                onChange={(e) => {
                                    form.setValue("amount", parseInt(e.target.value));
                                }}
                                />

                            </FormControl>
                            <FormDescription>
                                Please provide no. of questions.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex justify-between">
                            <Button 
                                type='button'
                                className="rounded-none rounded-l-lg"
                                variant={form.getValues('type') == 'topic_based' ? 'default' : "secondary"}
                                onClick={() => {
                                    form.setValue('type', 'topic_based')
                                }}>
                                <CopyCheck className="w-4 h-4 mr-2"/>
                                Topic Based
                            </Button>
                            <Separator orientation='vertical'/>
                            <Button 
                                type='button'
                                className="w-1/2 rounded-none rounded-r-lg"
                                variant={form.getValues('type') == 'link_based' ? 'default' : "secondary"}
                                onClick={() => {
                                    form.setValue('type', 'link_based')
                                }}>
                                <Link className="w-4 h-4 mr-2"/>
                                Link Based
                            </Button>
                        </div>
                        <Button disabled={ isLoading } type="submit">Submit</Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default QuizCreation

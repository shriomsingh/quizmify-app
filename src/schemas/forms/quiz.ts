import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z.string().min(4, {message: "Topic must be at least 4 characters long",}).max(800, {message: "Topic must be at most 800 characters long",}),
  type: z.enum(["topic_based", "link_based"]),
  amount: z.number().min(1, {message: "Min Number of Questions can be 1"}).max(20, {message: "Max Number of Questions can be 20"}),
});

export const checkAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
  selectedChoice: z.number(),
})

export const updateTimeEndedSchema = z.object({
  gameId: z.string(),
})
'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { nextQuestion, addScore, setAiGenerating, setQuestions } from '../store/arenaSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';

export function ActiveBattle({ classLevel, topic }: { classLevel: string, topic: string }) {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex, myScore, isAiGenerating } = useAppSelector((state) => state.arena);
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  useEffect(() => {
    
    if (questions.length === 0 && !isAiGenerating) {
      dispatch(setAiGenerating(true));
      
      fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, classLevel, questionCount: 5 }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.questions) {
          dispatch(setQuestions(data.questions));
        } else {
          toast.error(data.error || 'Failed to generate quiz');
        }
      })
      .catch(err => toast.error('Error contacting AI service'))
      .finally(() => dispatch(setAiGenerating(false)));
    }
  }, [topic, classLevel, questions.length, isAiGenerating, dispatch]);

  if (isAiGenerating || questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card/50 backdrop-blur-sm border-white/10 mt-10">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h3 className="text-xl font-space-grotesk font-semibold text-primary">Gemini AI is crafting your Battle...</h3>
          <p className="text-muted-foreground font-outfit text-sm max-w-sm">Generating perfectly balanced questions for Class {classLevel} regarding {topic}. Get ready!</p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (isAnswerRevealed) return;
    
    setSelectedAnswer(index);
    setIsAnswerRevealed(true);
    
    
    if (index === currentQuestion.correctAnswerIndex) {
      dispatch(addScore(100));
      toast.success('Correct! +100 Points');
    } else {
      toast.error('Incorrect!');
    }

    
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
      dispatch(nextQuestion());
    }, 2500);
  };

  const isComplete = currentQuestionIndex >= questions.length - 1 && isAnswerRevealed;

  if (isComplete) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card/50 backdrop-blur-sm border-primary/20 mt-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-space-grotesk text-primary">Battle Complete!</CardTitle>
          <CardDescription className="text-lg">You survived the Arena</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
           <Zap className="h-16 w-16 text-yellow-500 mb-4" />
           <div className="text-5xl font-extrabold font-outfit">{myScore} pts</div>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
           <Button onClick={() => window.location.reload()}>Return to Lobby</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card/60 backdrop-blur-md border-white/10 mt-10 hover:border-primary/20 transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
           <span className="text-sm font-semibold text-primary uppercase tracking-wider font-space-grotesk">Question {currentQuestionIndex + 1} of {questions.length}</span>
           <span className="text-sm font-mono bg-primary/20 text-primary px-3 py-1 rounded-full">{myScore} pts</span>
        </div>
        <Progress value={progressPercentage} className="h-2 mb-6 bg-primary/10" />
        <CardTitle className="text-2xl font-space-grotesk leading-tight mt-6">
          {currentQuestion.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 mt-4">
        {currentQuestion.options.map((option, index) => {
          
          let buttonVariant: "outline" | "default" | "destructive" | "secondary" = "outline";
          
          if (isAnswerRevealed) {
            if (index === currentQuestion.correctAnswerIndex) {
              buttonVariant = "default"; 
            } else if (index === selectedAnswer && index !== currentQuestion.correctAnswerIndex) {
              buttonVariant = "destructive"; 
            } else {
              buttonVariant = "secondary"; 
            }
          } else if (selectedAnswer === index) {
            buttonVariant = "secondary";
          }

          return (
            <Button 
              key={index} 
              variant={buttonVariant}
              className={`w-full justify-start h-auto py-4 px-6 text-left whitespace-normal font-outfit text-base ${isAnswerRevealed && index === currentQuestion.correctAnswerIndex ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
              onClick={() => handleSelectAnswer(index)}
              disabled={isAnswerRevealed}
            >
              <span className="mr-4 text-muted-foreground font-mono">{String.fromCharCode(65 + index)}</span>
              {option}
            </Button>
          )
        })}
      </CardContent>
    </Card>
  );
}

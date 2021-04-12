import React from 'react';
import { AnswerObject } from '../App'
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type Props = {
    question: string
    answers: string[]
    callBack: (e: React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerObject | undefined
    questionNumber: number
    totalQuestions: Number
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callBack, 
    userAnswer, 
    questionNumber, 
    totalQuestions
}) => {
    return (
        <Wrapper>
        <p className="number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p className="question" dangerouslySetInnerHTML={{__html: question}}></p>
        {answers.map((answer) => {
            return (
                <ButtonWrapper
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                >
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callBack}>
                        <span dangerouslySetInnerHTML={{__html: answer}}></span>
                    </button>
                </ButtonWrapper>
            )
        })}
    </Wrapper>
    )
}

export default QuestionCard
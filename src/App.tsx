import React, { useEffect, useState } from 'react';
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions, Difficulty, QuestionState } from './API'
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
	question: string,
	answer: string,
	correct: boolean,
	correctAnswer: string
}

const TOTAL_QUESTIONS = 10

const App = () => {
	const [loading, setloading] = useState(false)
	const [questions, setQuestions] = useState<QuestionState[]>([])
	const [number, setNumber] = useState(0)
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
	const [score, setScore] = useState(0)
	const [gameOver, setGameOver] = useState(true)

	const startTrivia = async () => {
		setloading(true)
		setGameOver(false)

		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			Difficulty.EASY
		)
		setQuestions(newQuestions)
		setScore(0)
		setNumber(0)
		setUserAnswers([])
	}

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			const answer = e.currentTarget.value
			const correct = questions[number].correct_answer === answer
			if (correct) setScore(prev => prev + 1)
			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer
			}
			setUserAnswers(prev => [...prev, answerObject])
		}
	}

	const nextQuestion = () => {
		const nextQuestion = number + 1
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true)
		}
		else
			setNumber(nextQuestion)
	}

	useEffect(() => {
		setloading(false)
	}, [questions])

	return (
		<>
			<GlobalStyle />
				<Wrapper>
					<h1>React Typescript Trivia Quiz</h1>

					{gameOver || userAnswers.length === TOTAL_QUESTIONS
						? (<button className="start" onClick={startTrivia}>Start</button>)
						: null
					}
					{!gameOver ? <p className="score">Score: {score}</p> : null}
					{loading && <p>Loading questions...</p>}
					{!loading && !gameOver &&
						(<QuestionCard
							questionNumber={number + 1}
							question={questions[number].question}
							answers={questions[number].answers}
							callBack={checkAnswer}
							userAnswer={userAnswers ? userAnswers[number] : undefined}
							totalQuestions={TOTAL_QUESTIONS}
						/>)
					}
					{!gameOver && !loading && (userAnswers.length === number + 1) && (number !== TOTAL_QUESTIONS - 1) &&
						<button className="next" onClick={nextQuestion}>Next Question</button>
					}
				</Wrapper>
		</>
	);
}

export default App;

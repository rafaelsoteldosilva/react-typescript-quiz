<p align='left'>
    <img src="https://tinyimg.io/i/FrdnSlj.png" alt="React Typescript Trivia Quiz" />
</p>

# React Typescript Trivia Quiz

This is a simple app created using the well known create-react-app, using typescript

## What does "React Typescript Trivia Quiz" do?

It simply presents the user with some trivia questions, the user has to choose among 4 alternatives.

The app simply consumes the Open trivia Database, https://opentdb.com/

It takes a set of 10 questions along with its alternatives and correct answers, and send each one of them to a component named QuestionCard.tsx, which shows the in a beautiful way

## Inner aspects of the App

The main component is App.tsx, which loads the 10 questions, each question comes with four alternatives, and the correct answer.
It loads that info into several inner states (questions, answers, etc.), then it shows each using the QuestionCard.tsx component. I also sends the checkAnswer method as a callback

It shuffles the alternative answers to avoid having the correct answer in the same position

The app uses fecth to consume the api to Open trivia Database

The app also uses styled-components to style the front end

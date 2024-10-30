import { AppContext } from "../App";
import React, { useContext, useState } from "react";
import Question from "../components/Question";
import AnswerChoices from "../components/AnswerChoices";
import Message from "../components/Message";

const Game = () =>{
    const {questions} = useContext(AppContext);

    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [message, setMessage] = useState("");
    const [isNextBtnHidden, setIsNextBtnHidden] = useState(true);
    const [isSubmitBtnHidden, setIsSubmitBtnHidden] = useState(false);
    const [numberCorrect, setNumberCorrect] = useState(0);

    const userChoice = (e) =>{
        setUserAnswer(e.currentTarget.value);
    }

    const nextQuestion = () =>{
        setQuestionIndex((prev) => prev + 1);
    }

    const checkAnswer = () =>{
        if(questions[questionIndex].answer === userAnswer)
        {
            setMessage(`You chose ${userAnswer}. You are correct`);
            setNumberCorrect((prev) => prev + 1);

        } else {
            setMessage(`You chose ${userAnswer}. You are incorrect`);

        }
    }
    const userSubmitHandler = () =>{
        if(userAnswer === "")
        {
            setMessage("Answer the questions");
        } else {
            setAnsweredQuestions((prevList) => [...prevList, questions[questionIndex].id]);
            setIsNextBtnHidden(false);
            setIsSubmitBtnHidden(true);
            checkAnswer();
        }
     
    }

    const userNextHandler = () =>{
        setUserAnswer("");
        setMessage("");
        setIsNextBtnHidden(true);
        setIsSubmitBtnHidden(false);
        nextQuestion();
    }

    const restartHandler = () =>{
        setAnsweredQuestions([]);
        setMessage("");
        setUserAnswer("");
        setIsNextBtnHidden(true);
        setIsSubmitBtnHidden(false);
        setQuestionIndex(0);
        setNumberCorrect(0);
    }


    return(
        <>
        <div className="game-root">
            <div className="game-container">
                <div className="game-card">
                    {answeredQuestions.length < 10 && (
                        <>
                            <p className="text-center">Question: {answeredQuestions.length + 1} / 10</p>
                            <Question question = {questions[questionIndex].question} answeredQuestions = {answeredQuestions} />
                            <AnswerChoices triviaQuestion = {questions[questionIndex]} userAnswer = {userAnswer} userChoiceHandler={userChoice} />
                            <Message message={message}/>
                            <div id="id-navigations">
                                <button className = {`btn-game submit ${isSubmitBtnHidden ? "hidden" : undefined}`} onClick= {userSubmitHandler}>Submit</button>
                                <button className = {`btn-game next ${isNextBtnHidden ? "hidden" : undefined}`} onClick = {userNextHandler}>Next</button>
                            </div>
                        </>
                    )}
                    {answeredQuestions.length >= 10 && (<>
                        {/* {answeredQuestions.map((item) => <p>{item}</p>)} */}
                        <p className="text-center">You have finished the test.</p>
                        <p className="text-center">Here is your score.</p>
                        <h1 className="text-center">{numberCorrect / 10 * 100}%</h1>
                        <button className="btn-game restart" onClick = {restartHandler}>Restart</button>
                    </>)}
                   
                </div>
            </div>
        </div>
        </>
    )
}

export default Game;
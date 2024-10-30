import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useContext} from "react";
import { AppContext } from "../App";
import AnswerChoices from "../components/AnswerChoices.jsx";
import Message from "../components/Message.jsx";
import Question from "../components/Question.jsx";
import GameOver from "../components/GameOver.jsx";
import { userLoader } from '../components/FetchUsers.jsx';
import Loading from "../components/Loading.jsx";
import HandleError from '../components/HandleError.jsx';

const Game = () =>{
    const [userId, setUserId] = useState("");
    const [numberOfQuestionsAnswered, setNumberOfQuestionsAnswered] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [questionIndex, setQuestionIndex] = useState(numberOfQuestionsAnswered);
    const [isNextBtnHidden, setIsNextBtnHidden] = useState(true);
    const [isSubmitBtnHidden, setIsSubmitBtnHidden] = useState(false);
    const [message, setMessage] = useState("");
    const [questionList, setQuestionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //Loads the questions via useContext
    const {questions} = useContext(AppContext);

    //Function to reset the UI for the next question
    const resetUI = () =>{
        setUserAnswer("");
    }

    //Function to handler user's answer choice
    const userChoice = (e) =>{
        setUserAnswer(e.currentTarget.value);
    }

    //Function to handle next button click
    const nextBtnHandler = () =>{
        const nextQuestion = generateIndex();
        setQuestionIndex(nextQuestion);
        setNumberOfQuestionsAnswered((prev) => prev + 1);
        resetUI()
        setIsNextBtnHidden(true);
        setIsSubmitBtnHidden(false);
        setMessage("");

        setQuestionList((prevList) => [...prevList, questions[nextQuestion].id]);

    }
    const generateIndex = () =>{
        if(questions.length === 0) return 0;

        let randomNumber;
        do{
            randomNumber = Math.floor(Math.random() * questions.length);
        } while (questionList.includes(questions[randomNumber].id));

        return randomNumber;
    }

    useEffect(() =>{

        // Function to fetch user and initialize the game
        const fetchUsers = async () => {
            try{
                const response = await userLoader();
                const {id, tests} = response.data[0];
                if(response.data && response.data.length > 0 ){
                    //Saves User's id
                    setUserId(id); 

                    //Calculates how many questions the user answered
                    setNumberOfQuestionsAnswered(tests.length); 

                    //Maps all the question_id into an array
                    setQuestionList(tests.map((item) => item.question_id)); 

                    //Generates a random index number
                    const newRandomNumber = generateIndex();
                    setQuestionIndex(newRandomNumber); 

                    setLoading(false);

                } else {
                    console.log("No user found.");
                    setError("No user found");
                }
            } catch (err){
                setError("Failed to load data. Please try again later.");
                setLoading(false);
            }
        }
        fetchUsers();
    }, [questions])

    //Handle the submit of an answer
    const handleSubmit = async (e) =>{
        e.preventDefault();
        // Let's user not move on to the next question until answering
        if(userAnswer === "") { return; }

        //Checks if the answer is correct
        const isCorrect = questions[questionIndex].answer === userAnswer;

        try{
            //Stores necessary data 
            const data = {
                question_id: questions[questionIndex].id,
                user_answer: userAnswer,
                userId: userId,
                isCorrect: isCorrect
            }
            //Sends it to the server side and uploads it to the db.
            const response = await axios.post(`http://localhost:5000/api/users/answer`, data);

            if(response.data.status){
                
                //Gets the answer of the question
                const questionAnswer = questions[questionIndex].answer;
                
                isCorrect ? setMessage("You are correct!") : setMessage(`Sorry, the answer is ${questions[questionIndex].choices[questionAnswer]}`);
                
                //Hides the submit button and removes "hidden" from btn called "next"
                setIsNextBtnHidden(false);
                setIsSubmitBtnHidden(true);

                return;
            }
        } catch (err){
            //A simple log about the error
            console.log("Error updating user: ", err);
            setError("Error");
        }
    }

    return(
        <>
            <div className="game-root">
                {loading && <Loading />} 
                {error && <HandleError message = {error}/>}
                {!loading && <div className="game-container">
                    <div className ="game-card">
                        {numberOfQuestionsAnswered >= 10 ? (
                            <>
                                <GameOver userId = {userId} questions={questions}/>
                            </> ) : (
                                <>
                                    <p className="text-center">Question {numberOfQuestionsAnswered + 1} / 10</p>
                                    <Question question ={questions[questionIndex].question} />
                                    <AnswerChoices triviaQuestion = {questions[questionIndex]} userAnswer = {userAnswer} userChoiceHandler = {userChoice}/>
                                    <Message message = {message} />
                                    <div id="button-navigations">
                                        <form onSubmit={handleSubmit}>
                                            <input type="hidden" name="answer" value={userAnswer} />
                                            <input className={`btn-game submit ${isSubmitBtnHidden ? "hidden" : undefined}`} type="submit" value="Submit" />
                                        </form>
                                        <button className={`btn-game next ${isNextBtnHidden && 'hidden'}`} onClick={nextBtnHandler}>Next</button>
                                    </div>
                                </>
                            ) 
                        }
                       
                    </div>
              
                </div>
                }
            </div>
  
        </>
    )
}

export default Game;
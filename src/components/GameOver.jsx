import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { userLoader } from './FetchUsers';

const GameOver = ({userId, questions}) =>{
    const [user, setUser] = useState({});
    const [questionsAnsweredByUser, setQuestionsAnsweredByUser] = useState([]);

    useEffect(() =>{
        const fetchUsers = async () =>{
            try{
                const response = await userLoader();
                if(response.data && response.data.length > 0)
                {
                    setUser(response.data[0]);

                    const result = response.data[0].tests.map((answerByUser) => {
                        const question =  questions.find((question) => question.id === answerByUser.question_id);
                        return {
                            question: question ? question.question : "Unknown",
                            answer: question ? question.answer : "Unknown",
                            userAnswer: answerByUser.user_answer
                        };
                    });
                    setQuestionsAnsweredByUser(result);
                }
            } catch (err){
                console.log(err);
            }
        }

        fetchUsers();
    },[questions, userId]);

    //Delete all answers from users to restart the game
    const restartHandler = async (e) =>{
        e.preventDefault();
        
        try{
            const response = await axios.post("http://localhost:5000/api/users/reset", {userId: userId});
            
            console.log("Success", response);
            //Reloads the page after all data has been cleared
            window.location.reload();
    
        } catch(err)
        {
            console.log("Failed to reset", err);
        } 
    }
    return(
        <>
            <p className="text-center">Result</p>
            <div className="result-board">
                <p>Corrects: {user.correct} </p>
                <p>Incorrects: {user.wrong}</p>
            </div>
    
            <div>
                <ul className="display-questions-container">
                    { questionsAnsweredByUser.map((item, index) =>{
                        return(
                            <li key={`${index}`}>
                                <p>{index + 1}. {item.question}</p>
                                <div className="answers-section">
                                    <p>Answer: {item.answer}</p>
                                    <p><strong>User Answer:</strong> <span className= {item.answer === item.userAnswer ? "correct" : "wrong"}>{item.userAnswer}</span></p>
                                </div>
                      
                            </li>
                        )
                    })}
                </ul>
            </div>
            <form onSubmit={restartHandler}>
                <input type="hidden" name="userId" value = {userId}/>
                <input className="btn-game restart" type="submit" value={"Restart"}/>
            </form>
        </>
    )
}
export default GameOver;
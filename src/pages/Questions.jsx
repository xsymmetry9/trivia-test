import {useContext, useState} from "react";
import { AppContext } from "../App";

const Questions = () =>{
    const [number, setNumber] = useState(0);
    const {questions} = useContext(AppContext);
    
    const DisplayQuestion = ({item, index}) =>{
        const {question, answer, choices} = item
        return(
            <>
                <li>
                    <p>{`${index + 1}. ${question}`}</p>
                    <p className="text-bold padding-small">Answer: {answer}. {choices[answer]}</p>
                </li>
            </>
        )
    }
    return(
        <div className="question-root padding-small">
            <h2 className="text-center padding-medium">Questions</h2>
            <ul className="display-questions-container">
               {questions.slice(number, number + 5).map((item, index) => (
                    <DisplayQuestion key={index} index={number + index} item = {item}/>
                ))}
            </ul>
            <div className="nav-btns-container">
                <button className="btn-game btn-bg-primary-color font-uppercase" id="prev" onClick={() => setNumber((prev) => Math.max(prev - 5, 0))}>prev</button>
                <button className="btn-game btn-bg-primary-color font-uppercase" id="next"onClick={() => setNumber((prev) => Math.min(prev + 5, questions.length - 5))}>next</button>

            </div>
        
        </div>
    )
}

export default Questions;
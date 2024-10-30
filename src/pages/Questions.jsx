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
               {questions.slice(number, number + 10).map((item, index) => (
                    <DisplayQuestion key={index} index={number + index} item = {item}/>
                ))}
            </ul>
            <div className="nav-btns-container">
                <button id="btn-prev" onClick={() => setNumber((prev) => Math.max(prev - 10, 0))}>prev</button>
                <button id="btn-next"onClick={() => setNumber((prev) => Math.min(prev + 10, questions.length - 10))}>next</button>

            </div>
        
        </div>
    )
}

export default Questions;
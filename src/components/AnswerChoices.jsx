import React from 'react';

const AnswerChoices = ({userAnswer, triviaQuestion, userChoiceHandler}) =>{
    const {choices} = triviaQuestion;

    return(
        <div className ="questions-root">
            <ul className="questions-container">
                {
                    Object.keys(choices).map((key, index) => {
                        return(
                                <li key={index}>
                                    <button 
                                        className={`btn-choices ${userAnswer === key ? "selected" : undefined}`} 
                                        onClick={userChoiceHandler} 
                                        value={key}>
                                        {choices[key]}
                                    </button>
                                </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default AnswerChoices;
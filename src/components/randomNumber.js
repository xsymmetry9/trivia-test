export const randomNumber =(questions, questionList) =>{

    if(questions.length === 0)
    {
        return 0
    }
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * questions.length);
    } while (questionList.includes(questions[randomNumber]).id)

    return randomNumber;
}

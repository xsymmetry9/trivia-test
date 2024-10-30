export async function loadTriviaQuestions(){
    const data = await fetch("https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json", {mode: "cors"})
    .then((response) => response.json())

    return data;
}
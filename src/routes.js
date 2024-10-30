import App from "./App";
import {loadTriviaQuestions} from "./loader";
import Questions from "./pages/Questions";
import Game from "./pages/Game";

const routes = [
    {
        path: "/",
        element: <App/>,
        loader: loadTriviaQuestions,
        children:[
           { index: true, element: <Game />},
           {
                path: "/questions",
                element: <Questions />
           }

        ]

    }
]

export default routes;
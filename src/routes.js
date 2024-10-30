import App from "./App";
import {loadTriviaQuestions} from "./loader";

const routes = [
    {
        path: "/",
        element: <App/>,
        loader: loadTriviaQuestions,

    }
]

export default routes;
import "./styles/main.scss";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import React, {createContext} from "react";
import { useLoaderData } from "react-router-dom";

export const AppContext = createContext({
  questions: []
});

function App() {
  const questions = useLoaderData();
  return (
    <AppContext.Provider value={{questions}}>
      <div className="root-start">
        <Header />
          <h1>This is a test.</h1>
        <Footer/>
      </div>
    </AppContext.Provider>

  );
}

export default App;

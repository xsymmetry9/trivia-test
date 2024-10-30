import React from "react";

const Header = () =>{
    return(
        <>
            <header>
                <div className="header-root">
                    <h1 className="title-logo">Chingu Trivia</h1>
                    <div id="nav-bar" className="nav-bar-root">
                        <ul className= "nav-bar-container">
                            <li className="nav-list"><a href="/">Home</a></li>
                            <li className="nav-list"><a href="/questions">Question</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
import React from 'react';

const Footer = () =>{
    const currentYear = new Date().getFullYear();

    return(
        <>
            <footer>
                <div className="footer-root">
                    <p>© {currentYear} Your Company. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;
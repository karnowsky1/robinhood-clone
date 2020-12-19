import React from 'react'
import Logo from './robinhood.svg'

function Header() {
    return (
        <div className="header__wrapper">
            {/* logo */}
            <div className="header__logo"> 
                <img src={Logo} width={25}/>
            </div>
            {/* Searchbar */}
            <div className="header__search">
              <div className="header__searchcontainer">
                
              </div>
            </div>
            {/* menu items */}
        </div>
    )
}

export default Header

import React, { Component } from 'react';
import  { Button } from './Button';
import  Menuitems  from "./Menuitems"
import './Navbar.css'



class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render() {
        return (
        <div> <nav className="NavbarItems">
                <h1 className="navbar-logo">ปันใจ <i class="fab fa-gratipay"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {Menuitems.map((item, index) => {
                        return (
                            <li>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}


                </ul>
                <Button>สมัครสมาชิก</Button>
            </nav>
            </div>
        )
    }
}
export default Navbar
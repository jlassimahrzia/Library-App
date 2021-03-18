import React from 'react'
import { BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import SignUp from '../components/signup'
import Login from '../components/login'
import '../styles/login.css'
function Routes() {
    return (
        <Router>
            <div className="App">
                {
                    /* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}>LIBRARY.io</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </nav>
                    */
                }
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route path="/sign-in" component={Login} />
                            <Route path="/sign-up" component={SignUp} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Routes ;
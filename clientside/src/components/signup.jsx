import React, { Fragment , useState} from "react";
import axios from 'axios'
function SignUp(){
    const [state, setState] = useState({
        name: "",
        email : "",
        password : "",
        type : 2
    })
 
    const handleChange = ({target}) => {
        setState({ ...state, [target.name]: target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/sanctum/csrf-cookie").then(response => {
            axios.post("http://localhost:8000/register",state ).
            then(res =>{
                console.log(res);
                console.log("success")
            })
            .catch(error => {
                console.log(error);
                console.log("fail")
            });
        });
    }

    return (
            <Fragment>
                <form onSubmit={onSubmit}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Name" 
                        name="name" value={state.name} onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" 
                        name="email" value={state.email} onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" 
                        name="password" value={state.password} onChange={handleChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="/sign-in">sign in?</a>
                    </p>
                </form>
            </Fragment>
    )
}

export default SignUp;
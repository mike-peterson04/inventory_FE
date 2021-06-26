import React from 'react';
import useCustomForm from '../CustomHooks/useCustomForm'
// import './loginForm.css';


const LoginForm = (props) => {
    const Submittal = () => {
        const userLogin = {
            username: inputs.userName,
            password: inputs.password,
        }
        console.log("Welcome Back!", userLogin); 
        props.loginUser(userLogin);
    }

    const {inputs, handleChange, handleSubmit} = useCustomForm(Submittal);

    return (
        <div className="form">
            <h4>Login</h4>
            <form onSubmit = {handleSubmit} >
                <div className="form-group d-flex flex-column">
                    <label htmlFor="userName">Username: </label>
                    <input className="form-rounded form-control" type="text" name="userName" onChange={handleChange} value={inputs.userName} spellCheck="false"/>

                    <label htmlFor="password">Password: </label>
                    <input className="form-rounded form-control" type="text" name="password" onChange={handleChange} value={inputs.password} spellCheck="false"/>

                    <br/>
                    <button className="btn btn-success" type="submit">Login!</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;
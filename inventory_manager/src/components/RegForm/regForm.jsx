import React from 'react';
import useCustomForm from '../CustomHooks/useCustomForm';
// import './regForm.css';

const RegForm = (props) => {
    
    const Submittal = () => {
        const userReg = {
            FirstName: inputs.firstName,
            LastName: inputs.lastName,
            UserName: inputs.userName,
            Password: inputs.password,
            Email: inputs.email,
            PhoneNumber: inputs.phoneNumber
        }
        console.log("registered", userReg); 
        props.registerUser(userReg);
    }

    const {inputs, handleChange, handleSubmit} = useCustomForm(Submittal);

    return (
        <div className="form">
            <h4>Sign Up</h4>
            <form onSubmit = {handleSubmit} >
                <div className="form-group d-flex flex-column">
                    <label htmlFor="firstName">First Name: </label>
                    <input className="form-rounded form-control" type="text" name="firstName" onChange={handleChange} value={inputs.firstName} spellCheck="false"/>

                    <label htmlFor="lastName">Last Name: </label>
                    <input className="form-rounded form-control" type="text" name="lastName" onChange={handleChange} value={inputs.lastName} spellCheck="false"/>

                    <label htmlFor="userName">Username: </label>
                    <input className="form-rounded form-control" type="text" name="userName" onChange={handleChange} value={inputs.userName} spellCheck="false"/>

                    <label htmlFor="password">Password: </label>
                    <input className="form-rounded form-control" type="text" name="password" onChange={handleChange} value={inputs.password} spellCheck="false"/>

                    <label htmlFor="email">Email: </label>
                    <input className="form-rounded form-control" type="text" name="email" onChange={handleChange} value={inputs.email} spellCheck="false"/>

                    <label htmlFor="phoneNumber">Phone Number: </label>
                    <input className="form-rounded form-control" type="text" name="phoneNumber" onChange={handleChange} value={inputs.phoneNumber} spellCheck="false"/>
                    <br/>
                    <button className="btn btn-success" type="submit">Sign Up!</button>
                </div>
            </form>
        </div>
    )
}

export default RegForm;
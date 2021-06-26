import React, {Component} from 'react';
import LoginForm from '../LoginForm/loginForm';
import RegForm from '../RegForm/regForm';
// import './LogWrap.css';
// import './fontAwesome/css/all.min.css';

class LogWrap extends Component{
    constructor(props){
        super(props);
        this.state = {
            render:"decide"
        }
    }
    registerStart = () =>{
        this.setState({render:"register"})
    }
    loginStart = () =>{
        this.setState({render:"login"})
    }
    
    render(){
        if(this.state.render === "decide"){
            return (
                <div className="login-reg-container">
                    <div className="login-reg-text">
                        <h1>please sign in or register</h1>
                    </div>
                    <div className="login-reg-nav">
                        <button id="register" onClick={this.registerStart}>Register</button> 
                        <button id="login" onClick={this.loginStart}>Login</button>
                    </div>
                </div>
            );
        }
        else if(this.state.render === "register"){
            return (
                <div>
                            <RegForm registerUser={(regUser) => this.props.registerUser(regUser)}/>
        
                </div>
            );
        }
        else{
            return (
                <div>
                            
                            <LoginForm loginUser={(loginUser) => this.props.loginUser(loginUser)}/>
        
                </div>
            );
        }
    }
}
export default LogWrap;

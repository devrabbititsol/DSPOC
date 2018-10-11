import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../../constants';
import loginService from '../../../services/loginService';
import _ from 'lodash';
import passwordHash from 'password-hash';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            userName:"",
            passWord:"",
            remember:false,
            errorStatus:false
        }
     this.onSubmitHandler = this.onSubmitHandler.bind(this);
     this.inputHandler = this.inputHandler.bind(this);
    }
    async componentWillMount() {
        
    }
    async onSubmitHandler(event){
        event.persist();
        let errorVal = 0;
        await this.setState({errorStatus:false});
        if(this.state.userName.trim() == ''){
            $('.userName').addClass('error');
            errorVal++;
        } else {
            $('.userName').removeClass('error');
        }
        if(this.state.passWord.trim() == ''){
            $('.passWord').addClass('error');
            errorVal++;
        } else {
            $('.passWord').removeClass('error');
        }
        if(errorVal > 0){
            this.setState({errorStatus:true});
        }else{
            //let LoginDetails = await loginService.login({ 'userName': this.state.userName, 'Pwd': this.state.passWord });
            //console.log(LoginDetails.recordset.length, "==================sdfsdf");
            let LoginDetails = Object.assign({});
            if(this.state.userName.trim() == Constants.USER_LOGIN.userName && this.state.passWord.trim() == Constants.USER_LOGIN.passWord){
                LoginDetails.userName = Constants.USER_LOGIN.userName;
                LoginDetails.passWord = Constants.USER_LOGIN.passWord;
                LoginDetails.type = Constants.USER_LOGIN.type;
                LoginDetails.name = Constants.USER_LOGIN.FirstName;
                
            } else if(this.state.userName.trim() == Constants.CLIENT_LOGIN.userName && this.state.passWord.trim() == Constants.CLIENT_LOGIN.passWord){
                LoginDetails.userName = Constants.CLIENT_LOGIN.userName;
                LoginDetails.passWord = Constants.CLIENT_LOGIN.passWord;
                LoginDetails.type = Constants.CLIENT_LOGIN.type;
                LoginDetails.name = Constants.CLIENT_LOGIN.FirstName;

            }
            if(Object.keys(LoginDetails).length > 0) {
                this.setState({errorStatus:0});
                await localStorage.setItem("type", LoginDetails.type);
                await localStorage.setItem("LoginDetails", JSON.stringify(LoginDetails));
                if(LoginDetails.type == 'guest'){
                    window.location.href = '/home'
                } else {
                    window.location.href = '/send-invitation'
                   
                }
                
            } else {
                this.setState({errorStatus:true});
            }
            
        }
    }
    async inputHandler(inputName, event){
        event.persist();
        await this.setState({errorStatus:false});
        $('.error').removeClass('error');
        let inputVal = event.target.value;
        if(inputName === 'userName'){
           this.setState({userName:inputVal});
        }
        if(inputName === 'passWord'){
            this.setState({passWord:inputVal});
         }
         if(inputName === 'remember'){
            let rememberVal = event.target.checked 
            this.setState({remember:rememberVal});
         }
    }

    render() {
        return (
            <div className="login-container d-flex justify-content-center align-items-center">
                <div className="login-form col-md-4">
                    <div className="text-center">
                        <img src="images/logo_login.png" alt="" />
                        <p>Login to Rental Assistance</p>
                    </div>
                    <div className="ds-login">
                       {this.state.errorStatus == true ? <span className="text-danger emsg">{Constants.DS_CONSTANTS.LOGIN_ERROR_MSG}</span> : ""}
                        <div className="form-group">
                            <i className="mdi mdi-account-outline"></i>
                            <input type="email" className="userName form-control" id="userName" name="userName" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.inputHandler.bind(this, 'userName')} />
                        </div>
                        <div className="form-group">
                            <i className="mdi mdi-lock-outline"></i>
                            <input type="password" className="passWord form-control" id="Password" name="passWord" placeholder="passWord" onChange={this.inputHandler.bind(this, 'passWord')} />
                        </div>
                        <div className="d-flex form-options">
                            <div className="form-check col-md-6">
                                <label className="checkbox_div">Remeber Me
				                        <input type="checkbox" onChange={this.inputHandler.bind(this, 'remember')} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <div className="form-check col-md-6 text-right">
                                <a href="#" className="color-red">Forgot Password?</a>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="button" className="btn sm-red-btn font-weight-bold" onClick={this.onSubmitHandler.bind(this)}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

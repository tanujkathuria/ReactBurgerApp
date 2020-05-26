import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component{

    state = {
        controls: {
            email: {
                elementType : 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation:{
                    required:true
                },
                valid: true
            },
            password: {
                elementType : 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required:true
                },
                valid: true
            }
        },
        isSignUp : true
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid =  value.trim() != '' && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        console.log(inputIdentifier);
        const updatedForm ={...this.state.controls};
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement.valid);
        updatedForm[inputIdentifier] = updatedFormElement;
        this.setState({controls: updatedForm});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);

    }

    switchAuthModeHandler = () => {
        this.setState({
            ...this.state,
            isSignUp: !this.state.isSignUp
        })
    }

    render() {
        const formElementsArray = [];

        for(let key in this.state.controls){
            formElementsArray.push({
                id : key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(
            formElement => (
                <Input elementType={ formElement.config.elementType}
                       elementConfig = {formElement.config.elementConfig}
                       value={formElement.config.value}
                       invalid = {!(formElement.config.valid)}
                       changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
            )
        )

        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage= null;

        if(this.props.error){
            errorMessage = (<p>
                {this.props.error.message}
            </p>)
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect= <Redirect to="/"></Redirect>
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger"
                clicked = {this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {

    return {
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }


}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);



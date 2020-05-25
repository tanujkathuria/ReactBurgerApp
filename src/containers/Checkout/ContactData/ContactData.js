import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'

class ContactData extends Component{

    state = {
        orderForm: {
                name: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid: false
                },
                email:{
                    elementType : 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'email address'
                    },
                    value: '',
                    validation:{
                        required:true

                    },
                    valid: false
                },
                street:{
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'street'
                    },
                    value: '',
                    validation:{
                        required:true

                    },
                    valid: false
                },
                postalCode:{
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'postal code'
                    },
                    value: '',
                    validation:{
                        required:true

                    },
                    valid: false
                },
                country:{
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'country'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid: false
                },
                deliveryMethod: {
                    elementType : 'select',
                    elementConfig: {
                        options: [
                                {value:'fastest', displayValue: 'fastest'},
                                {value:'cheapest', displayValue: 'cheapest'}
                            ]
                    },
                    value: 'fastest',
                    validation:{
                        required:true
                    },
                    valid: false
                }
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid =  value.trim() != '' && isValid;
        }
        return isValid;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        const formData = {};

        for(let formElement in this.state.orderForm){
            formData[formElement] = this.state.orderForm[formElement].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price:  this.props.totalPrice,
            orderData : formData
        }

        this.props.onOrderBurger(order);
           alert('continue shopping');
    }


    inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        console.log(inputIdentifier);
        const updatedForm ={...this.state.orderForm};
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement.valid);
        updatedForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedForm});
    }

    render() {

        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id : key,
                config: this.state.orderForm[key]
            })
        }

        let form =(
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input elementType={ formElement.config.elementType}
                           elementConfig = {formElement.config.elementConfig}
                           value={formElement.config.value}
                           invalid = {!(formElement.config.valid)}
                            changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" >ORDER HERE</Button>
            </form>);
        if(this.props.loading){
            form = <Spinner></Spinner>
        }
        return (<div className={classes.ContactData}>
             <h4>Enter your contact data </h4>
                {form}
        </div>);

    }

}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onOrderBurger : (orderData) => dispatch(actions.purchaseBurgerStart(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
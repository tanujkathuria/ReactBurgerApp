import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{

    state={
        name: '',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading:true})
        const order = {
            ingredients: this.props.ingredients,
            price:  this.props.totalPrice,
            customer : {
                name: 'Max',
                address: {
                    street: 'test street',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email:'test@test.com'
            },
            deliveryMethod : 'fastest'
        }
           alert('continue shopping');
           axios.post('/orders.json',order).then(
             response => {
                 console.log(response);
                 this.setState({loading: false});
                 this.props.history.push('/')
             })
               .catch(error => {
                   console.log(error);
                   this.setState({loading: false});
               })

    }


    render() {
        let form =(
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="your mail"/>
                <input className={classes.Input} type="text" name="street" placeholder="street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="postal code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER HERE</Button>
            </form>);
        if(this.state.loading){
            form = <Spinner></Spinner>
        }
        return (<div className={classes.ContactData}>
             <h4>Enter your contact data </h4>
                {form}
        </div>);

    }

}

export default ContactData;
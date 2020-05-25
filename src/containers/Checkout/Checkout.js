import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';

class Checkout extends Component{


    componentWillMount() {
        this.props.onInitPurchase();

    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render() {

        let summary = <Redirect to="/"></Redirect>;
        const purchasedRedirect= this.props.purchased ? <Redirect to="/"></Redirect>: null;
        if(this.props.ings){
            summary =  (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings} checkoutCancelled = {this.checkoutCancelledHandler}
                                     checkoutContinued = {this.checkoutContinuedHandler} />
                    <Route path={this.props.match.url+"/contact-data"}
                           render ={(props) => (<ContactData ingredients = {this.props.ings} totalPrice ={this.props.price} {...props}></ContactData>)}
                    />
                </div>
            )
        }
        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased:  state.order.purchased
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        onInitPurchase  : () => dispatch(actions.purchaseInit())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
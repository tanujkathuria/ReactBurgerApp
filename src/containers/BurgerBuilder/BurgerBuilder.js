import React,{Component} from 'react';
import Aux from '../../hoc/Aux';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from '../../axios-orders';



class BurgerBuilder extends Component{

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    constructor(props) {
        super(props);
        this.state = {
            purchasing:false,
            loading:false
        }
    }


    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]})
            .reduce((sum,el) => {
                return  sum = sum + el;
            },0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true})
        }
        else{
            this.props.history.push('/auth')
        }

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        /*
        this.setState({loading: true});

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push(encodeURIComponent('price')+'='+encodeURIComponent(this.props.totalPrice));
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname : '/checkout',
            search: '?'+ queryString
        })*/

    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = <OrderSummary ingredients  = {this.props.ings}
                                         purchaseCanceled = {this.purchaseCancelHandler}
                                         purchaseContinued = {this.purchaseContinueHandler}
                                         price = {this.props.totalPrice.toFixed(2)}/>
        if(this.state.loading)
        {
            orderSummary =<Spinner/>
        }
        const burger = this.props.ings ? ( <Aux>
            <Modal show ={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            <Burger ingredients  = {this.props.ings} />
            <BuildControls
                ingredientAdded  = {this.props.onIngredientAdded}
                ingredientRemoved = {this.props.onIngredientRemoved}
                disabledInfo = {disabledInfo}
                price = {this.props.totalPrice}
                purchasable  = {this.updatePurchaseState(this.props.ings)}
                ordered = {this.purchaseHandler}
                isAuth={ this.props.isAuthenticated}>
            </BuildControls>
        </Aux> ) : <Spinner/>;
        return burger;
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded : (igName) => dispatch(actions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
        onInitIngredients : () => dispatch(actions.initIngredients())
    }
}

const mapStateToProps = (state) => {
    return {
        ings : state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
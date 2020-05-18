import React,{Component} from 'react';
import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from '../../axios-orders';

const INGREDIENT_PRICES  ={
    salad : 0.5,
    cheese : 0.4,
    meat: 1.3,
    bacon :0.7
}

class BurgerBuilder extends Component{

    componentDidMount() {
        console.log(this.props);
    }

    constructor(props) {
        super(props);
        this.state = {
            ingredients : {
                salad: 0,
                bacon:0,
                cheese:0,
                meat: 0
            },
            totalPrice : 4,
            purchasable:false,
            purchasing:false,
            loading:false
        }
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount  = oldCount+1;
        const updateIngredients  = {...this.state.ingredients,
        };
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice =  this.state.totalPrice;
        const newPrice =  oldPrice + priceAddition;
        this.setState({totalPrice : newPrice,ingredients : updateIngredients});
        this.updatePurchaseState(updateIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount  = oldCount-1;
        const updateIngredients  = {...this.state.ingredients,
        };
        updateIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice =  this.state.totalPrice;
        const newPrice =  oldPrice - priceDeduction;
        this.setState({totalPrice : newPrice,ingredients : updateIngredients});
        this.updatePurchaseState(updateIngredients);

    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]})
            .reduce((sum,el) => {
                return  sum = sum + el;
            },0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push(encodeURIComponent('price')+'='+encodeURIComponent(this.state.totalPrice));
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname : '/checkout',
            search: '?'+ queryString
        })

    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = <OrderSummary ingredients  = {this.state.ingredients}
                                         purchaseCanceled = {this.purchaseCancelHandler}
                                         purchaseContinued = {this.purchaseContinueHandler}
                                         price = {this.state.totalPrice.toFixed(2)}/>
        if(this.state.loading)
        {
            orderSummary =<Spinner/>
        }
        return (
            <Aux>
                <Modal show ={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients  = {this.state.ingredients} />
                <BuildControls
                    ingredientAdded  = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabledInfo = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable  = {this.state.purchasable}
                    ordered = {this.purchaseHandler}>
                </BuildControls>
            </Aux>);
    }

}

export default  withErrorHandler(BurgerBuilder,axios);
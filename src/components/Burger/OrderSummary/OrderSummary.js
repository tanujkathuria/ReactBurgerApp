import React, {Component} from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('component did update ');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return <li key={igkey}><span style={{
                    textTransform:  'capitalize'
                }}>{igkey}</span>:{this.props.ingredients[igkey]}</li>
            })

        return (<Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price</strong>:{this.props.price} </p>
            <p>Continue to Checkout</p>
            <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>)
    }


}

export  default OrderSummary;
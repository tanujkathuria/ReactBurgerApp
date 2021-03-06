import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) => {
    return {

        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {

        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
};

export const purchaseBurgerStart = (orderData,token) => {

    return dispatch => {
        dispatch(purchaseBurger());
        axios.post('/orders.json?auth='+token,orderData).then(
            response => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseBurger = () => {
    return {
        type: actionTypes.PURCHASE_BURGER
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }

}
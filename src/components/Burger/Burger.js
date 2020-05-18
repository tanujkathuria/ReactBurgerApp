import React from 'react';
import classes from './Burger.module.css';
import {withRouter} from 'react-router-dom'

import BurgerIngredient  from "./BurgerIngredients/BurgerIngredient";

const burger = (props) => {

    console.log(props);
    let transformedIngredients  = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
                .map((_,i) => {
                    return <BurgerIngredient key ={igKey+i} type={igKey}></BurgerIngredient>
                });
        }).reduce((arr, ele) =>{
            return arr.concat(ele);
        },[]);


    if(transformedIngredients.length === 0){
        transformedIngredients = <div>Please start adding ingredients</div>;
    }
    console.log(transformedIngredients);
    return (

      <div className={classes.Burger}>
         <BurgerIngredient type='bread-top' />
          {transformedIngredients}
          <BurgerIngredient type='bread-bottom' />
      </div>
    );
}

export default withRouter(burger);
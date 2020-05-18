import React from 'react';
import NavigationItem from '../NavigationItem/NavigItem';
import classes from './NavigationItems.module.css';


const navigationItems = () => {
return (
    <div className={classes.NavigationItems}>
        <NavigationItem link="/"  >Burger Builder </NavigationItem>
        <NavigationItem link="/orders" >Checkout </NavigationItem>
    </div>
    )
}

export default navigationItems;
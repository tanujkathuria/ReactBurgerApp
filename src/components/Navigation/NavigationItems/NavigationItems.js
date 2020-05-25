import React from 'react';
import NavigationItem from '../NavigationItem/NavigItem';
import classes from './NavigationItems.module.css';


const navigationItems = () => {
return (
    <div className={classes.NavigationItems}>
        <NavigationItem link="/"  >Burger </NavigationItem>
        <NavigationItem link="/orders" >Orders </NavigationItem>
    </div>
    )
}

export default navigationItems;
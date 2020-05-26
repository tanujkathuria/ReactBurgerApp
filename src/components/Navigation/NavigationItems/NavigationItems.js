import React,{Component} from 'react';
import NavigationItem from '../NavigationItem/NavigItem';
import classes from './NavigationItems.module.css';
import {connect} from 'react-redux';


class NavigationItems extends Component{

    render() {
        return (
            <div className={classes.NavigationItems}>
                <NavigationItem link="/"  >Burger </NavigationItem>
                { this.props.isAuthenticated ? <NavigationItem link="/orders" >Orders </NavigationItem>  : null}
                {this.props.isAuthenticated ? <NavigationItem link="/logout" >Logout </NavigationItem>
                    : <NavigationItem link="/auth" >Login </NavigationItem>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null
    }
}


export default connect(mapStateToProps)(NavigationItems);
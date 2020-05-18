import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (nextProps.show !==  this.props.show || nextProps.children !== this.props.children);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('modal will update');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    style={{
                        transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1':'0'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div></Aux>)
    }
}

export default Modal;
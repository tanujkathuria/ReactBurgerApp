import React,{Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux'

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {

        state = {
            error: null
        }

        errorConfirmedHandler = () => {
            this.setState({error :null});
        }

        componentDidMount() {

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error :null})
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({error : error})
            })
        }

        componentWillUnmount() {
            console.log('component will unmount ', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render()
        {
            return (
                <Aux>
                    <Modal show={this.state.error}
                           modalClosed = {this.errorConfirmedHandler}>
                        {this.state.error  ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>)
        }
    }
}


export default withErrorHandler;
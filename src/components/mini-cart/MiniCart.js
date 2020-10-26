import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './MiniCart.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Media from 'react-bootstrap/Media';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import CartApi from '../../store/CartApi';
import { Link } from 'react-router-dom';
import Currency from 'react-currency-formatter';

class AddProductModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    handleClose(){
        CartApi.clearAddedLines();
    }

    componentDidUpdate(){
        if(this.state.show === false && this.props.lines && this.props.lines.length > 0)
            this.setState({show: true});
        else if(this.state.show === true && (!this.props.lines || this.props.lines.length < 1))
            this.setState({show : false});
    }

    render(){
        const { lines } = this.props;
        if(lines && lines.length > 0){
            return (
                <>
                    <Modal show={this.state.show} onHide={this.handleClose} className="add-product-modal">
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <Link to="/cart" className="text-decoration-none">
                                <Button variant="primary" size="lg" block onClick={this.handleClose}>
                                    Continue to cart
                                </Button>
                            </Link>
                            <h4 className="font-weight-bold my-5">
                                <FontAwesomeIcon icon={faCheckCircle} size="lg" className="mr-3"/>
                                {lines.length} item(s) added to cart
                            </h4>
                            <ul className="list-unstyled">
                                {
                                    lines.map((line, index) => (
                                        <Media as="li" key={index} className="align-items-center">
                                            <img width={52} height={65} className="mr-3" src="http://via.placeholder.com/320x260" alt=""/>
                                            <Media.Body>
                                                <h5 className="font-weight-bold">{line.Product.Name}</h5>
                                                <div>
                                                    <div>Quantity: {line.Quantity}</div>
                                                    <div><Currency quantity={line.PriceListItem.ListPrice} currency="USD"/> each</div>
                                                </div>
                                            </Media.Body>
                                        </Media>
                                    ))
                                }
                            </ul>
                        </Modal.Body>
                    </Modal>
                </>
            );
        }else
            return <Fragment></Fragment>
    }
}

class MiniCart extends React.Component{


    render(){
        const { count, newLines } = this.props;
            return <Link to={`/cart`} className="mini-cart text-body text-decoration-none">
                <AddProductModal lines={newLines}/>
                <span>Cart {count > 0 ? '(' + count + ')' : ''}</span>
                <span className="cart-icon"></span>
            </Link>
    }
}


const mapStateToProps = state => {
    return {
        error : state.cart.error,
        loading: state.cart.isFetching,
        count: state.cart.lines.length,
        newLines: state.cart.addedLines
    }   
};

export default connect(
    mapStateToProps
)(MiniCart);
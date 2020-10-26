import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { OrderSummary } from '../components/OrderSummary';
import './Review.scss';
import Currency from 'react-currency-formatter';
import { ApiService } from '../../shared/Api';
import { Link } from 'react-router-dom';
import CartApi from '../../store/CartApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class RowPrice extends React.Component{

    render(){
        const { line } = this.props;
        if(line.IncentiveAdjustmentAmount < 0){
            return <div className="d-flex flex-column align-items-end">
                <strike><Currency quantity={line.BaseExtendedPrice} currency="USD"/></strike>
                <span><Currency quantity={line.IncentiveAdjustmentAmount} currency="USD"/></span>
                <strong><Currency quantity={line.NetPrice} currency="USD"/></strong>
            </div>
        }else{
            return <strong><Currency quantity={line.NetPrice} currency="USD"/></strong>
        }
    }
}

class ReviewLine extends React.Component{
    render(){
        const { line } = this.props;
        return <div className="border-bottom border-gray py-4 d-flex justify-content-between line-item-row">
            <div className="pr-5">
                <h5>{line.Product.Name}</h5>
                <p>
                    <strong className="mr-2">Format:</strong> {line.Product.Format}
                </p>
                <p>
                    <strong className="mr-2">Pricing Terms:</strong> One Time Purchase
                    <i className="d-block">Purchase the current version only, no updates will be sent</i>
                </p>
                <p>
                    <strong className="mr-2">Quantity:</strong>{line.Quantity}
                </p>
            </div>
            <div>
                <RowPrice line={line}></RowPrice>
            </div>
        </div>
    }
}

class TotalLine extends React.Component{
    render(){
        const { total } = this.props;
        console.log(total);
        if(total){
            return <div className="summary-group">
                <div className="border-bottom py-4">
                    <div className="d-flex justify-content-between">
                        <span>Subtotal</span>
                        <span><Currency quantity={total.Subtotal[0].NetPrice} currency="USD"/></span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Tax</span>
                        <span>TBD</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Shipping</span>
                        <span>TBD</span>
                    </div>
                </div>
                <div className="py-4">
                    <h4 className="d-flex justify-content-between font-weight-bold">
                        <span>Total Due Today</span>
                        <span><Currency quantity={total["Grand Total"][0].NetPrice} currency="USD"/></span>
                    </h4>
                    <div className="d-flex justify-content-between">
                        <span>Monthly Total</span>
                        <span>$0.00</span>
                    </div>
                </div>
            </div>
        }else
            return null;
    }
}

class Review extends React.Component{
    api = new ApiService();
    state = {
        show: false,
        order : {}
    }
    async placeOrder(){
        const cartId = localStorage.getItem('cartId');
        this.setState({
            loading: true
        });
        // Stubbed in required fields
        const order = await this.api.post(`/carts/${cartId}/checkout`, {
            Contact: {
                Email: 'chmoyle@conga.com',
                LastName: 'Moyle',
                FirstName: 'Christopher',
                MailingStreet: '1400 Fashion Island Blvd #100',
                MailingCity: 'San Mateo',
                MailingPostalCode: '94404'
            }
        });

        this.setState({
            show: true,
            order: order,
            loading: false
        })
    }

    handleClose(){
        localStorage.removeItem('cartId');
        CartApi.refresh();
        this.setState({show: false});
    }

    render(){
        const { cart } = this.props;
        const { show, order, loading } = this.state;
        if(cart)
            return <div className="review">
                <h1 className="my-5 font-weight-normal">Review Order</h1>
                <Row>
                    <Col xs={7}>
                        { 
                            cart.lines.map((line) => 
                                <ReviewLine line={line} key={line.Id}></ReviewLine>
                            )
                        }
                        <TotalLine total={cart.total}></TotalLine>

                        <div className="mt-4">
                            <h3>Terms and Conditions</h3>
                            <p>In order to complete your checkout, you must agree to the terms and conditions.If you'd like to discuss this with one of our representatives, please call West Sales at 1-800-387-5164</p>
                            <Form.Check 
                                custom
                                type="checkbox"
                                id="terms"
                                className="my-3"
                                label="I agree Terms and Conditions"
                            />
                            {
                                (loading)
                                ? <FontAwesomeIcon icon={faSpinner} spin size="lg" className="spinner"/>
                                : <Button variant="primary" size="lg" className="mt-3" onClick={this.placeOrder.bind(this)}>Place Order</Button>
                            }
                        </div>
                    </Col>
                    <Col xs={{span: 4, offset: 1}}>
                        <OrderSummary cart={cart.cart}></OrderSummary>
                    </Col>
                </Row>

                <Modal show={show} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Placed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Your order <b>{order.Name}</b> has been placed!
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={"/products"}>
                            <Button variant="primary" onClick={this.handleClose.bind(this)}>
                                Continue
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
            </div>
        else
            return <div>Loading...</div>
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        total: state.total
    }   
};

export default connect(
    mapStateToProps
)(Review);
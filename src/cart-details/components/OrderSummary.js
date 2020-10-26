import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Currency from 'react-currency-formatter';
import { Link } from 'react-router-dom';


class CheckoutButton extends React.Component{

    render(){
        const { loading } = this.props;

        if(loading)
            return <div className="d-flex justify-content-center">
                <FontAwesomeIcon icon={faSpinner} spin size="lg" className="spinner"/>
            </div>
        else
            return <Link to={`/checkout`} className="text-decoration-none">
                <Button type="submit" className="btn-block" variant="primary" size="lg">
                    Continue to Checkout
                    <FontAwesomeIcon icon={faLock} className="ml-3" size="sm"/>
                </Button>
            </Link>
    }

}

export default class OrderSummary extends React.Component{

    render(){
        const { total, checkoutHidden, loading } = this.props;
        return <Card className="py-3">
            <Card.Body>
                <h5>Order Summary</h5>
                <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span><Currency quantity={(total && total.Subtotal) ? total.Subtotal[0].NetPrice : 0} currency="USD"/></span>
                </div>

                <div className="d-flex justify-content-between">
                    <span>Shipping</span>
                    <span>TBD</span>
                </div>

                <hr/>

                <div className="d-flex justify-content-between font-weight-bold">
                    <span>Est. total due today</span>
                    <h5 className="m-0"><Currency quantity={(total && total.Total) ? total.Total[0].NetPrice : 0} currency="USD"/></h5>
                </div>

                <div className="d-flex justify-content-between font-weight-bold">
                    <span>Est. total due monthly</span>
                    <h5 className="m-0">$0.00</h5>
                </div>
                <small className="my-3 d-block">Sales tax for your order will reflect applicable state and local taxes and will be finalized upon shipment.</small>

                {
                    !checkoutHidden &&
                    <CheckoutButton loading={loading}/>
                }
                
            </Card.Body>
        </Card>
    }
}
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Currency from 'react-currency-formatter';

export default class OrderSummary extends React.Component{
    
    constructor(props){
        super(props);
        console.log(this.props);
    }

    render(){
        const { total } = this.props;
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
                    <span><Currency quantity={(total && total.Total) ? total.Total[0].NetPrice : 0} currency="USD"/></span>
                </div>

                <div className="d-flex justify-content-between font-weight-bold">
                    <span>Est. total due monthly</span>
                    <span>$0.00</span>
                </div>
                <small>Sales tax for your order will reflect applicable state and local taxes and will be finalized upon shipment.</small>

                <Button type="submit" className="btn-block" variant="primary" size="lg">
                    Continue to Checkout
                    <FontAwesomeIcon icon={faLock} className="ml-3" size="sm"/>
                </Button>
            </Card.Body>
        </Card>
    }
}
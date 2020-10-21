import React from 'react';
import { Link } from 'react-router-dom';

export class OrderSummary extends React.Component{

    render(){
        const { cart } = this.props;
        console.log(cart);
        if(!cart)
            return <div></div>
        else
            return <div className="border">
                <div className="d-flex justify-content-end pr-2 pt-2">
                    <Link to={'/checkout'}>Edit</Link>
                </div>
                
                <div className="px-4 pb-4">
                    <h4 className="font-weight-bold">Billing/Shipping Address</h4>
                    <p>
                        {cart.ShipToAccount.FirstName} {cart.ShipToAccount.LastName}
                    </p>
                    <p>
                        {cart.ShipToAccount.BillingStreet}
                    </p>
                    <p>
                        {cart.ShipToAccount.BillingCity} {cart.ShipToAccount.BillingState} {cart.ShipToAccount.BillingPostalCode}
                        <br/>
                        {cart.ShipToAccount.BillingCountry}
                    </p>
                    <h4 className="mt-5 font-weight-bold">Shipping Method</h4>
                    <p>International Expedited Rate Shipping</p>

                    <h4 className="mt-5 font-weight-bold">Payment Method</h4>
                    <p>Pay by Invoice</p>
                </div>
            </div>
    }
}
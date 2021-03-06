import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import CartApi from '../../store/CartApi';
import Currency from 'react-currency-formatter';
import { Link } from 'react-router-dom';


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

export default class CartItemRow extends React.Component{

    constructor(props){
        super(props);

        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    remove(){
        CartApi.removeFromCart(this.props.line.Id);
    }

    update(evt){
        CartApi.updateCartItem(this.props.line.Id, evt.target.value, this.props.line.PrimaryLineNumber, this.props.line.OptionId);
    }

    render(){
        const { line } = this.props;
        return <Row key={line.Id} className="border-bottom border-secondary py-3">
            <Col xs="7">
                <h5 className="text-info">
                    <Link to={`/products/${line.ProductId}`} className="text-info">{line.Product.Name}</Link>
                </h5>

                <p>
                    <strong>Publisher:</strong> {line.Product.Publisher_Description}
                </p>
                <p>
                    <strong>Format:</strong> {line.Product.Format}
                </p>
                <p>
                    <strong>Availability:</strong> In Stock
                </p>
                <p>
                    <strong>Pricing Terms:</strong> One Time Purchase
                </p>
                <p>
                    <strong>Price:</strong> <Currency quantity={line.BaseExtendedPrice} currency="USD"/>
                </p>

                <Button variant="link" className="px-0" onClick={this.remove}>Remove</Button>
            </Col>
            <Col xs="3">
                <Form.Control as="select" custom className="w-50" size="lg" onChange={this.update} value={line.Quantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </Form.Control>
            </Col>
            <Col xs="2" className="d-flex justify-content-end">
                {
                    <RowPrice line={line}></RowPrice>
                }
                
            </Col>
        </Row>
    }
}
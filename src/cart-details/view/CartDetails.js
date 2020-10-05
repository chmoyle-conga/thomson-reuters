import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import OrderSummary from '../components/OrderSummary';
import Promo from '../components/Promo';
import CartItemRow from '../components/CartItemRow';

class CartDetails extends React.Component{

    render(){
        const { lines, total } = this.props;
        if(lines && lines.length > 0){
            return <div>

            <Breadcrumb>
                <Breadcrumb.Item>Law Books</Breadcrumb.Item>
                <Breadcrumb.Item href="/#/products">
                    All Products
                </Breadcrumb.Item>
                
                <Breadcrumb.Item active>Cart</Breadcrumb.Item>
            </Breadcrumb>

            <h1 className="my-5">Cart</h1>

                <Row>
                    <Col xs="12" sm="8">
                        <Row className="border-bottom border-secondary">
                            <Col xs="7">
                                <h5 className="font-weight-bold">Product</h5>
                            </Col>
                            <Col xs="3">
                                <h5 className="font-weight-bold">Quantity</h5>
                            </Col>
                            <Col xs="2" className="d-flex justify-content-end">
                                <h5 className="font-weight-bold">Subtotal</h5>
                            </Col>
                        </Row>

                        {
                            lines.map((line, index) => (
                                <CartItemRow line={line} key={index}/>
                            ))
                        }
                    </Col>
                    <Col xs="12" sm="4" className="pl-5">
                        <Promo/>

                        <OrderSummary total={total}/>
                    </Col>
                </Row>
            </div>
        }else
            return <div>Loading...</div>
    }
}

const mapStateToProps = state => {
    return {
        lines: state.cart.lines,
        total: state.cart.total
    }   
};

export default connect(
    mapStateToProps
)(CartDetails);
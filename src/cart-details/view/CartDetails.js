import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Breadcrumb, Form, Card, Button } from 'react-bootstrap';

class CartDetails extends React.Component{

    render(){
        const { lines } = this.props;
        console.log(lines);
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
                            lines.map(line => (
                                <Row key={line.Id} className="border-bottom border-secondary py-3">
                                    <Col xs="7">
                                        <h5 className="text-info">{line.Product.Name}</h5>

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
                                            <strong>Price:</strong> $142.00
                                        </p>

                                    </Col>
                                    <Col xs="3">
                                        <Form.Control as="select" custom className="w-50" size="lg">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </Form.Control>
                                    </Col>
                                    <Col xs="2" className="d-flex justify-content-end">
                                        <span>$142.00</span>
                                    </Col>
                                </Row>
                            ))
                        }
                    </Col>
                    <Col xs="12" sm="4" className="pl-5">
                        <Card className="py-3">
                            <Card.Body>
                                <h5>Apply Promo Code</h5>
                                <div className="d-flex mb-2">
                                    <Form.Control
                                        className="mr-sm-2"
                                        id="inlineFormInputName2"
                                        placeholder="Promo Code"
                                        size="lg"
                                    />
                                    <Button type="submit" className="text-body" variant="outline-secondary" size="lg">
                                        Apply
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        }else
            return <div>Loading...</div>
    }
}

const mapStateToProps = state => {
    return {
        lines: state.cart.lines
    }   
};

export default connect(
    mapStateToProps
)(CartDetails);
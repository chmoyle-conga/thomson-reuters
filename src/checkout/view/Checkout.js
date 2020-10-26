import React, { useContext } from 'react';
import { Accordion, AccordionContext, Button, Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import OrderSummary from '../../cart-details/components/OrderSummary';
import './Checkout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { set } from 'lodash';
import store from '../../store/Store';

function ToggleRow({title, number}){
    const currentEventKey = useContext(AccordionContext);
    const active = Number(currentEventKey) === Number(number) - 1;
    return (
        <Row>
            <Col xs={2} className="d-flex align-items-center justify-content-center step-number-container">
                <span className="step-number rounded-circle">{number}</span>
            </Col>
            <Col xs={10} className="d-flex justify-content-between text-body py-5 border-top align-items-center">
                <h4>{title}</h4>
                <span>
                    {
                        (active) 
                        ? <FontAwesomeIcon icon={faChevronCircleDown} size="lg"/>
                        : <FontAwesomeIcon icon={faChevronCircleUp} size="lg"/>
                    }
                </span>
            </Col>
        </Row>
    )
}

class Checkout extends React.Component{
    state = {
        activeKey: "0",
        billingAddressSame: true,
        billingMethod: 'invoice',
        shippingMethod: 'free'
    }

    goToSection(key){
        console.log(this.state);
        this.setState({
            activeKey : key
        });
    }

    checkChange(evt){
        const target = evt.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    fieldChange(evt){
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        const cart = this.props.cart;
        set(cart, name, value);
        store.dispatch({
            type: 'SET_CART',
            payload: this.props.cart
        })
    }

    render(){
        const { total, cart } = this.props;
        const { activeKey, billingAddressSame, billingMethod, shippingMethod } = this.state;
        console.log(cart);
        if(!cart)
            return <div></div>
        else
            return <Row className="mt-5 checkout">
                <Col xs="12" sm="8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1 className="font-weight-normal m-0">Just a few more steps</h1>
                        <small className="text-danger">All fields are required unless otherwise noted</small>
                    </div>
                    <Accordion defaultActiveKey="0" activeKey={activeKey}>
                        <Accordion.Toggle as={Button} variant="link" className="btn-block p-0" eventKey="0" onClick={this.goToSection.bind(this, "0")}>
                            <ToggleRow title="Enter your information" number="1"/>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Row>
                                <Col className="step-number-container" xs={2}>&nbsp;</Col>
                                <Col xs={10}>
                                    <h5>Information</h5>
                                    <Form>
                                        <Form.Group controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" name="Account.FirstName" onChange={this.fieldChange.bind(this)} value={cart.Account.FirstName}/>
                                        </Form.Group>

                                        <Form.Group controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" name="Account.LastName" onChange={this.fieldChange.bind(this)} value={cart.Account.LastName}/>
                                        </Form.Group>

                                        <Form.Group controlId="email">
                                            <Form.Label>Business Email Address</Form.Label>
                                            <Form.Control type="email" name="Account.Email" onChange={this.fieldChange.bind(this)} value={cart.Account.Email}/>
                                        </Form.Group>
                                    </Form>

                                    <h5>Organization Type</h5>
                                    <Form>
                                        <Form.Group controlId="orgType">
                                            <Form.Label>Type of Organization</Form.Label>
                                            <Form.Control as="select" value={cart.Account.Account_Type__c} onChange={this.fieldChange.bind(this)} name="Account.Account_Type__c">
                                                <option value="">- Choose one -</option>
                                                <option value="Law Firm">Law Firm</option>
                                                <option value="Law Firm: 2-29 attorneys">Law Firm: 2-29 attorneys</option>
                                                <option value="Law Firm: 30-79 attorneys">Law Firm: 30-79 attorneys</option>
                                                <option value="Law Firm: 80+ attorneys">Law Firm: 80+ attorneys</option>
                                                <option value="Corporate/Non-Profit">Corporate/Non-Profit</option>
                                                <option value="State or Local Government">State or Local Government</option>
                                                <option value="Federal Government">Federal Government</option>
                                                <option value="Law School - Faculty, Bookstore">Law School - Faculty, Bookstore</option>
                                                <option value="Student">Student</option>
                                                <option value="Other">Other</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="orgName">
                                            <Form.Label>Organization Name</Form.Label>
                                            <Form.Control type="text" value={cart.Account.Name} onChange={this.fieldChange.bind(this)} name="Account.Name"/>
                                        </Form.Group>
                                    </Form>
                                    <p className="border-top mt-5 pt-2">
                                        Thomson Reuters will not sell, rent or share your information. <a rel="noopener noreferrer" target="_blank" href="https://www.thomsonreuters.com/en/privacy-statement.html"> View our privacy statement</a>
                                    </p>
                                    <Button variant="primary" size="lg" className="my-5" onClick={this.goToSection.bind(this, "1")}>
                                        Continue to shipping
                                    </Button>
                                </Col>
                            </Row>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Button} variant="link" className="btn-block p-0" eventKey="1" onClick={this.goToSection.bind(this, "1")}>
                            <ToggleRow title="Shipping" number="2"/>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Row>
                                <Col className="step-number-container" xs={2}></Col>
                                <Col xs={10}>
                                    <h5>Shipping Address</h5>
                                    <Form>
                                        <Form.Group controlId="addressLine1">
                                            <Form.Label>Address Line 1</Form.Label>
                                            <Form.Control type="text" value={cart.ShipToAccount.BillingStreet} onChange={this.fieldChange.bind(this)} name="ShipToAccount.BillingStreet"/>
                                        </Form.Group>

                                        <Form.Group controlId="addressLine2">
                                            <Form.Label>Address Line 2 (Optional)</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                        <Form.Group controlId="city">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" value={cart.ShipToAccount.BillingCity} onChange={this.fieldChange.bind(this)} name="ShipToAccount.BillingCity"/>
                                        </Form.Group>

                                        <Form.Group controlId="state">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control type="text" value={cart.ShipToAccount.BillingState} onChange={this.fieldChange.bind(this)} name="ShipToAccount.BillingState"/>
                                        </Form.Group>

                                        <Form.Group controlId="zipCode">
                                            <Form.Label>Zip Code</Form.Label>
                                            <Form.Control type="text" value={cart.ShipToAccount.BillingPostalCode} onChange={this.fieldChange.bind(this)} name="ShipToAccount.BillingPostalCode"/>
                                        </Form.Group>

                                        <Form.Group controlId="country">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control type="text" value={cart.ShipToAccount.BillingCountry} onChange={this.fieldChange.bind(this)} name="ShipToAccount.BillingCountry"/>
                                        </Form.Group>

                                        <Form.Group controlId="phone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" value={cart.ShipToAccount.Phone} onChange={this.fieldChange.bind(this)} name="ShipToAccount.Phone"/>
                                        </Form.Group>
                                    </Form>

                                    <h5>Shipping Method</h5>
                                    <small className="mb-3 mt-4 d-block">Orders placed after 2:30 CT are processed the next business day</small>
                                    <Form>
                                        <Form.Group controlId="shippingMethod">
                                            <Form.Check 
                                                custom
                                                type="radio"
                                                name="shippingMethod"
                                                checked={shippingMethod === 'free'}
                                                onChange={this.checkChange.bind(this)}
                                                id="free"
                                                label="Free standard shipping (7-10 business days for in-stock items)"
                                            />
                                            <Form.Check 
                                                custom
                                                type="radio"
                                                name="shippingMethod"
                                                checked={shippingMethod === 'free'}
                                                onChange={this.checkChange.bind(this)}
                                                id="priority"
                                                label="Priority 1-3 Day (1-3 business days for in-stock items ordered by 2:30 CT)"
                                            />
                                        </Form.Group>
                                    </Form>

                                    <p className="border-top mt-5 pt-2">
                                        Thomson Reuters will not sell, rent or share your information. <a rel="noopener noreferrer" target="_blank" href="https://www.thomsonreuters.com/en/privacy-statement.html"> View our privacy statement</a>
                                    </p>
                                    <Button variant="primary" size="lg" className="my-5" onClick={this.goToSection.bind(this, "2")}>
                                        Continue to payment
                                    </Button>
                                </Col>
                            </Row>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Button} variant="link" className="btn-block p-0" eventKey="2" onClick={this.goToSection.bind(this, "2")}>
                            <ToggleRow title="Payment" number="3"/>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Row>
                                <Col className="step-number-container" xs={2}></Col>
                                <Col xs={10}>
                                    <h5>Billing Address</h5>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        name="billingAddressSame"
                                        id="billingsame"
                                        checked={billingAddressSame}
                                        onChange={this.checkChange.bind(this)}
                                        className="my-4"
                                        label="Billing address is the same as shipping address"
                                    />

                                    <h5>Billing Method</h5>
                                    <div className="billing-method d-flex pr-4">
                                        <Form.Check inline label="Credit Card Payment" className="border border-gray flex-grow-1 p-3" name="billingMethod" checked={billingMethod==='credit-card'} onChange={this.checkChange.bind(this)} value="credit-card" type="radio" id="pay-creditcard" />
                                        <Form.Check inline label="Pay By Invoice" className="border border-gray flex-grow-1 p-3" name="billingMethod" checked={billingMethod === 'invoice'} onChange={this.checkChange.bind(this)}  value="invoice" type="radio" id="pay-invoice" />
                                    </div>

                                    <h5 className="my-4">Optional PO Number</h5>
                                    <small>
                                        <div className="checkout-privacy">
                                            <p>Bill this order to my existing account. I will be billed the monthly charges to my existing account with invoice payment terms of net 30 days. Any additional usage outside of my subscription plan will be billed to my existing account within the applicable invoice period.</p>
                                            <p>Your account number is found on shipment inserts and on your monthly Thomson Reuters statement.</p>
                                            <p>If you would like to include P.O. Number for your records, enter here (Optional)</p>
                                        </div>
                                    </small>
                                    <Form.Group controlId="poNumber">
                                        <Form.Label>PO Number</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                    <Link to={`/review`} className="text-decoration-none">
                                        <Button variant="primary" className="mt-4" size="lg">Review Order</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Accordion.Collapse>
                    </Accordion>
                </Col>
                <Col xs="12" sm="4" className="pl-5">
                    <OrderSummary total={total} checkoutHidden="true"/>
                </Col>
            </Row>
    }
}

const mapStateToProps = state => {
    return {
        total: state.cart.total,
        cart: state.cart.cart
    }   
};

export default connect(
    mapStateToProps
)(Checkout);
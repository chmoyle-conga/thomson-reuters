import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Promo extends React.Component{

    render(){
        return <Card className="py-3 mb-3">
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
    }
}
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CartApi from '../../store/CartApi';
import { ApiService } from '../../shared/Api';
import './Promo.scss';
import { connect } from 'react-redux';

class Promo extends React.Component{

    apiService;

    constructor(props){
        super(props);
        this.apiService = new ApiService();

        this.state = {
            value : ''
        };
    }

    async componentDidMount(){
        CartApi.fetchPromotions();
    }

    handleSubmit(evt){
        evt.preventDefault();
        CartApi.applyPromotion(this.state.value);
    }

    removePromotion(promo){
        CartApi.removePromotion(promo);
    }

    handleChange(evt){
        this.setState({value: evt.target.value});
    }

    render(){
        const { promotions } = this.props;
        return <Card className="py-3 mb-3">
            <Card.Body>
                <h5>Apply Promo Code</h5>
                <form className="d-flex mb-2" onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Control
                        className="mr-sm-2"
                        id="inlineFormInputName2"
                        placeholder="Promo Code"
                        size="lg"
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    />
                    <Button type="submit" className="text-body" variant="outline-secondary" size="lg">
                        Apply
                    </Button>
                </form>
                {
                    (promotions)
                    ? promotions.map((promo) => 
                        <div key={promo.Id} className="promotion p-2">
                            <div className="d-flex justify-content-between">
                                <span className="font-weight-bold">{promo.IncentiveCode}</span>
                                <Button variant="link" size="sm" className="p-0" onClick={() => this.removePromotion(promo.IncentiveCode)}>Remove</Button>
                            </div>
                            <p className="my-2">{promo.Name}</p>
                        </div>
                    )
                    : <span></span>
                }
            </Card.Body>
        </Card>
    }
}

const mapStateToProps = state => {
    return {
        promotions: state.cart.promotions
    }   
};

export default connect(
    mapStateToProps
)(Promo);
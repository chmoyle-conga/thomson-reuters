import React from 'react';
import { ApiService } from '../../shared/Api';
import ProductDetailsBreadcrumb from '../components/Breadcrumb';
import Button from 'react-bootstrap/Button';
import './ProductDetails.scss';
import Currency from 'react-currency-formatter';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import CartApi from '../../store/CartApi';

export default class ProductDetails extends React.Component{
    
    params;
    apiService;
    
    constructor(props){
        super(props);
        this.params = props.match.params;
        this.state = {
            product: null
        }
        this.apiService = new ApiService();
    }

    async componentDidMount(){
        this.setState({
            product: await this.apiService.get(`/products/${this.params.productId}`)
        });
    }

    addToCart(product){
        this.setState({loading: true});
        CartApi.addToCart(product.Id, 1, product.PriceLists[0].Id);
    }

    render(){
        if(!this.state.product)
            return <div>Loading...</div>
        else
            return <div className="product-details">
                <ProductDetailsBreadcrumb label={this.state.product.Name}/>

                <div className="row">
                    <div className="col-3 d-flex flex-column align-items-center">
                        <img width={211} height={262} className="mr-3" src="http://via.placeholder.com/320x260" alt="Generic placeholder" />

                        <div id="product-quick-link" className="left-container--product-quick-link beforeScroll align-self-stretch">
                            <a href="#productFormatsPricing"><span></span>Formats and pricing</a>
                            <a href="#productInside"><span></span>What’s inside</a>
                            <a href="#productDetailsSpecs"><span></span>Details and specs</a>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="mb-4">
                            <h1 className="font-weight-bold">{this.state.product.Name}</h1>
                            <p>Author: {this.state.product.LCRM_Author}</p>
                        </div>
                        
                        <div className="mb-4">
                            <h1 className="pb-4 font-weight-light border-bottom border-secondary mb-4">Formats and Pricing</h1>
                            

                            <div className="border-bottom border-secondary pb-4 mb-4">
                                <h5 className="mb-3">Choose a Format:</h5>
                                <Button size="lg" variant="outline-primary" active className="px-5">{this.state.product.Format}</Button>
                            </div>
                            
                            <div className="mb-4">
                                <h5 className="mb-3">Pricing Terms:</h5>
                                <Dropdown as={ButtonGroup} className="w-60 pricing-dropdown" alignRight>
                                    <Button variant="outline-secondary" className="d-flex flex-column align-items-start">
                                        <strong>One time purchase - <Currency quantity={this.state.product.PriceLists[0].ListPrice} currency="USD"/></strong>
                                        <i>Purchase the current version only, no updates will be sent</i>
                                    </Button>
                                    <Dropdown.Toggle split variant="outline-secondary" id="dropdown-basic" size="lg" className="button-chevron"></Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            this.state.product.PriceLists.map((pli, index) => (
                                                <Dropdown.Item href="#/action-1" key={index}>One time purchase - <Currency quantity={pli.ListPrice} currency="USD"/></Dropdown.Item>
                                            ))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            
                            <Form.Group as={Row} controlId="availability">
                                <Form.Label column sm="2" className="font-weight-bold">
                                    Availability
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control plaintext readOnly defaultValue="In Stock" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="quantity">
                                <Form.Label column sm="2" className="font-weight-bold">
                                    Quantity
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control as="select" custom size="lg">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Button variant="primary" size="lg" onClick={(e) => this.addToCart(this.state.product)} disabled={this.state.loading}>Add to Cart</Button>
                        </div>
                       
                        <div className="mb-4">
                            <h1 className="pb-4 font-weight-light border-bottom border-secondary mb-4">Details and Specs</h1>
                            <div id="productDetailsSpecs" className="right-container--product-details-specs">
                                <p className="right-container--product-details-specs--detailsSpecsList"></p>
                                <p>La section II du <em>Code de procédure civile</em> intitulée « le pouvoir de sanctionner les abus de la procédure », aux articles 51 et suivants C.p.c., est brève, mais accorde aux tribunaux de larges pouvoirs d’intervention en cas d’abus de procédure. Le présent ouvrage, outil pour le plaideur en matière d’abus de procédure en droit civil québécois, s’intéresse à ces pouvoirs, et ce, tant en première instance qu’en appel. Les auteurs dressent l’historique législatif et jurisprudentiel en matière d’abus de procédure et font état de la jurisprudence récente. Ils détaillent notamment les principaux types d’abus de procédure, le fardeau de preuve et les sanctions. La jurisprudence étant abondante et large en matière d’abus de procédure, cet ouvrage permet au praticien de circonscrire aisément les notions applicables à ce type de demande.</p>
                                <p></p>
                                <div className="row product-information">
                                    <dl className="col-sm">
                                        <dt>Publisher:</dt>
                                        <dd>Éditions Yvon Blais</dd>
                                        <br/>
                                        <dt>Practice Area:</dt>
                                        <dd>Civil Procedure</dd>
                                        <br/>
                                        <dt>Jurisdiction:</dt>
                                        <dd>General</dd>
                                        <br/>
                                        <dt>Publication Date:</dt>
                                        <dd>2020-09-28</dd>
                                        <br/>
                                    </dl>
                                    <dl className="col-sm">
                                        <dt>Hardcover Specifications</dt>
                                        <br/>
                                        <dt>Service #:</dt>
                                        <dd>42805431</dd>
                                        <br/>
                                        <dt>Sub #:</dt>
                                        <dd>42805431</dd>
                                        <br/>
                                        <dt>Pages:</dt>
                                        <dd>N/A</dd>
                                        <br/>
                                        <dt>Shelf Space:</dt>
                                        <dd>0</dd>
                                        <br/>
                                        <dt>Volume:</dt>
                                        <dd>N/A</dd>
                                        <br/>
                                        <dt>Anticip Unkeep Cost:</dt>
                                        <dd>N/A</dd>
                                        <br/>
                                    </dl>
                                    <dl className="col-sm">
                                        <dt>eBook Specifications</dt>
                                        <br/>
                                        <dt>ISBN:</dt>
                                        <dd>9782897306823</dd>
                                        <br/>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    }
}
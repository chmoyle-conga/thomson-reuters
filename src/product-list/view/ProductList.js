import React from 'react';
import CatalogBreadcrumb from '../components/Breadcrumb';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ApiService } from '../../shared/Api';
import ProductMedia from '../components/ProductMedia';
import ProductFilter from '../components/ProductFilter';
import './ProductList.scss';

export default class ProductList extends React.Component{
    constructor(){
        super();
        this.state = {
            products: null
        }
    }

    async componentDidMount(){
        const apiService = new ApiService();
        const products = await apiService.get('/products?page[limit]=10&children=PriceLists');
        
        this.setState({
            products: products
        })
    }

    render(){
        const { products } = this.state;
        if(!products)
            return <div>Loading...</div>
        else{
            return <div className="product-list">
                <div className="my-3">
                    <CatalogBreadcrumb/>    
                </div>
                
                <div className="row">
                    <div className="col-7">
                            <h2>Law Books</h2>
                    </div>
                    <div className="col-5">
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                Sort By
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select">
                                    <option>Publication Date</option>
                                    <option>Relevance</option>
                                    <option>Title: A-Z</option>
                                    <option>Title: Z-A</option>
                                    <option>Price (Low to High)</option>
                                    <option>Price (High to Low)</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </div>
                </div>
                <div className="my-3">
                    Viewing: 1-10 of 2445 Results for "*"
                </div>
                <div className="row">
                    <div className="col-4">
                            <ProductFilter/>
                    </div>
                    <div className="col-8">
                            <ul>
                            {
                                products.map(item => (
                                    <ProductMedia product={item} key={item.Id}/> 
                                ))
                            }
                            </ul>
                    </div>
                </div>
            </div>
        }
    }
}
import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default class ProductDetailsBreadcrumb extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            label: props.label
        }
    }

    render(){
        return <Breadcrumb>
            <Breadcrumb.Item href="/products">Law Books</Breadcrumb.Item>
            <Breadcrumb.Item href="/products">All Products</Breadcrumb.Item>
            <Breadcrumb.Item active>{this.state.label}</Breadcrumb.Item>
        </Breadcrumb>
    }
}
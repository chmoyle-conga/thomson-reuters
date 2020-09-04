import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default class CatalogBreadcrumb extends React.Component{

    render(){
        return <Breadcrumb>
            <Breadcrumb.Item href="#">Law Books</Breadcrumb.Item>
            <Breadcrumb.Item active>All Products</Breadcrumb.Item>
      </Breadcrumb>
    }
}
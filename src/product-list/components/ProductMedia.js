
import React from 'react';
import Media from 'react-bootstrap/Media';
import Currency from 'react-currency-formatter';
import { Link } from 'react-router-dom';

export default class ProductMedia extends React.Component{
    product;

    constructor(props){
        super(props);
        this.product = props.product;
    }

    render(){
        return <Media className="mb-4 pb-4 border-bottom border-secondary">
            <img
                width={166}
                height={194}
                className="mr-3"
                src="http://via.placeholder.com/320x260"
                alt="Generic placeholder"
            />
            <Media.Body>
                <h5>
                    <Link to={`/products/${this.product.Id}`} className="text-info">{this.product.Name}</Link>
                </h5>
                <div>
                    <strong>Formats:</strong> {this.product.Format}
                </div>
                <div>
                    <strong>Publisher:</strong> {this.product.Publisher_Description}
                </div>
                <div>
                    <strong>Author:</strong> {this.product.LCRM_Author}
                </div>
                <div>
                    <strong>Practice Area:</strong> {this.product.APTS_Find_Law_Practice_Area}
                </div>
                <div>
                    <strong>Jurisdiction:</strong> {this.product.Apttus_Filter_Jurisdiction}
                </div>
                <div>
                    <strong>Availability:</strong> {this.product.APTS_Inventory_Available}
                </div>
                <div>
                    <strong>Publication Date:</strong> {this.product.LCRM_Publication_Date}
                </div>

                <div className="mt-3 font-weight-bold">
                    <small className="mr-1 font-weight-bold">Starting at:</small>
                    <Currency quantity={this.product.PriceLists[0].ListPrice} currency="USD"/>
                </div>
            </Media.Body>
        </Media>
    }
}
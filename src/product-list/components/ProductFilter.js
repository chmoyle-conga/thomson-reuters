import React, { Fragment } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ProductFilterType from './ProductFilterType';
import Button from 'react-bootstrap/Button';

export default class ProductFilter extends React.Component{

    constructor(){
        super();
        this.state = {
            fields : [
                {
                    name: 'Format__c',
                    label: 'Product Format',
                    id: "0"
                },
                {
                    name: 'Apttus_Filter_Jurisdiction__c',
                    label: 'Jurisdiction',
                    id: "1"
                },
                {
                    name: 'APTS_Media_Type__c',
                    label: 'Product Type',
                    id: "2"
                },
                {
                    name: 'Publisher_Description__c',
                    label: 'Publisher',
                    id: '3'
                },
                {
                    name: 'APTS_Find_Law_Practice_Area__c',
                    label: 'Practice Area',
                    id: '4'
                }
            ]
        }
    }

    render(){
        return <Fragment>
            <div className="border-bottom mb-2 border-dark">Narrow By:</div>
            <Accordion defaultActiveKey="0">
                {
                    this.state.fields.map((field, index) => ([
                        <Accordion.Toggle as={Button} variant="link" key={field.id + '-toggle'} eventKey={field.id} className="btn-block px-0 py-3 text-body border-bottom">
                            <div className="d-flex justify-content-between font-weight-bold">
                                <span>{field.label}</span>
                                <span>+</span>
                            </div>
                        </Accordion.Toggle>,
                        <Accordion.Collapse key={field.id + '-collapse'} eventKey={field.id}>
                            <ProductFilterType field={field.name}/>
                        </Accordion.Collapse>
                    ]))
                }
            </Accordion>
        </Fragment>
        
    }

}
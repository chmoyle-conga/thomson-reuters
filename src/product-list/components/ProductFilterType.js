import React from 'react';
import { ApiService } from '../../shared/Api';

import Form from 'react-bootstrap/Form';

export default class ProductFilterType extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : undefined,
            field: props.field
        };
    }
    
    async componentDidMount(){
        const apiService = new ApiService();
        this.setState({
            data: await apiService.get(`/products?aggregate=true&aggregateFields=${this.state.field}&groupBy=${this.state.field}`)
        });
    }

    render(){
        if(!this.state.data)
            return <div></div>
        else
        return <div className="p-3">
                {
                    this.state.data.map((r, index) => (
                        <Form.Check id={this.state.field + '-' + index} custom key={this.state.field + '-' + index} type="checkbox" label={r[this.state.field] + ' (' + r.total_records + ')'} />
                    ))
                }
        </div>
    }
}
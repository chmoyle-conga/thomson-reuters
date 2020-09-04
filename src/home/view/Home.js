import React from 'react';
import './Home.scss';

export default class HomePage extends React.Component{
    
    sayHello(){
        alert('Hello There');
    }

    render(){
       return <div>Hello World</div>
    }
}
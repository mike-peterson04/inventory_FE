import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class ProductAssignment extends Component{
    constructor(props){
        super(props);
        this.state = {
            employeeList:'none',
            storeList:'none',
            modelList:'none', //should be an array formatted like [{product:{name:productName, quantity:amount in stock}},{product:{name:productName, quantity:amount in stock}}]
            products:props.products,
            renderIndex:'not collected'
        }

    }
}

export default ProductAssignment;
import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import EditForm from './editForm';

const EditSelector=(props)=>{
    const [renderIndex,render] = useState('');
    const [activeProduct, productSelect] = useState()
function getModel(modelId){
        
    let result = props.model.filter((model)=>{
        if (model.id === modelId){
            return true;
        }
        return false;
    });
    return result[0].name

}

function getStatus(statusId)
{
    
    let result = props.status.filter((status)=>{
        if (status.id === statusId){
            return true;
        }
        return false;
    });
    return result[0].name

}

function Selector(event,product='',selection=false){
    event.preventDefault()
    if (selection){
        render('');
    }
    else{
        productSelect(product);
        render('product')
    }

}

function buildTable(product){
    let model = getModel(product.model)
    let status = getStatus(product.status)
    return(
        <tr>
            <td>{product.id}</td>
            <td>{model}</td>
            <td>{product.employee_unit&&<span>true</span>}</td>
            <td>{status}</td>
            <td>{product.hardware_version}</td>
            <td>{product.Storefront}</td>
            <td><button className='btn btn-dark' onClick={(e)=>{Selector(e,product)}}>Edit Unit</button></td>

        </tr>

    );

}
if (renderIndex === 'product'){

    return(
        <div><EditForm update={props.update} status={props.status} model={props.model} product={activeProduct} stores={props.stores}/></div>
    );

}
else{
    return(
        <div>
            <h3>All tracked products:</h3>
            <table className='table table-striped'>

                <tbody>
                    <tr>
                        <td>Warehouse Id:</td>
                        <td>Product Model:</td>
                        <td>Internal Unit:</td>
                        <td>Current Status:</td>
                        <td>Hardware Rev:</td>
                        <td>Assign Store:</td>
                        <td></td>
                    </tr>
                    {props.products.map(buildTable)}
                </tbody>
            </table>
        </div>

    );
}

}
export default EditSelector
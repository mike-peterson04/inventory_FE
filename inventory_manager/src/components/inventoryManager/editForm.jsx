import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const EditForm = (props) =>{
    
    
    debugger;
    const [id, setId] = useState(props.product.id);
    const [hardware, setHardware] = useState(props.product.hardware_version);
    const [employee, setEmployee] = useState(props.product.employee_unit);
    const [storefront, setStorefront] = useState(props.product.Storefront);
    const [model, setModel] = useState(props.product.model);
    const [status, setStatus] = useState(props.product.status);

    
    function selectMapper(item){
        return(<option value={item.id}>{item.name}</option>)


    }
    function getStore(storeId){
        debugger;
        if(storeId===''){
            return 'Not Assigned'
        }
        let result = props.stores.filter((store)=>{
            if (store.id == storeId){
                return true;
            }
            return false;
        });
        return result[0].name

    }
    function getModel(modelId){        
        let result = props.model.filter((model)=>{
            if (model.id == modelId){
                return true;
            }
            return false;
        });
        return result[0].name
    
    }
    
    function getStatus(statusId)
    {
        let result = props.status.filter((status)=>{
            if (status.id == statusId){
                return true;
            }
            return false;
        });
        return result[0].name
    
    }

    function mapProduct(){
        debugger;
        let product = props.product
            if(product.id!==id){
                product.id=id

            }
            if(product.hardware_version!==hardware){
                product.hardware_version=hardware

            }
            if(product.employee_unit!==employee){
                if(employee==="true"){
                    product.employee_unit=true
                }
                else if(employee === "false"){
                    product.employee_unit=false
                }
            }
            if(product.model!==model){
                product.model=model
            }
            if(product.status!==status){
                product.status=status

            }
            if(product.Storefront!==storefront){
                product.Storefront=storefront
            }
        
        return product
    }

    return(
        <div className='UpdateProduct'>
            <form onSubmit={(e)=>props.update(e,mapProduct())}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Product Id:</label></td>
                            <td>
                                {id}
                            </td>
                        </tr>
                        <tr>
                            <td><label>Internal or Retail unit</label></td>
                            <td>
                                <select value={employee} onChange={(e)=> setEmployee(e.target.value)}>
                                    <option value={employee}>{employee&&'Internal'}{!employee&&'Retail'}</option>
                                    <option value={true}>Internal</option>
                                    <option value={false}>Retail</option>   
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Product Model:</label></td>
                            <td>
                                <select value={model} onChange={(e)=> setModel(e.target.value)}>
                                    <option value={model}>{getModel(model)}</option>
                                    {props.model.map(selectMapper)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Product Status:</label></td>
                            <td>
                                <select value={status} onChange={(e)=> setStatus(e.target.value)}>
                                    <option value={status}>{getStatus(status)}</option>
                                    {props.status.map(selectMapper)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Assigned to Store:</label></td>
                            <td>
                                <select value={storefront} onChange={(e)=> setStorefront(e.target.value)}>
                                    {storefront!== null&&<option value={storefront}>{getStore(storefront)}</option>}
                                    <option value="">Not Assigned</option>
                                    {props.stores.map(selectMapper)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <button className='btn btn-dark' type='submit'>Update Product</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    )


}

export default EditForm;
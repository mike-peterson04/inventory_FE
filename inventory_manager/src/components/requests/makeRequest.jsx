import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const MakeRequest = (props) =>{
    
    
    
    const [quantity, setQuantity] = useState(0);
    const [priority, setPriority] = useState(4);
    const [justification, setJust] = useState('Please explain why this is needed');
    const [product, setProduct] = useState({id:0,name:'none'});
    const [type, setType] = useState();

    
    function selectMapper(item){
        return(<option value={item.id}>{item.name}</option>)


    }

    async function createRequest(event){
        event.preventDefault();
        let newRequest
        if(product === 0||product.id===0)
        newRequest = {
            employee:props.employee,
            type:type,
            justification:justification,
            priority:priority,
        }
        else{
            newRequest = {
                employee:props.employee,
                type:type,
                justification:justification,
                priority:priority,
                product:product,
                quantity:quantity
            }
            
        }
        let token = localStorage.getItem('token')
        let config = {headers: { Authorization: `Bearer ${token}` }};
        try{
            newRequest = await Axios.post('http://127.0.0.1:8000/api/request/',newRequest,config)
            props.purge(event)
        }
        catch(e){
            console.log(e)
            alert('unable to save request please try again later')
        }
    }

    return(
        <div className='CreateRequest'>
            <form onSubmit={(e)=>createRequest(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Request Type:</label></td>
                            <td>
                                <select value={type} onChange={(e)=> setType(e.target.value)}>
                                    {props.type.map(selectMapper)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Product Type:</label></td>
                            <td>
                                <select value={product} onChange={(e)=> setProduct(e.target.value)}>
                                    <option value={0}>None</option>
                                    {props.model.map(selectMapper)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Request Priority:</label></td>
                            <td>
                                <select value={priority} onChange={(e)=> setPriority(e.target.value)}>
                                    <option value={0}>P0(Extremely High)</option>
                                    <option value={1}>P1</option>
                                    <option value={2}>P2</option>
                                    <option value={3}>P3</option>
                                    <option value={4}>P4 (Low)</option>    
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Justification</label></td>
                            <td>
                                <textarea required value={justification} onChange={(e)=> setJust(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Quantity(Optional):</label>
                            </td>
                            <td>
                                <input type='number' value={quantity} onChange={(e)=>setQuantity(e.target.value)}></input>
                            </td>

                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <button className='btn btn-secondary' type='submit'>Create Request</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    )


}

export default MakeRequest;
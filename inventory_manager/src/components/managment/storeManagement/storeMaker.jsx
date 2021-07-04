import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const StoreMaker = (props) =>{
    
    
    
    const [name, setName] = useState();
    const [manager, setManager] = useState();

    
    function selectMapper(item){
        return(<option value={item.id}>{item.name}:id {item.id}</option>)


    }

    return(
        <div className='CreateStore'>
            <form onSubmit={(e)=>props.createStore(e, {name:name,manager:manager})}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Manager:</label></td>
                            <td>
                                <select value={manager} onChange={(e)=> setManager(e.target.value)}>
                                <option value='0'>Select Manager</option>
                                    {props.managers.map(selectMapper)}
                                </select>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <label>Store Name:</label>
                            </td>
                            <td>
                                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}></input>
                            </td>

                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <button className='btn btn-danger' type='submit'>Create Store</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    )


}

export default StoreMaker;
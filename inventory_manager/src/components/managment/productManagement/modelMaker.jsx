import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const ModelMaker = (props) =>{
    
    
    
    const [name, setName] = useState('New Model');

    async function createProductType(event, model){
        event.preventDefault();
        
        let config = props.buildHeader()
        try {
            let result = await Axios.post('http://127.0.0.1:8000/api/request/model/',model,config)
            if (result.status===201){
                props.purge()
            }

            
        } catch (error) {
            alert("there was a problem creating your status")
        }
        

    }    

    return(
        <div className='CreateStatus'>
            <form onSubmit={(e)=>createProductType(e, {name:name})}>
                <table>
                    <tbody>
                    <tr>
                            <td>
                                <label>Status Name:</label>
                            </td>
                            <td>
                                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}></input>
                            </td>

                        </tr>             
                        
                        <tr>
                            <td colSpan='2'>
                                <button className='btn btn-danger' type='submit'>Create Product Model</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    )


}

export default ModelMaker;
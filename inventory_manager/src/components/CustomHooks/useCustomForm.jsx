import {useState} from 'react';

const useCustomForm = (callback) => {
    const [inputs, setInputs] = useState({});
    
    const handleChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (event) => {
        if(event) {
            event.preventDefault();
        }
        callback()
    }
    return {
        handleChange,
        handleSubmit,
        inputs
    }
}

export default useCustomForm;
import * as XLSX from 'xlsx'
import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from 'react-data-table-component';


const ReportManager = (props) =>{
  
 
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [report, uploadReport] =useState();
   
    const handleFileUpload = e => {
        
        const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log(data);
      processData(data);
    };
    reader.readAsBinaryString(file);
   
    }

    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        console.log(dataStringLines)
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        console.log(headers)
     
        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
          const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
          if (headers && row.length == headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
              let d = row[j];
              if (d.length > 0) {
                if (d[0] == '"')
                  d = d.substring(1, d.length - 1);
                if (d[d.length - 1] == '"')
                  d = d.substring(d.length - 2, 1);
              }
              if (headers[j]) {
                obj[headers[j]] = d;
              }
            }
     
            
            if (Object.values(obj).filter(x => x).length > 0) {
              list.push(obj);
              uploadReport(list)
            }
          }
        }
     
        
        const columns = headers.map(c => ({
          name: c,
          selector: c,
        }));
     
        setData(list);
        setColumns(columns);
      }
   
    return (
      <div>
          <h3>Please Upload your product status report</h3>
          report must have the following information:<br/>
          <ul>
              <li>Product Id</li>
              <li>Status Update</li>
              <li>Product Model</li>
              <li>Hardware_version</li>
          </ul>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
        <DataTable
          pagination
          highlightOnHover
          columns={columns}
          data={data}
        />
        <button className='btn btn-warning'onClick={(e)=>{props.uploadReport(e,report)}}>Accept Report</button>
      </div>
    );
  }
  export default ReportManager;
import { useNavigate } from "react-router-dom";
import React, { useEffect,useState } from 'react';
import axios from 'axios';

const Home = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    DocumentType: '',
    DocumentSubType: '',
    Folder:'',
    ModelGroup:'',
    Production:'',
    Parameter:'',
    File:''

  });
  const [file, setFile] = useState(null);

   useEffect(() => {

        if(token==='null')
        {
            navigate("/");
        }

    }, [navigate]);  // The empty array ensures it runs only once


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('DocumentType', formData.DocumentType);
    data.append('DocumentSubType', formData.DocumentSubType);
    data.append('Folder', formData.Folder);
    data.append('ModelGroup', formData.ModelGroup);
    data.append('Production', formData.Production);
    data.append('Parameter', formData.Parameter);
   if (file) {
      data.append('file', file);
    }

    console.log(data);
    try {
          const response = await axios.post('http://localhost:5003/upload', data, {
        headers: {
         'Content-Type': 'multipart/form-data',  // Let axios handle the content-type
          'Authorization': `Bearer ${token}`
        },
      });
      console.log('Data:', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
   <div className="container">
   <div className="my-2">
        <h2 >Document Intelligence Studio</h2>
   </div>
   <div className="form-horizontal">
      <form onSubmit={handleSubmit} className="mt-1">
         <div className="row">
         <div className="col-sm-4">
               <div className="mb-3">
                  <label htmlFor="DocumentType" className="form-label">Document Type</label>
                  <select
                     id="DocumentType"
                     name="DocumentType"
                     className="form-select"
                     value={formData.DocumentType}
                     onChange={handleChange}
                     required
                     >
                     <option value="" disabled>Select a Document Type</option>
                     <option value="DocumentType1">DocumentType 1</option>
                     <option value="DocumentType2">DocumentType 2</option>
                     <option value="DocumentType3">DocumentType 3</option>
                  </select>
               </div>
            </div>
            <div className="col-sm-4">
               <div className="mb-3">
                  <label htmlFor="DocumentSubType" className="form-label">Document Sub Type</label>
                  <select
                     id="DocumentSubType"
                     name="DocumentSubType"
                     className="form-select"
                     value={formData.DocumentSubType}
                     onChange={handleChange}
                     required
                     >
                     <option value="" disabled>Select a Document Sub Type</option>
                     <option value="DocumentSubType1">DocumentSubType 1</option>
                     <option value="DocumentSubType2">DocumentSubType 2</option>
                     <option value="DocumentSubType3">DocumentSubType 3</option>
                  </select>
               </div>
            </div>
            <div className="col-sm-4">
               <div className="mb-3">
                  <label htmlFor="Folder" className="form-label">Folder</label>
                  <select
                     id="Folder"
                     name="Folder"
                     className="form-select"
                     value={formData.Folder}
                     onChange={handleChange}
                     required
                     >
                     <option value="" disabled>Select a category</option>
                     <option value="Folder1">Folder 1</option>
                     <option value="Folder2">Folder 2</option>
                     <option value="Folder3">Folder 3</option>
                  </select>
               </div>
            </div>
            <div className="col-sm-4">
               <div className="mb-3">
                  <label htmlFor="ModelGroup" className="form-label">Model Group</label>
                  <select
                     id="ModelGroup"
                     name="ModelGroup"
                     className="form-select"
                     value={formData.ModelGroup}
                     onChange={handleChange}
                     required
                     >
                     <option value="" disabled>Select a Model Group</option>
                     <option value="ModelGroup1 ">ModelGroup 1</option>
                     <option value="ModelGroup2">ModelGroup 2</option>
                     <option value="ModelGroup3">ModelGroup 3</option>
                  </select>
               </div>
            </div>
            <div className="col-sm-4">
               <div className="mb-3">
                  <label htmlFor="Production" className="form-label">Production</label>
                  <select
                     id="Production"
                     name="Production"
                     className="form-select"
                     value={formData.Production}
                     onChange={handleChange}
                     required
                     >
                     <option value="" disabled>Select a Production</option>
                     <option value="Production1">Production 1</option>
                     <option value="Production2">Production 2</option>
                     <option value="Production3">Production 3</option>
                  </select>
               </div>
            </div>
            <div className="col-sm-4">
               <div className="mb-3">
                  <label htmlFor="Parameter" className="form-label">Parameter</label>
                  <select
                     id="Parameter"
                     name="Parameter"
                     className="form-select"
                     value={formData.category}
                     onChange={handleChange}
                     required
                     >
                     <option value="" disabled>Select a Parameter</option>
                     <option value="Parameter1">Parameter 1</option>
                     <option value="Parameter2">Parameter 2</option>
                     <option value="Parameter3">Parameter 3</option>
                  </select>
               </div>
            </div>
             <div className ="col-sm-4">
             <div className="mb-3">
                <label htmlFor="file" className="form-label">Upload File</label>
                <input
                   type="file"
                   id="file"
                   name="file"
                   accept=".xlsx,.xls"
                   className="form-control"
                   onChange={handleFileChange}
                   required
                   />
             </div>
             </div>
         </div>

         <button type="submit" className="btn btn-primary">Submit</button>
         <p>{message}</p>
      </form>
   </div>
</div>
);
};

export default Home;

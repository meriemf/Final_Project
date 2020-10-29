import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


const EditProject = (props) => {

const { id } = props.match.params;

const [project, setProject] = useState ({
 
  name:'',
  start_date:'',
  end_date:'',
  assigned_to:'',
  type:'',
  project_stage:'',
  payment_received:'',
  payment_date:'',
  client_id:''
});
const [clients, setClients] = useState([]    
  );
  useEffect(() => {
    Promise.all([
      axios.get('/clients'),
      console.log(clients)
    ]).then((all) => {
      setClients(all[0].data);   
   });
   
  }, []);
useEffect (() => {
  const getProject = () => {  
  axios.get(`/projects/${id}/edit`)
   //axios.get(`/clients/${id}`)
   .then (
     res=> {
     //  console.log(res.data.name);
    //if (res.data.name) {
    if (res.data.id) {
    
      setProject(res.data);
      console.log(res.data);
    
    } else {
      alert('project not found');
    }
   });
 };
    getProject();
}, [id]);



const handleChange = (event) => {
  console.log("handle change function");
  setProject ({
  ...project, // save the previous state
  [event.target.name] : event.target.value 
  });

 };
 const SaveProject= () => {
  axios.put(`/projects/${id}/edit`, project)
   .then (res => {
    console.log("save project",res);
     console.log("props",props);
     props.history.push('/projects');
 } 
  
  );
  };
 const handleSubmit = (event)=> {
   event.preventDefault();
   console.log(project);
    SaveProject();
 };

const onCancel = () => {

  props.history.push('/projects');
};
return (

<form onSubmit = {handleSubmit}>
    
       {/* number */}
       {/* <div className ="form-group">
        <label htmlFor="number">Number</label>
        <input 
        type="text"
        className="form-control"
        name="number"
        placeholder="Enter project number"
        defaultValue={project.number}
        onChange={handleChange}
        required />
      </div> */}

      {/* name */}
      <div className ="form-group">
        <label htmlFor="name">Project Name</label>
        <input 
        type="text"
        className="form-control"
        name="name"
        placeholder="Enter project name"
        value={project.name}
        onChange={handleChange}
        required />
      </div>

     

      {/* start_date */}
      <div className ="form-group">
        <label htmlFor="start_date">Start Date</label>
        <input 
        type="text"
        className="form-control"
        name="start_date"
        placeholder="Start Date"
        value={project.start_date}
        onChange={handleChange}
        required />
      </div>

      {/* end_date */}
      <div className ="form-group">
        <label htmlFor="end_date">End Date</label>
        <input 
        type="text"
        className="form-control"
        name="end_date"
        placeholder="End Date"
        value={project.end_date}
        onChange={handleChange}
        required />
      </div>
      <div className ="form-group">
        <label htmlFor="assigned_to">Assigned To</label>
        <input 
        type="text"
        className="form-control"
        name="assigned_to"
        placeholder="Contractor Name"
        value={project.assigned_to}
        onChange={handleChange}
        required />
      </div>
      <div className ="form-group">
        <label htmlFor="type">Project Type</label>
        <select 
        type="text"
        className="form-control"
        name="type"
        value={project.type}
        onChange={handleChange}
        required >
          <option value="Select">Select....</option>
          <option value="Quality Review">Quality Review</option>
          <option value="Instructional Design">Instructional Design</option>
        </select>
      </div>

      {/* client */}
      {/* <div className ="form-group">
        <label htmlFor="client">Client Name</label>
        <input 
        type="text"
        className="form-control"
        name="client"
        placeholder="Enter Client Name"
        defaultValue={project.client}
        onChange={handleChange}
        required />
      </div> */}

      <div className ="form-group">
        <label htmlFor="type">Project Stage</label>
        <select 
        type="text"
        className="form-control"
        name="stage"
        defaultValue={project.stage}
        onChange={handleChange}
        required >
          <option value="Select">Select....</option>
          <option value="Consulattion">Consulattion</option>
          <option value="Contract Sent">Contract Sent</option>
          <option value="Contract Signed">Contract Signed</option>
          <option value="Work In Progress">Work In Progress</option>
          <option value="Project Completed">Project Completed</option>
        </select>
      </div>

      {/* payment recevied */}
      <div className ="form-group">
        <label htmlFor="payment_received">Payment Status</label>
        <select 
        type="text"
        className="form-control"
        name="payment_received"
        value={project.payment_received}
        onChange={handleChange}
        required >
          <option value="Select">Select....</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* payment_date */}
      <div className ="form-group">
        <label htmlFor="payment_date">Payment Date</label>
        <input 
        type="text"
        className="form-control"
        name="payment_date"
        placeholder="Payment Date"
        value={project.payment_date}
        onChange={handleChange}
         />
      </div>

      <div className ="form-group">
        <label htmlFor="first_name">Client Name</label>
        <div></div>
        <select onChange={handleChange} name="client_id"
        type="text"
        className="form-control">
        <option value="Select">Select....</option>
      {clients.map(client => (
        <option
          key={client.id}
          value={client.id}
        >
          {client.first_name}
        </option>
      ))}
    </select>
      </div>


      
      <button
      type="submit"
      variant="primary"
      className="btn btn-primary"
      title="Submit">
        Submit
      </button>
  <button
          type="cancel"
          variant="primary"
          className="btn btn-primary"
          title="Cancel"
          onClick={()=>{ onCancel()}}> Cancel 
  </button>
  </form>

);

}


export default withRouter(EditProject);
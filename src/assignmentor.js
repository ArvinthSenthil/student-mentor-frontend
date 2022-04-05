import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {api} from './api'

export function Assignmentor() {
  const { id } = useParams();
  const [mentor, setmentor] = useState(null);
 
  useEffect(()=>{fetch(`${api}/students/${id}`,{
    method:"GET"}) //Promise
    .then((data)=>data.json())// Response
    .then((mv)=>setmentor(mv));},[id])
    
  return (
   <div>
  <Editmentorform mentor={mentor}/> 
   </div>
  );
}

const mentorValidationSchema = yup.object({
 mentorId : yup.string().required("Enter mentorId"),
 
   
});
function Editmentorform({mentor}){
  const his=useHistory();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: { mentorId: "" },
     validationSchema: mentorValidationSchema,
    onSubmit: (updatedMentor) => {
      assignMentor(updatedMentor)
    },
  });
  const assignMentor = (updatedMentor)=>{
    
  fetch(`${api}/students/${id}`,{
    method:"PUT", 
    body: JSON.stringify(updatedMentor),
     headers:{
       "content-Type" : "application/json"
    }}).then(() =>his.push("/students"))};
  
 
  return(
    <form  onSubmit={formik.handleSubmit} className="form">
    <TextField  id="mentorId" label="Mentor Id"   name="mentorId" variant="outlined" value={formik.values.mentorId}  onChange={formik.handleChange}
        onBlur={formik.handleBlur} error={formik.touched.mentorId && formik.errors.mentorId} helperText={formik.touched.mentorId && formik.errors.mentorId ? formik.errors.mentorId : ""} />
 <Button  color="success" variant="contained" type="submit">Save</Button>
    <Button onClick={()=>his.goBack()} variant="contained" startIcon={<ArrowBackIosIcon />}>back</Button>
   
    </form>
  
)
}

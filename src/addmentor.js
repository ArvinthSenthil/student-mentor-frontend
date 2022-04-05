import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {api} from './api'
import { useFormik } from "formik";
import * as yup from "yup";

 const mentorValidationSchema = yup.object({
  name : yup.string().required("Enter student name"),
 email:yup.string().required("Enter Email"),
    mentorId:yup.string().required("Enter MentorId"), 
});

export function Addmentor() {

  const formik = useFormik({
    initialValues: { name: "", email: "",mentorId:""},
     validationSchema: mentorValidationSchema,
    onSubmit: (newMentor) => {
      addmentor(newMentor)
    },
  });
  
 
  const his=useHistory();
 const addmentor = (newmentor) => {
console.log("onSubmit",newmentor)
    fetch(`${api}/mentors`,{
      method:"POST", 
      body: JSON.stringify([newmentor]),
       headers:{
         "content-Type" : "application/json"
      }})
  
    .then(() =>his.push("/mentors"))
   };

  return (
   
      <form className="form" onSubmit={formik.handleSubmit}>
      <TextField  id="name" type="text"  name="name" label="Mentor Name" variant="outlined" values={formik.values.name}  onChange={formik.handleChange}
          onBlur={formik.handleBlur} error={formik.touched.name && formik.errors.name} helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""} />
      <TextField id="email" type="email"  name="email" label="Email" variant="outlined" values={formik.values.email}  onChange={formik.handleChange}  onBlur={formik.handleBlur} error={formik.touched.email && formik.errors.email}  helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""} />
      <TextField id="mentorId" type="text"  name="mentorId" label="mentorId" variant="outlined" values={formik.values.mentorId}  onChange={formik.handleChange}  onBlur={formik.handleBlur} error={formik.touched.mentorId && formik.errors.mentorId}  helperText= {formik.touched.mentorId && formik.errors.mentorId ? formik.errors.mentorId : ""} />
      <Button variant="contained" type="submit">Add mentor</Button>
      <Button onClick={()=>his.goBack()} variant="contained" startIcon={<ArrowBackIosIcon />}>back</Button>
      </form>
  
  );
}


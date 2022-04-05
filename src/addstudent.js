import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {api} from './api'
import { useFormik } from "formik";
import * as yup from "yup";

 const studentValidationSchema = yup.object({
  name : yup.string().required("Enter student name"),
 surname:yup.string().required("Enter surname"),
    email:yup.string().required("Enter Email"), 
});

export function Addstudent() {

    
  const formik = useFormik({
    initialValues: { name: "", surname: "",email:"",mentorId:""},
     validationSchema: studentValidationSchema,
    onSubmit: (newStudent) => {
      addStudent(newStudent)
    },
  });
  
 
  const his=useHistory();
 const addStudent = (newStudent) => {
console.log("onSubmit",newStudent)
    fetch(`${api}/students`,{
      method:"POST", 
      body: JSON.stringify([newStudent]),
       headers:{
         "content-Type" : "application/json"
      }})
  
    .then(() =>his.push("/students"))
   };

  return (
   
      <form className="form" onSubmit={formik.handleSubmit}>
      <TextField  id="name" type="text"  name="name" label="Student Name" variant="outlined" values={formik.values.name}  onChange={formik.handleChange}
          onBlur={formik.handleBlur} error={formik.touched.name && formik.errors.name} helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""} />

      <TextField id="surname" type="text"  name="surname" label="Student surname" variant="outlined" values={formik.values.surname}  onChange={formik.handleChange}  onBlur={formik.handleBlur} error={formik.touched.surname && formik.errors.surname}  helperText= {formik.touched.surname && formik.errors.surname ? formik.errors.surname : ""} />
      <TextField id="email" type="email"  name="email" label="email" variant="outlined" values={formik.values.email}  onChange={formik.handleChange}  onBlur={formik.handleBlur} error={formik.touched.email && formik.errors.email}  helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""} />
    
      <Button variant="contained" type="submit">Add student</Button>
      <Button onClick={()=>his.goBack()} variant="contained" startIcon={<ArrowBackIosIcon />}>back</Button>
      </form>
  
  );
}


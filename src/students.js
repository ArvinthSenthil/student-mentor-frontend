import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useHistory } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button';
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {api} from './api'



export function StudentsList() {
  const history = useHistory()
  const [students, setStudents] = useState([])
  const [mentors, setMentors] = useState([])

  const getStudents = () => {
    fetch(`${api}/students`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .then((students) => setStudents(students))
  }
  const getMentors = () => {
    fetch(`${api}/mentors`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .then((mentors) => setMentors(mentors))
  }

  useEffect(() => getStudents(), [])
  useEffect(() => getMentors(), [])
  const deleteStudent = (id) => {
    fetch(`${api}/students/${id}`, {
      method: 'DELETE',
    }).then(() => getStudents())
  }

  const style = {
    
    fontFamily: 'cursive',
    letterSpacing :"1px",
    fontWeight:"900"
  }
 
  return (
    <div className="table">
        <Button onClick={()=>{
                  history.push(`/addstudents`)
              }}>Add student</Button>
              
      <TableContainer  >
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={style}>S.no</TableCell>
              <TableCell align="center" style={style}>
                Name
              </TableCell>
              <TableCell align="center" style={style}>
                Surname
              </TableCell>
              <TableCell align="center" style={style}>
                Email
              </TableCell>
              <TableCell align="center" style={style}>
                Mentor
              </TableCell>
              <TableCell align="center" style={style}>
                Remove Student
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        
            {students.map(({ name, surname, email,mentorId, _id }, index) => (
              <Student
                key={index}
                name={name}
                surname={surname}
                email={email}
                id={_id}
                mentorId={mentorId}
                mentorname={mentors.filter((mentor)=>mentor.mentorId===mentorId).map((mentor)=>mentor.name)}
                assignmentor={
                  <Button
                  startIcon={<EditIcon />}
                  className="assignmentor"
                  color="secondary"
                    onClick={()=>{
                      history.push(`/students/${_id}`)
                  }}>Assignmentor</Button>}
                // delete
                deleteButton={
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      style={{ marginLeft: 'auto' }}
                      onClick={() => {
                        deleteStudent(_id)
                      }}
                      color="error"
                      >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
        
               
                index={index}
              />
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function Student({
  name,
  surname,
  email,
  mentorname,
  deleteButton,
  assignmentor,
  index,
}) 

{
  const style = {
    fontFamily: 'Carter One',
    letterSpacing :"2px",
    fontWeight:"600"
  }
  const num = index + 1

  const history = useHistory()
 
  return (
    <>
      <TableRow
        key={index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {num}
        </TableCell>
        <TableCell style={style} align="center">{name}</TableCell>
        <TableCell style={style} align="center">{surname}</TableCell>
        <TableCell style={style} align="center">{email}</TableCell>
       <TableCell style={style} align="center">{mentorname.length !==0 ? mentorname : assignmentor }</TableCell> 
        <TableCell style={style} align="center">{deleteButton}</TableCell>
      </TableRow>
     
    </>
  )
}

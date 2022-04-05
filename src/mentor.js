import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useHistory } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button';
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {api} from './api'

// export const api = "https://bindharan.herokuapp.com/movies"


export function MentorsList() {
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

  const deleteMentor = (id) => {
    fetch(`${api}/mentors/${id}`, {
      method: 'DELETE',
    }).then(() => getMentors())
  }

  const style = {
    
    fontFamily: 'cursive',
    letterSpacing :"1px",
    fontWeight:"900"
  }
  return (
    <div className="table">
         <Button onClick={()=>{
                  history.push(`/addmentors`)
              }}>Add mentor</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={style}>S.no</TableCell>
              <TableCell align="center" style={style}>
                Mentor Name
              </TableCell>
              <TableCell align="center" style={style}>
                Email
              </TableCell>
              <TableCell align="center" style={style}>
                Mentor ID
              </TableCell>
              <TableCell align="center" style={style}>
                Students
              </TableCell>
              <TableCell align="center" style={style}>
                Remove Mentor
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {mentors.map(({ name, email,mentorId, _id }, index) => (
              <Mentor
                key={index}
                name={name}
                email={email}
                mentorId={mentorId}
                studentslist={students.filter((students)=>students.mentorId===mentorId).map((students)=>students.name).join(",")}
              
                deleteButton={
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      style={{ marginLeft: 'auto' }}
                      onClick={() => {
                        deleteMentor(_id)
                      }}
                      color="error"
                      >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
                id={_id}
                index={index}
              />
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function Mentor({
  name,
  email,
  mentorId,
  deleteButton,
  studentslist,
  index,
}) 

{
  const style = {
    fontFamily: 'Carter One',
    letterSpacing :"2px",
    fontWeight:"600"
  }
  const num = index + 1

 
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
        <TableCell style={style} align="center">{email}</TableCell>
        <TableCell style={style} align="center">{mentorId}</TableCell>
        <TableCell style={style} align="center">{studentslist}</TableCell>
        <TableCell style={style} align="center">{deleteButton}</TableCell>
       
      </TableRow>
   
    </>
  )
}

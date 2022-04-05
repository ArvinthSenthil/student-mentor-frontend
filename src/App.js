import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Home from './home.js'
import { Switch, Route,useHistory} from "react-router-dom"
import { StudentsList } from './students'
import { Assignmentor } from './assignmentor'
import { Addstudent } from './addstudent'
import { Addmentor } from './addmentor'
import {Changementor} from './changementorlist'
import {MentorsList} from './mentor'
import './App.css'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
const drawerWidth = 150;

export default function App() {
 

  

    return (
      <div className="App">

<ResponsiveDrawer />
</div>
    )
    }

  function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className='drawer'>
      <Toolbar />
      <Divider />
      <List>
       
          <ListItem button >
            <ListItemText primary={"HOME"} onClick={()=>history.push("/")}/>
          </ListItem>
        
      </List>
      <Divider />
      <List>
       
          <ListItem button >
          <ListItemText primary={"STUDENTS"} onClick={()=>history.push("/students")}/>
          </ListItem>

          <ListItem button >
          <ListItemText primary={"MENTORS"} onClick={()=>history.push("/mentors")}/>
          </ListItem>

          <ListItem button >
          <ListItemText primary={"CHANGE MENTOR"} onClick={()=>history.push("/changementor")}/>
          </ListItem>

          
  
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  
  
 
  
 
   const history = useHistory();

  return (
    <Box sx={{ display: 'flex' }}>
      
      <CssBaseline />
      <AppBar  className='appbar'
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon className='toggler-icon'/>
          </IconButton>
          <Typography  noWrap component="span">
         
            <h3> <SupervisorAccountIcon/>StudentsMentorAssign</h3>
           
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        aria-label="mailbox folders"
        >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Switch>
        <Route path="/mentors">
            <MentorsList />
            </Route>
            <Route exact path="/addstudents">
         <Addstudent />
        
        </Route>
        <Route exact path="/addmentors">
         <Addmentor />
        </Route>
        <Route exact path="/students/:id">
         <Assignmentor />
        </Route>
            <Route path="/students">
              <StudentsList />
            </Route>
            <Route path="/changementor">
              <Changementor />
            </Route>
            <Route exact path="/">
              <Home/>
            </Route>

            <Route path="**">404</Route>
         
            
          </Switch>

         
      </Box>
    </Box>
  );
}
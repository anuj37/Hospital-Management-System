import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ExpandLess from '@material-ui/icons/ArrowRightOutlined';
import ExpandMore from '@material-ui/icons/ArrowDropDownOutlined';

import DialogTitle from '@material-ui/core/DialogTitle';
import BillingSubConcept from './BillingSubConcept';
import Grid from '@material-ui/core/Grid';import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from "../styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hyperlinkcolor: {
    '&:hover': {
       color: "#fff",
    },
  },
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
export default function NewInvestigation(props) {
  const classes = useStyles();
  const { servicdetailsVal,handleClose,addNewInvestigation,handleNewInvestigationClose, investigationList, orderDtl } =
    props;
  const [open, setOpen] = React.useState(true);
  
  const [value, setValue] = React.useState(0);
  const [listopen, setListOpen] = React.useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleFirstClick = (name) => {
    setOpen(true);
    if(listopen === name){
      setListOpen(null);
    }
    else{
      setListOpen(name);
    }
   
    console.log(listopen)
  };
 
  
  return (
      
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Select New Investigation"}</DialogTitle>
        <DialogContent>

        <Tabs
       value={value}
       onChange={handleChange}
        indicatorColor="secondary"
        textColor="primary"
        variant="scrollable"
      >
        {investigationList.map((item) =>
                <Tab label={item.display} style={{backgroundColor:'#0096FF',color:'white'}}/>
          )}
      </Tabs>



        {investigationList.map((answer,key) =>
          <TabPanel value={value} index={key}>
          <BillingSubConcept answers={answer.answers} orderDtl ={orderDtl} servicdetailsVal={servicdetailsVal} addNewInvestigation={addNewInvestigation}/>
          </TabPanel>
      )}
            
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>handleNewInvestigationClose('add')} color="primary" value="add">
            Add
          </Button>
          <Button onClick={() =>handleClose()} color="primary" autoFocus value="cancel">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  );
}
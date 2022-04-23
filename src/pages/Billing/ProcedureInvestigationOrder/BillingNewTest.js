import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import {
  Checkbox,
  makeStyles,
}from "@material-ui/core";

import { GridContainer , GridItem} from '../../../components';

  const useStyles = makeStyles({
    test: {
      padding:20
    },
  }); 
  

function BillingNewTest(props) {
  const classes = useStyles();
  const answers = props.answers;
  const investiList = props.servicdetailsVal;
  const selectedList = [];
  for(var i =0;i<=investiList.length-1;i++){
    if(!selectedList.includes(investiList[i].serviceConUuid)){
      selectedList.push(investiList[i].serviceConUuid)
    }
  }
  console.log(selectedList)
    return (
   
        <>
              
              {answers.map((item,key) =>
                
                <Button size="medium" variant="outlined" style={{color:selectedList.includes(item.uuid)? "green":"blue"}} color="primary"  onClick={(e) =>props.addNewInvestigation(e,item.uuid)}>{item.display}</Button>  
                
                )}
           
                         
           
            
            
            </>
    )
}

export default BillingNewTest

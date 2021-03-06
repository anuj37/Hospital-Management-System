import { Grid, Icon, InputAdornment, LinearProgress, makeStyles, Paper, TextField } from '@material-ui/core'
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllVisitsAction } from '../../../actions/visitsAction'
import Location from "./LocationComponent";
import { PatientListContext } from '../Contexts/PatientListContext'
import { LocationContext } from '../Contexts/LocationContext';
import { PatientContext } from '../Contexts/PatientContext';
import PatientComponent from './PatientComponent';
import SimplePopover from './Popover';
import { TestOrderDetails } from "../../../services/data";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    input: {
        marginLeft: theme.spacing(1),
        //flex: 1
    },

}))

function PatientList({ getAllVisitsAction, loadingVisits, visits }) {
    const { location, changeLocation } = useContext(LocationContext)
    const { selectedVisit, selectVisit } = useContext(PatientContext)
    const [patientOrderData, setPatientOrderData] = useState([]);

    //Created a state variable here because it will not be used anywhere else. 
    const [searchText, setSearchText] = useState("");
    const curDate = new Date();

    async function fetchData() {
        const response = await TestOrderDetails.TestOnlySelectDateFunc(
            
            moment(curDate).format("DD-MM-YYYY")
        );
        console.log(response);
        setPatientOrderData(response.testOrderDetails);
      }
    useEffect(() => {
        getAllVisitsAction();
        fetchData();
    }, [])

    //This effect is performed only when visits is finished loaded or when visits changes.
    useEffect(() => {
        filterPatientList({ visits, location, searchText })
    }, [visits, searchText, location])

    let {
        patientsList,
        filterPatientList
    } = useContext(PatientListContext)



    const classes = useStyles();

    const columns = [
        { field: "visit", hide: true },
        { field: "uuid", hide: true },
        { field: "locationId", hide: true },
        { field: "patientId", headerName: "PatientID", width: 125 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "gender", headerName: "Gender" , width: 150},
        { field: 'age', hederName: "Age", width: 100 },
        { field: 'location', hederName: "Location", width: 150 },
        { field: 'time', hederName: "Date Time" , width: 150 }
    ]
   patientsList = patientsList.filter(function(o1){
       console.log(o1)
        return !patientOrderData.some(function(o2){
            console.log(o2)
            return o1.id === o2.patientUuid ;  
        });
    })
    const handleSelectPatient = (selectedRow) => {
        selectVisit(selectedRow.row)
    }

    return (
        <div>
            {selectedVisit===null ?
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={9}>
                            <TextField
                                label="Search patient by name or ID"
                                id="value"
                                variant="outlined"
                                size="small"
                                margin="normal"
                                type="search"
                                className={classes.input}
                                autoFocus
                                fullWidth
                                onChange={(event) => {
                                    setSearchText(event.target.value)
                                }}
                                value={searchText}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon className="fas fa-search" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Location />
                        </Grid>
                    </Grid>
                    <DataGrid
                        columns={columns}
                        loading={loadingVisits}
                        rows={patientsList}
                        autoHeight
                        autoWidth
                        rowHeight={40}
                        headerHeight={40}
                        pageSize={10}
                        onCellClick={handleSelectPatient}
                    />
                    <SimplePopover></SimplePopover>
                </>
                :
                <PatientComponent/>

            }
        </div >
    )
}


const mapStateToProps = state => {
    
    return {
        loadingVisits: state.visits.loadingVisits,
        visits: state.visits.visits,
        selectVisit:state.selectVisit
    }
}

const mapDispatchToProps = {
    getAllVisitsAction
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
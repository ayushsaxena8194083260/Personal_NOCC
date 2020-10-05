import { connect } from 'react-redux';
import YTDAlertsHubwiseRooftop from '../../../components/HubDashboard/Pages/YTDAlertsHubwiseRooftop';

const mapStateToProps = state => {
    const response = [
        {
            "hub_id": "12",
            "name": "Hyderabad",
            "y": "2",
            "mca": "0",
            "ppd": "2",
            "cpd": "0",
            "date0": "2019-04-01",
            "year0": "2019"
        },
        {
            "hub_id": "11",
            "name": "Chennai",
            "y": "10",
            "mca": "0",
            "ppd": "9",
            "cpd": "1",
            "date0": "2019-04-01",
            "year0": "2019"
        },
        {
            "hub_id": "10",
            "name": "Calcutta & Siliguri",
            "y": "9",
            "mca": "0",
            "ppd": "9",
            "cpd": "0",
            "date0": "2019-04-01",
            "year0": "2019"
        },
        {
            "hub_id": "9",
            "name": "Bhubaneswar",
            "y": "13",
            "mca": "0",
            "ppd": "3",
            "cpd": "10",
            "date0": "2019-04-01",
            "year0": "2019"
        },
        {
            "hub_id": "8",
            "name": "Ajmer",
            "y": "13",
            "mca": "0",
            "ppd": "1",
            "cpd": "12",
            "date0": "2019-04-01",
            "year0": "2019"
        },
        {
            "hub_id": "7",
            "name": "Gandhinagar",
            "y": "9",
            "mca": "0",
            "ppd": "9",
            "cpd": "0",
            "date0": "2019-04-01",
            "year0": "2019"
        },
        {
            "hub_id": "6",
            "name": "kanpur",
            "y": "9",
            "mca": "0",
            "ppd": "2",
            "cpd": "7",
            "date0": "2019-04-10",
            "year0": "2019"
        },
        {
            "hub_id": "5",
            "name": "Delhi",
            "y": "87",
            "mca": "0",
            "ppd": "60",
            "cpd": "27",
            "date0": "2019-04-01",
            "year0": "2019"
        }
    ]

    const result = response.map((item)=>{return {...item, y: parseInt(item.y)}})
    return {
        chart: {
            height: '460px'
        },
        title: "Date from: 01/04/2019 to: 30/11/2019",
        result:result
            

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const YTDAlertsHubwiseRooftopContainer = connect(mapStateToProps, mapDispatchToProps)(YTDAlertsHubwiseRooftop);
export default YTDAlertsHubwiseRooftopContainer;
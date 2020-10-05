import {
    GET_ALL_TASK_STATISTICS,

} from '../actions/types'

const INITIAL_STATE = {
    taskStatisticsData: []
}

function taskStatisticsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_ALL_TASK_STATISTICS: {
            let dailyCountRC = 0;
            let dailyCountC = 0;
            let monthlyCountRC = 0;
            let monthlyCountC = 0;
            let bimonthlyCountRC = 0;
            let bimonthlyCountC = 0;
            let quarterlyCountCountRC = 0;
            let quarterlyCountCountC = 0;
            let halfYearlyCountRC = 0;
            let halfYearlyCountC = 0;
            let yearlyCountRC = 0;
            let yearlyCountC = 0;
            let _data = [];
            let index1 = 0;

            action.data && action.data.yearly && action.data.yearly.length > 0 && action.data.yearly.map((item, index) => {

                // const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly.filter((flt) => flt.plantName ===item.plantName)[0] : null;

                const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily:null;
                const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly : null;
                const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly : null;
                const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly: null;
                const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly : null;

                index1 = index1+1;
                _data.push( {
                    _id: index1,
                    plant_name: item.plantName,
                    requires_Completion: daily && daily.allTaskByActivity ? daily.allTaskByActivity : 19,
                    completed: daily && daily.completed ? daily.completed : 0,
                    requires_Completion1: monthly && monthly.allTaskByActivity ? monthly.allTaskByActivity : 108,
                    completed1: monthly && monthly.completed ? monthly.completed : 0,
                    requires_Completion2: bimonthly && bimonthly.allTaskByActivity ? bimonthly.allTaskByActivity : 35,
                    completed2: bimonthly && bimonthly.completed ? bimonthly.completed : 0,
                    requires_Completion3: quarterly && quarterly.allTaskByActivity ? quarterly.allTaskByActivity : 13,
                    completed3: quarterly && quarterly.completed ? quarterly.completed : 0,
                    requires_Completion4: halfYearly && halfYearly.allTaskByActivity ? halfYearly.allTaskByActivity : 32,
                    completed4: halfYearly && halfYearly.completed ? halfYearly.completed : 0,
                    requires_Completion5: item.allTaskByActivity ? item.allTaskByActivity : 84,
                    completed5: item.completed ? item.completed : 0
                }
                );
            })

            action.data && action.data.halfYearly && action.data.halfYearly.length > 0 && action.data.halfYearly.map((item, index) => {

                // const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly.filter((flt) => flt.plantName ===item.plantName)[0] : null;

                const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily:null;
                const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly : null;
                const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly : null;
                const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly: null;
                const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly : null;

                index1 = index1+1;
                _data.push( {
                    _id: index1,
                    plant_name: item.plantName,
                    requires_Completion: daily && daily.allTaskByActivity ? daily.allTaskByActivity : 19,
                    completed: daily && daily.completed ? daily.completed : 0,
                    requires_Completion1: monthly && monthly.allTaskByActivity ? monthly.allTaskByActivity : 108,
                    completed1: monthly && monthly.completed ? monthly.completed : 0,
                    requires_Completion2: bimonthly && bimonthly.allTaskByActivity ? bimonthly.allTaskByActivity : 35,
                    completed2: bimonthly && bimonthly.completed ? bimonthly.completed : 0,
                    requires_Completion3: quarterly && quarterly.allTaskByActivity ? quarterly.allTaskByActivity : 13,
                    completed3: quarterly && quarterly.completed ? quarterly.completed : 0,
                    requires_Completion4: halfYearly && halfYearly.allTaskByActivity ? halfYearly.allTaskByActivity : 32,
                    completed4: halfYearly && halfYearly.completed ? halfYearly.completed : 0,
                    requires_Completion5: item.allTaskByActivity ? item.allTaskByActivity : 84,
                    completed5: item.completed ? item.completed : 0
                }
                );
            })

            action.data && action.data.quarterly && action.data.quarterly.length > 0 && action.data.quarterly.map((item, index) => {

                // const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly.filter((flt) => flt.plantName ===item.plantName)[0] : null;

                const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily:null;
                const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly : null;
                const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly : null;
                const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly: null;
                const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly : null;

                index1 = index1+1;
                _data.push( {
                    _id: index1,
                    plant_name: item.plantName,
                    requires_Completion: daily && daily.allTaskByActivity ? daily.allTaskByActivity : 19,
                    completed: daily && daily.completed ? daily.completed : 0,
                    requires_Completion1: monthly && monthly.allTaskByActivity ? monthly.allTaskByActivity : 108,
                    completed1: monthly && monthly.completed ? monthly.completed : 0,
                    requires_Completion2: bimonthly && bimonthly.allTaskByActivity ? bimonthly.allTaskByActivity : 35,
                    completed2: bimonthly && bimonthly.completed ? bimonthly.completed : 0,
                    requires_Completion3: quarterly && quarterly.allTaskByActivity ? quarterly.allTaskByActivity : 13,
                    completed3: quarterly && quarterly.completed ? quarterly.completed : 0,
                    requires_Completion4: halfYearly && halfYearly.allTaskByActivity ? halfYearly.allTaskByActivity : 32,
                    completed4: halfYearly && halfYearly.completed ? halfYearly.completed : 0,
                    requires_Completion5: item.allTaskByActivity ? item.allTaskByActivity : 84,
                    completed5: item.completed ? item.completed : 0
                }
                );
            })

            action.data && action.data.bimonthly && action.data.bimonthly.length > 0 && action.data.bimonthly.map((item, index) => {

                // const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly.filter((flt) => flt.plantName ===item.plantName)[0] : null;

                const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily:null;
                const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly : null;
                const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly : null;
                const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly: null;
                const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly : null;

                index1 = index1+1;
                _data.push( {
                    _id: index1,
                    plant_name: item.plantName,
                    requires_Completion: daily && daily.allTaskByActivity ? daily.allTaskByActivity : 19,
                    completed: daily && daily.completed ? daily.completed : 0,
                    requires_Completion1: monthly && monthly.allTaskByActivity ? monthly.allTaskByActivity : 108,
                    completed1: monthly && monthly.completed ? monthly.completed : 0,
                    requires_Completion2: bimonthly && bimonthly.allTaskByActivity ? bimonthly.allTaskByActivity : 35,
                    completed2: bimonthly && bimonthly.completed ? bimonthly.completed : 0,
                    requires_Completion3: quarterly && quarterly.allTaskByActivity ? quarterly.allTaskByActivity : 13,
                    completed3: quarterly && quarterly.completed ? quarterly.completed : 0,
                    requires_Completion4: halfYearly && halfYearly.allTaskByActivity ? halfYearly.allTaskByActivity : 32,
                    completed4: halfYearly && halfYearly.completed ? halfYearly.completed : 0,
                    requires_Completion5: item.allTaskByActivity ? item.allTaskByActivity : 84,
                    completed5: item.completed ? item.completed : 0
                }
                );
            })

            action.data && action.data.monthly && action.data.monthly.length > 0 && action.data.monthly.map((item, index) => {

                // const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly.filter((flt) => flt.plantName ===item.plantName)[0] : null;

                const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily:null;
                const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly : null;
                const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly : null;
                const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly: null;
                const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly : null;

                index1 = index1+1;
                _data.push( {
                    _id: index1,
                    plant_name: item.plantName,
                    requires_Completion: daily && daily.allTaskByActivity ? daily.allTaskByActivity : 19,
                    completed: daily && daily.completed ? daily.completed : 0,
                    requires_Completion1: monthly && monthly.allTaskByActivity ? monthly.allTaskByActivity : 108,
                    completed1: monthly && monthly.completed ? monthly.completed : 0,
                    requires_Completion2: bimonthly && bimonthly.allTaskByActivity ? bimonthly.allTaskByActivity : 35,
                    completed2: bimonthly && bimonthly.completed ? bimonthly.completed : 0,
                    requires_Completion3: quarterly && quarterly.allTaskByActivity ? quarterly.allTaskByActivity : 13,
                    completed3: quarterly && quarterly.completed ? quarterly.completed : 0,
                    requires_Completion4: halfYearly && halfYearly.allTaskByActivity ? halfYearly.allTaskByActivity : 32,
                    completed4: halfYearly && halfYearly.completed ? halfYearly.completed : 0,
                    requires_Completion5: item.allTaskByActivity ? item.allTaskByActivity : 84,
                    completed5: item.completed ? item.completed : 0
                }
                );
            })

            action.data && action.data.daily && action.data.daily.length > 0 && action.data.daily.map((item, index) => {

                // const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly.filter((flt) => flt.plantName ===item.plantName)[0] : null;
                // const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly.filter((flt) => flt.plantName ===item.plantName)[0] : null;

                const daily = action.data.daily && action.data.daily.length > 0 ? action.data.daily:null;
                const monthly = action.data.monthly && action.data.monthly.length > 0 ? action.data.monthly : null;
                const bimonthly = action.data.bimonthly && action.data.bimonthly.length > 0 ? action.data.bimonthly : null;
                const quarterly = action.data.quarterly && action.data.quarterly.length > 0 ? action.data.quarterly: null;
                const halfYearly = action.data.halfYearly && action.data.halfYearly.length > 0 ? action.data.halfYearly : null;

                index1 = index1+1;
                _data.push( {
                    _id: index1,
                    plant_name: item.plantName,
                    requires_Completion: daily && daily.allTaskByActivity ? daily.allTaskByActivity : 19,
                    completed: daily && daily.completed ? daily.completed : 0,
                    requires_Completion1: monthly && monthly.allTaskByActivity ? monthly.allTaskByActivity : 108,
                    completed1: monthly && monthly.completed ? monthly.completed : 0,
                    requires_Completion2: bimonthly && bimonthly.allTaskByActivity ? bimonthly.allTaskByActivity : 35,
                    completed2: bimonthly && bimonthly.completed ? bimonthly.completed : 0,
                    requires_Completion3: quarterly && quarterly.allTaskByActivity ? quarterly.allTaskByActivity : 13,
                    completed3: quarterly && quarterly.completed ? quarterly.completed : 0,
                    requires_Completion4: halfYearly && halfYearly.allTaskByActivity ? halfYearly.allTaskByActivity : 32,
                    completed4: halfYearly && halfYearly.completed ? halfYearly.completed : 0,
                    requires_Completion5: item.allTaskByActivity ? item.allTaskByActivity : 84,
                    completed5: item.completed ? item.completed : 0
                }
                );
            })

            _data.forEach(element => {
                dailyCountRC += parseInt(element.requires_Completion);
                dailyCountC += parseInt(element.completed);
                monthlyCountRC += parseInt(element.requires_Completion1);
                monthlyCountC += parseInt(element.completed1);
                bimonthlyCountRC += parseInt(element.requires_Completion2);
                bimonthlyCountC += parseInt(element.completed2);
                quarterlyCountCountRC += parseInt(element.requires_Completion3);
                quarterlyCountCountC += parseInt(element.completed3);
                halfYearlyCountRC += parseInt(element.requires_Completion4);
                halfYearlyCountC += parseInt(element.completed4);
                yearlyCountRC += parseInt(element.requires_Completion5);
                yearlyCountC += parseInt(element.completed5);
            });
            _data.unshift({
                _id: null,
                plant_name: "Total",
                requires_Completion: dailyCountRC,
                completed: dailyCountC,
                requires_Completion1: monthlyCountRC,
                completed1: monthlyCountC,
                requires_Completion2: bimonthlyCountRC,
                completed2: bimonthlyCountC,
                requires_Completion3: quarterlyCountCountRC,
                completed3: quarterlyCountCountC,
                requires_Completion4: halfYearlyCountRC,
                completed4: halfYearlyCountC,
                requires_Completion5: yearlyCountRC,
                completed5: yearlyCountC
            })
            let newState = { ...state };
            newState.taskStatisticsData = _data;
            return newState;
        }

        default:
            return state;
    }
}
export { taskStatisticsReducer as default, INITIAL_STATE }
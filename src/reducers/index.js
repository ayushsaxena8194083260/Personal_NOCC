import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import plants from './plantReducer';
import vendors from './vendorReducer';
import projectTypes from './plantFaultDataReducer';
import plantFault from './plantFaultDataReducer';
import gridFailureReducer from './gridFailureReducer';
import plantFaultDataReducer from './PlantAvailabilityReducer';
import PlantAvailabilityReducer from './PlantAvailabilityReducer';
import jmrMeterReducer from './jmrMeterReducer';
import weatherStationReducer from './weatherStationReducer';
import inverterDailyReducer from './inverterDailyReducer';
import missingInverterReducer from './missingInverterReducer';
import missingWeatherReducer from './missingWeatherReducer';
import moduleCleaningReducer from './moduleCleaningReducer';
import mcAnalysisReducer from './moduleCleaningAnalysisReducer';
import plantTilts from './plantTiltReducer';
import taskStatisticsReducer from './taskStatisticsReducer';
import WaterConsumptionReducer from './WaterConsumptionReducer';
import ExternalBudgetReducer from './ExternalBudgetReducer';
import PenaltyReducer from './PenaltyReducer';
import PerformanceAnalysisReducer from './PerformanceAnalysisReducer';
import AMRMeterReducer from './AMRMeterReducer';
import plantTiltSchedule from './plantTiltScheduleReducer';
import AOPBudgetDetails from './AOPBudgetDetailsReducer';
import allLenderDetails from './lendorDetailsReducer';
import stringMonitoring from './stringMonitoringReducer';
import allSMU from "./SMUReducer";
import allStringsBySMUId from "./stringsReducer";
import DashboardReducer from "./DashboardReducer";
import pmTasksByActivityId from "./PMReducers";
import pmUserStatus from "./PMReducers";
import pmRemarkStatus from "./PMReducers";
import PenaltyColorReducer from "./PenaltyColorReducer";
import SettingsReducer from "./SettingsReducer";
import pmTaskGroup from "./PMReducers";
import plantTiltsByPlantIDDate from "./plantTiltReducer";
import allTiltScheduleByDatePlantId from "./plantTiltScheduleReducer";
import allLenderDetailsByYearPlantIds from "./lendorDetailsReducer";
import lenderDetailsByYearPlantIdMonth from "./lendorDetailsReducer";
import plantDailyGenerationReducer from "./PlantGenerationReducer";
import azureLossReducer from "./azureLossReducer";
import perfLossByPlantIdsDate from "./performanceLossReducer";
import plantHistByID from './plantHistoryReducer';
import plantHistoryDetailsHdr from './plantHistoryReducer';
import plantHistoryDetails from './plantHistoryReducer';
import ChartsReducer from './ChartsReducer';
import FieldUserReportReducers from './FieldUserReportReducers';
import PrRequestReducer from './PrRequestReducer';
import ReportReducers from './ReportReducers';
import ForecastReducers from './ForecastReducers';
import AnalyticsReducer from './analyticsReducer';
import PerformanceAnalysisReducers from './performanceAnalysisReducers';
import  diagnosisReducer from './diagnosisReducer';
import emailTemplate from './EmailTemplateReducer';

export default combineReducers({
	plants: plants,
	vendors:vendors,
	projectTypes:projectTypes,
	plantFault:plantFault,
	plantFaultDataReducer: plantFaultDataReducer,
	gridFailureReducer: gridFailureReducer,
	PlantAvailabilityReducer:PlantAvailabilityReducer,
	jmrMeterReducer: jmrMeterReducer,
	weatherStationReducer: weatherStationReducer,
	moduleCleaningReducer:moduleCleaningReducer,
	mcAnalysisReducer:mcAnalysisReducer,
	plantTilts : plantTilts,
	inverterDailyReducer: inverterDailyReducer,
	missingInverterReducer:missingInverterReducer,
	missingWeatherReducer:missingWeatherReducer,
	taskStatisticsReducer: taskStatisticsReducer,
	WaterConsumptionReducer: WaterConsumptionReducer,
	ExternalBudgetReducer:ExternalBudgetReducer,
	AMRMeterReducer: AMRMeterReducer,
	PenaltyReducer:PenaltyReducer,
	PerformanceAnalysisReducer:PerformanceAnalysisReducer,
	plantTiltSchedule : plantTiltSchedule,
	AOPBudgetDetails : AOPBudgetDetails,
	stringMonitoring : stringMonitoring,
	allSMU : allSMU,
	allStringsBySMUId : allStringsBySMUId,
	DashboardReducer:DashboardReducer,
	allLenderDetails : allLenderDetails,
	pmTasksByActivityId : pmTasksByActivityId,
	pmUserStatus : pmUserStatus,
	pmRemarkStatus : pmRemarkStatus,
	pmTaskGroup : pmTaskGroup,
	penaltyColorReducer: PenaltyColorReducer,
	SettingsReducer:SettingsReducer,
	plantTiltsByPlantIDDate:plantTiltsByPlantIDDate,
	allTiltScheduleByDatePlantId:allTiltScheduleByDatePlantId,
	allLenderDetailsByYearPlantIds: allLenderDetailsByYearPlantIds,
	lenderDetailsByYearPlantIdMonth : lenderDetailsByYearPlantIdMonth,
	plantDailyGenerationReducer:plantDailyGenerationReducer,
	azureLossReducer: azureLossReducer,
	perfLossByPlantIdsDate : perfLossByPlantIdsDate,
	plantHistByID : plantHistByID,
	plantHistoryDetailsHdr : plantHistoryDetailsHdr,
	plantHistoryDetails : plantHistoryDetails,
	ChartsReducer:ChartsReducer,
	FieldUserReportReducers:FieldUserReportReducers,
	PrRequestReducer:PrRequestReducer,
	ReportReducers:ReportReducers,
	ForecastReducers:ForecastReducers,
	analyticsReducer:AnalyticsReducer,
	loginReducer:loginReducer,
	PerformanceAnalysisReducers:PerformanceAnalysisReducers,
	diagnosisReducer:diagnosisReducer,
	emailTemplate : emailTemplate
});

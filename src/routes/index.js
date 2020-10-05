/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line jsx-a11y/href-no-hash
import addPlantComponent from "../components/plant/addPlant";
import PlantComponent from "../components/plant/plant";
//import PlantFaultData from "../components/plant/plantFaultData";
import PlantFaultDataContainer from "../containers/PlantFaultDataContainer";
import GridFailure from "../components/GridFailure/gridFailure";
import GridFailureAddEdit from "../components/GridFailure/gridFailureAddEdit";
import PlantFaultDataAddEditContainer from "../containers/PlantFaultDataAddEditContainer";
import VendorComponent from "../components/vendor";
import AddEditJmrComponent from "../components/plant/addEditJmrMeter";
import ModuleCleaningAddEditContainer from "../containers/ModuleCleaningAddEditContainer";
import ModuleCleaningAnalysis from "../components/moduleCleaningAnalysis/moduleCleaningAnalysis";
import React from "react";
import _ from "lodash";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Graph from "../components/dashboard/Pages/graph";

const Routes = () => (
  <Router>
    <div>
      {/* <Route exact path="/" component={Login} />
      <Route
        exact
        path="/server-configuration"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin'])(ServerConfig)
        }
      />
     
      <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
        <Route path='/createInvoice/:id' component={CreateInvoice} /> */}
      <Route
        exact
        path="/addPlant"
         component={PlantFaultDataContainer}
      />
      <Route
        exact
        path="/plantFaultData"
         component={PlantFaultDataContainer}
      />
      <Route
        exact
        path="/GridFailure"
         component={GridFailure}
      />
      <Route
        exact
        path="/GridFailureAddEdit"
         component={GridFailureAddEdit}
      />
      <Route
        exact
        path="/AddEditJmrComponent"
        component={AddEditJmrComponent}
      />
      <Route
        exactpath="/plantFaultDataAddEdit"
        component={PlantFaultDataAddEditContainer}
      >
      <Route
      exactpath="/moduleCleaningAddEdit"
      component={ModuleCleaningAddEditContainer}
      />
      <Route
        exactpath="/ModuleCleaningAnalysis"
        component={ModuleCleaningAnalysisContainer}
      >
      <Route
        exact
        path="/Plant"
         component={PlantComponent}
      />
      <Route
        exact
        path="/Vendor"
         component={VendorComponent}
      />
            <Route path='/graph' component={Graph} />

      <Route path='/vendorAddEdit/:id' component={Edit} />
      {/* <Route
        exact
        path="/create-admin"
        component={CreateAdmin}
      /> */}
      </Route>
      </Route>
    </div>
  </Router>
);
export default Routes;

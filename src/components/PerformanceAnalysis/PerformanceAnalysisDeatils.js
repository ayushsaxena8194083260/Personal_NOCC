import React, { Component } from 'react';
import '../../styles/plant/plantFaultData.scss';
// import { getPerformanceLossesByPlantIdsDate } from '../../../../../actions/action-Settings';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

class PerformanceAnalysisDeatils extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            toDate: this.props._toDate,
            selectedPlantOptions: this.props.selectedPlantOptions,
            performanceAnalysis: this.props.performanceAnalysisData
        }
        console.log(this.props.performanceAnalysisData)
    }

    number_format(number, decimals, dec_point, thousands_sep) {
        // Strip all characters but numerical ones.
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                performanceAnalysis: nextProps.performanceAnalysisData,

            })

            for (var i = 0; i < nextProps.performanceAnalysisData; i++) {

            }
        }
    }


    render() {
        return (
            <div style={{ overflowX: "auto" }}>
                <table className="plantList2" id="t-list" style={{ fontSize: "96%", backgroundColor: "#C6E0B4" }}>
                    <tbody>
                        <tr>
                            <td colSpan="8" data-a-h="center"
                                data-a-v="middle">
                                <b>Plant Name: </b>{this.state.selectedPlantOptions['name']} Tariff (INR ₹{this.state.performanceAnalysis.Tariff}) <b>{this.props.toDate}</b>
                            </td>
                        </tr>
                        <tr>
                            <td width="9%" style={{ textAlign: 'center' }}>Actual PLF is</td>
                            <td width="4%"><b>{this.number_format(this.state.performanceAnalysis.v_module_plf, 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}>against Model Adjusted PLF of</td>
                            <td className="color1" colSpan="3" align="center" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.v_again_model_plf, 2)}%</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>against Finance Budget PLF of</td>
                            <td className="color3" width="4%" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.v_budget_plf, 2)}%</b></td>
                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation from Model PLF is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.devMgenplf - this.state.performanceAnalysis.baux, 0, ".", ",")}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.devMplf * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.devMgenRevplf, 0, ".", "")}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation from Budget PLF is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.devBplf + this.state.performanceAnalysis.baux), 0)}<sub>(KWh)</sub></b></td>
                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Insolation Loss is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b></b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Insolation Loss is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.devInsolation)}<sub>(KWh)</sub></b></td>
                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Technical Loss is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.techLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.techLoss1), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.techLoss2)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Technical Loss is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.techLoss)}<sub>(KWh)</sub></b></td>
                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of  Grid Outage Loss is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.gridOutageLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.gfailure * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.gridOutageLoss1)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of  Grid Outage Loss is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.bgfailure)}<sub>(KWh)</sub></b></td>
                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Soiling Loss is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.soilingLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.soil * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.soilingLoss1)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Soiling Loss is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.bsoil)}<sub>(KWh)</sub></b></td>
                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Tilt Loss is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.tiltLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.tilt * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.tilt1)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Tilt Loss is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.btilt)}<sub>(KWh)</sub></b></td>

                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Commissioning or JMR is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.commissioningLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.commission * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.commissioningLoss1)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Commissioning or JMR is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.bcommission)}<sub>(KWh)</sub></b></td>

                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of DC Cable Loss is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.dcCableLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.dc * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.dc1)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of DC Cable Loss is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.bdc)}<sub>(KWh)</sub></b></td>

                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of AC Cable Loss is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.acCableLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.ac * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.ac1)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of AC Cable Loss is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.bac)}<sub>(KWh)</sub></b></td>

                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Inverter Efficiency is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.efficiencyLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.invEffzncy * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.invEffzncy1)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Inverter Efficiency is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.binvEffzncy)}<sub>(KWh)</sub></b></td>

                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Auxilary Loss is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.auxiluryLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.aux * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.aux1)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Auxilary Loss is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.baux)}<sub>(KWh)</sub></b></td>

                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Transmission Loss is</td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.transmissionLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format((this.state.performanceAnalysis.transmission * 100), 2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.transmission1)}</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Generation Deviation on account of Transmission Loss is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.btransmission)}<sub>(KWh)</sub></b></td>


                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Total Deviation in Model Losses are</td>

                            {/* <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.modgenSum)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{(this.state.performanceAnalysis.moduleSum1).toFixed(2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.modrevSum)}</b></td> */}
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.techLoss + this.state.performanceAnalysis.gridOutageLoss + this.state.performanceAnalysis.soilingLoss + this.state.performanceAnalysis.tiltLoss + this.state.performanceAnalysis.commissioningLoss + this.state.performanceAnalysis.dcCableLoss + this.state.performanceAnalysis.acCableLoss + this.state.performanceAnalysis.efficiencyLoss + this.state.performanceAnalysis.auxiluryLoss + this.state.performanceAnalysis.transmissionLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{((this.state.performanceAnalysis.techLoss + this.state.performanceAnalysis.gridOutageLoss + this.state.performanceAnalysis.soilingLoss + this.state.performanceAnalysis.tiltLoss + this.state.performanceAnalysis.commissioningLoss + this.state.performanceAnalysis.dcCableLoss + this.state.performanceAnalysis.acCableLoss + this.state.performanceAnalysis.efficiencyLoss + this.state.performanceAnalysis.auxiluryLoss + this.state.performanceAnalysis.transmissionLoss) * 100, 2).toFixed(2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.techLoss2 + this.state.performanceAnalysis.gridOutageLoss1 + this.state.performanceAnalysis.soilingLoss1 + this.state.performanceAnalysis.tilt1 + this.state.performanceAnalysis.commissioningLoss1 + this.state.performanceAnalysis.dc1 + this.state.performanceAnalysis.ac1 + this.state.performanceAnalysis.invEffzncy1 + this.state.performanceAnalysis.aux1 + this.state.performanceAnalysis.transmission)}</b></td>

                            {/* <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.state.performanceAnalysis.techLoss+this.state.performanceAnalysis.soilingLoss+this.state.performanceAnalysis.dcCableLoss+this.state.performanceAnalysis.acCableLoss+this.state.performanceAnalysis.efficiencyLoss+this.state.performanceAnalysis.auxiluryLoss}<sub>(KWh)</sub></b></td> */}
                            {/* <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.state.performanceAnalysis.moduleSum1}%</b></td> */}
                            {/* <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.modrevSum)}</b></td> */}

                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Total Deviation in Budget Losses are</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.budgetSum)}<sub>(KWh)</sub></b></td>

                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Unforeseen Losses (Actual - Model) is</td>

                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.devMgenplf - this.state.performanceAnalysis.baux - this.state.performanceAnalysis.techLoss - this.state.performanceAnalysis.gridOutageLoss - this.state.performanceAnalysis.soilingLoss - this.state.performanceAnalysis.tiltLoss - this.state.performanceAnalysis.commissioningLoss - this.state.performanceAnalysis.dcCableLoss - this.state.performanceAnalysis.acCableLoss - this.state.performanceAnalysis.efficiencyLoss - this.state.performanceAnalysis.auxiluryLoss - this.state.performanceAnalysis.transmissionLoss)}<sub>(KWh)</sub></b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{((this.state.performanceAnalysis.devMplf - this.state.performanceAnalysis.techLoss1 - this.state.performanceAnalysis.gfailure - this.state.performanceAnalysis.soil - this.state.performanceAnalysis.tilt - this.state.performanceAnalysis.commission - this.state.performanceAnalysis.dc - this.state.performanceAnalysis.ac - this.state.performanceAnalysis.invEffzncy - this.state.performanceAnalysis.aux - this.state.performanceAnalysis.transmission) * 100, 2).toFixed(2)}%</b></td>
                            <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.devMgenRevplf - this.state.performanceAnalysis.techLoss2 - this.state.performanceAnalysis.gridOutageLoss1 - this.state.performanceAnalysis.soilingLoss1 - this.state.performanceAnalysis.tilt1 - this.state.performanceAnalysis.commissioningLoss1 - this.state.performanceAnalysis.dc1 - this.state.performanceAnalysis.ac1 - this.state.performanceAnalysis.invEffzncy1 - this.state.performanceAnalysis.aux1 - this.state.performanceAnalysis.transmission)}</b></td>

                            {/* <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.unforeseenLoss,2)}<sub>(KWh)</sub></b></td> */}
                            {/* <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.number_format(this.state.performanceAnalysis.devUFBudget)}%</b></td> */}
                            {/* <td className="color1" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>₹ {this.number_format(this.state.performanceAnalysis.unforeseenLoss2)}</b></td> */}

                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Unforeseen Losses (Actual - Budget) is</td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{(this.state.performanceAnalysis.unforeseenLoss3).toFixed(2)}%</b></td>

                        </tr>
                        <tr>
                            <td width="7%"></td>
                            <td className="color1" colSpan="2" style={{ backgroundColor: "rgb(198, 224, 180)" }}>Performance Ratio (PR)</td>
                            <td className="color1" colSpan="3" align="center" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b>{this.state.performanceAnalysis.module_pr}%</b></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}></td>
                            <td className="color3" style={{ backgroundColor: "rgb(198, 224, 180)" }}><b></b></td>

                        </tr>
                    </tbody>
                </table>
            </div >

        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        // plantsByType: state.plants.plantsByType,
        // plantTypes: state.projectTypes.plantTypes,
        // plants: state.plants.plants,
        // plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        // data: state.SettingsReducer.data,
        // displayMessage: state.SettingsReducer.displayMessage,
        //performanceAnalysis: state.SettingsReducer.performanceAnalysis,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        // clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        // deleteInverter: (id) => dispatch(deleteInverter(id))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformanceAnalysisDeatils));

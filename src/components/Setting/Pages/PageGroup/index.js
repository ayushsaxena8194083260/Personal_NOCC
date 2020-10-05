
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { getPageGroupSettings, createOrUpdatePageGroup } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react"

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component { 
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }
    render() {
        return (<div className="products-actions">           
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/addEditPageGroup/"+this.props.data.id,
                    pageGroupData: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
        </div>);
    }
}

class PageGroupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageGroup: []
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getPageGroupSettings();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ pageGroup: nextProps.pageGroup });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Page Tile", field: "pageGroupName", cellClass: 'cell-wrap',
                autoHeight: true, width: 1000, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }

    render() {
        return (
            <div
                style={{
                    height: '500px',
                    maxWidth: "1222px",
                    margin: "auto"
                }}
                className="ag-theme-material">
                <AgGridReact
                    key="grid"
                    columnDefs={this.createColumnDefs()}
                    rowData={this.state.pageGroup}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>                   

                </AgGridReact></div>
        )
    }
}
const mapStateToProps = state => {
    return {
        pageGroup: state.SettingsReducer.pageGroup,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPageGroupSettings: () => dispatch(getPageGroupSettings()),
        createOrUpdatePageGroup: (pageGroup) => dispatch(createOrUpdatePageGroup(pageGroup))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageGroupComponent));


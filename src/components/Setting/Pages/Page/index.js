import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
// import { getPagesSettings } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { AgGridReact } from "ag-grid-react";
import ModelPopUp from '../../../Common/ModelPopUp';
import { renderPageDetails } from '../../../../actions/action-Settings';

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
                    pathname: "/setting/addEditPage/" + this.props.data.id,
                    pageDetails: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class ShowPageComponent extends Component {
    constructor(props) {
        super(props);
        const { match: { params } } = this.props;
        const { name } = params;
        this.state = {
            pages: [],
            pageID: this.props.pageID,
            showPopUp: false,
            deleteID: null,

        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.renderPageDetails(this.state.pageID);
    }

    componentWillReceiveProps(nextProps) {
        // const { match: { params } } = this.props;
        // const { id } = params;

        this.setState({ pages: nextProps.pages, pageID: nextProps.pageID });
        if (this.props.pageID !== nextProps.pageID) {
            this.props.renderPageDetails(nextProps.pageID);
        }
    }

    createColumnDefs() {
        return [
            {                
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true,  cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Page Tile", field: "pageName", cellClass: 'cell-wrap',
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
    onDelete(_id) {
        this.setState({ deleteModalShow: true, deleteID: _id });

    }

    onHide() {
        this.setState({ deleteModalShow: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteFTPMappings(this.state.deleteID);
            this.onHide();
        }
    }
    
    render() {
        return (
            <div>
                <div
                    style={{
                        height: '500px',
                        maxWidth: "1222px",
                        margin: "auto"
                    }}
                    className="ag-theme-material">
                    {/* <h1>{this.state.pageName}</h1> */}
                    <AgGridReact
                        key="grid"
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.pages}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>

                    </AgGridReact></div>
                    <ModelPopUp title="Delete"
                            id={"WeatherConfigurationDelete"}
                            bodyContent="Are you sure want to delete this Page?"
                            showPopUp={this.state.deleteModalShow}
                            secondaryBtnName="No"
                            onSecondaryAction={this.onHide.bind(this)}
                            primaryBtnName="Delete"
                            onPrimaryAction={this.deleteRecord.bind(this)}
                        />            </div>

        )
    }
}
const mapStateToProps = (state, props) => {
    const { match: { params } } = props;
    const { id } = params;
    return {
        pages: state.SettingsReducer.pages,
        pageID: id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderPageDetails: (pageID) => dispatch(renderPageDetails(pageID))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowPageComponent));
import React, { Component } from 'react';
// import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.props.handleChange.bind(this);
    }


    renderOptions() {
        return this.props.itemSource && this.props.itemSource.map((item) => {
            if (this.props.value === item.value) {
                return <option key={item.value} value={item.value} selected>{item.displayText}</option>
            }
            else {
                return <option key={item.value} value={item.value}>{item.displayText}</option>
            }
        })
    }

    render() {
        return (
            <div>
                <select className={this.props.className} name={this.props.Name} type="dropdown"
                    onChange={(item) => this.handleChange(item)}>
                    {this.renderOptions()}
                </select>
            </div>

        )
    }

}

export default DropDown;
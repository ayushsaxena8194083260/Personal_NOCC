import React, { Component } from 'react';
// import { Modal, Button, Row, Col, Form, } from 'react-bootstrap';

class ReportFieldset extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <section style={{width: "49%"}} id={"section"+ this.props.id}>
                <fieldset>
                    <legend className="boxShw" id={this.props.id} style={{overflow:"hidden"}}>{this.props.title}</legend>
                    {this.props.childrens}
                </fieldset>
            </section>
        )
    }
}
export default ReportFieldset;

import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
class ComponentAffected extends Component {
    constructor(props) {
        super(props);

        this.state = {
            component_affected: props.component_affected ? props.component_affected : [""],
            count: 0
        }

        this.addComponent = this.addComponent.bind();
    }

    handleOnChange(value, index) {
        let _items = this.state.component_affected;
        // if (_items && _items.length > 0) {
        //     _items.push(value);
        // }
        // else {
        //     _items = [];
        //     _items.push(value);
        // }
        _items[index] = value;


        this.setState({ component_affected: _items });
    }

    addComponent(index) {
        this.handleOnChange("", index);
    }

    removeComponent() {

    }

    renderComponents() {

        return this.state.component_affected && this.state.component_affected.length > 0 && this.state.component_affected.map((item, index) => {
            return <div>
                <Form.Control type="text" name={"component_affected" + index} value={item} onChange={val => this.handleOnChange(val, index)} />
                 <button type="button" onChange={(event) => this.addComponent(index)}>+</button>

                {(index !== 0) && <button type="button" className="remove_button" title="Remove" onChange={(event) => this.removeComponent(index)}>-</button>}
            </div>
        })


    }

    // renderInitalComponent() {
    //     return (
    //         <div>
    //             <input type="text" name="component_affected0" value={this.state.component_affected["component_affected0"]} onChange={val => this.handleOnChange(val, "component_affected0")} />
    //             <button className="add_button" title="Add field">+</button>
    //         </div>
    //     )
    // }

    // renderAddedComponent() {
    //     let _count = 0;
    //     for (_count; _count >= this.state.count; _count++) {

    //     }
    // }
    render() {
        return (
            <div>
                {/* {this.renderInitalComponent()}
                {this.renderAddedComponent()} */}
                {this.renderComponents()}
            </div>
        )
    }

}
export default ComponentAffected;
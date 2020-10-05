/* eslint-disable jsx-a11y/href-no-hash */
import React from "react";
import "../src/layout.scss";
import Header from "../src/header";
import Sidebar from "../src/sidebar";

class Layout extends React.Component {
  static propTypes = {
    //  children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div className="dashboard-page dashboardPage">
      {/* {this.props.isAuth?<> */}
        <Sidebar isAuth={this.props.isAuth}/>
        <Header isAuth={this.props.isAuth} />
        <section id={this.props.isAuth?'bodyContainer':''} className="uiView">
          {this.props.children}
        </section>
      {/* </>:<> */}
      {/* <section>
          {this.props.children}
        </section> */}
      {/* </>} */}
      </div>
    );
  }
}

export default Layout;

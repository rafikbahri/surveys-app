import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  
  isLoggedIn(){
    switch (this.props.auth) {
      case null:
          return;
      case false:
          return <li><a href="/auth/google" >Login With Google</a></li>;
      default:
        return <li><a href="/api/logout" >Logout</a></li>;
    } 
  }


  
  render() {
      return (     
        <nav>
          <div className="nav-wrapper grey darken-4">
            <Link  to={this.props.auth?"/dashboard":"/"}  className="left brand-logo">
              MySurveys
            </Link>
            <ul className="right">
                {this.isLoggedIn()}
            </ul>
          </div>
        </nav>
        );
    }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}
export default connect(mapStateToProps)(Header);
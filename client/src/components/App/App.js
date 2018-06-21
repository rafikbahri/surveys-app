import React, { Component } from 'react';
import { BrowserRouter,Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import Landing from '../Landing/Landing';
import SurveyNew from '../SurveyNew/SurveyNew';

class App extends Component {


  //We shouldn't use componentWillMount cuz in future version of React
  //componentWillMount will be called multiple times!
  //plus the difference in time with componentDidMount is near 0.
  componentDidMount(){
      this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default  connect(null,actions)(App); 

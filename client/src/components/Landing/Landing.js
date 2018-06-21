import React, { Component } from 'react';

class Landing extends Component {
    render() {
        return (
          <div className="row">
            <div className="col s12 m12">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">My Surveyyys!</span>
                    <p>Collect Freedback from your users easilly!</p>
                </div>
                <div className="card-action">
                  <a >Get some help?</a>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Landing;
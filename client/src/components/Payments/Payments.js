import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import StripeCheckout from 'react-stripe-checkout';


class Payments extends Component {
    render() {
        //To log to the console the plain javascript code generated 
        //debugger;

        return (
            <StripeCheckout
            name="Surveyy"
            description="$5 for 5 email credits"
            amount={500}
            token={token=>{
                console.log(token);
                this.props.handleToken(token);
            }}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            <button className="btn indigo darken-4" >
                Add Credits
            </button>
            </StripeCheckout>
        );
    }
}

export default connect(null,actions)(Payments);
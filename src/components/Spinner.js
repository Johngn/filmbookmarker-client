import React, { Component } from "react";
import RingLoader from "react-spinners/RingLoader";

export default class Spinner extends Component {
    render() {
        return (
            <div className="spinner-container">
                <RingLoader size={100} color={"#fff"} loading />
            </div>
        );
    }
}

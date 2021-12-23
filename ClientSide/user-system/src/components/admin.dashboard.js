import React, { Component } from "react";


export default class AdminDash extends Component{
    render(){
        return (
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                        <div className="navi">
                            <ul>
                                <li className="active"><a href="#"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm">HOME</span></a></li>
                                <li></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
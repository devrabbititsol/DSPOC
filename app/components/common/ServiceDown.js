import React from 'react';
import { Link } from 'react-router-dom';


class ServiceDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }


  }


  render() {

    return (<div className="row">
      <div className="col-md-12">
        <div className="m-t-30">
          <div className="d-flex justify-content-between">
            <div className="card-fl-item">
              <h4 className="m-b-30 header-title"></h4>
            </div>

          </div>
          <div className="noresults-wrap">
            <div className="noresult-item"><img className="img-fluid" src="/images/noresults.png" alt="" /> </div>
            <div className="noresult-item">
              <h3>ERROR_MESSAGE_SERVICE_DOWN</h3>
            </div>
          </div>
        </div>
      </div>


    </div>
    )
  }


}

export default ServiceDown

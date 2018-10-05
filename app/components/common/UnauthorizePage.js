import React from 'react';
import { Link } from 'react-router-dom';


class UnauthorizePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }


  }


  render() {

    return (<div className="container c_dtls row justify-content-md-center">
      
      <div className="col-md-8 text-center">
        <h1>401</h1>
        <h2>Unauthorized</h2>
      </div>

    </div>

    )
  }


}

export default UnauthorizePage

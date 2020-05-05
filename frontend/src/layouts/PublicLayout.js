import React, { Component } from 'react';
import EmployeHeader from '../components/EmployeHeader';
import Footer from '../components/Footer';
class PublicLayout extends Component {
  render() {
    return (
      <div>
        <EmployeHeader/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default PublicLayout;

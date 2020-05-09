import React, { Component } from 'react';
import ListingHeader from '../components/ListingHeader';
import Footer from '../components/Footer';
class PublicLayout extends Component {
  render() {
    return (
      <div>
        <ListingHeader/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default PublicLayout;

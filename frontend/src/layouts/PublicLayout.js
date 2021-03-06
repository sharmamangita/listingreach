import React, { Component } from 'react';
import ListingHeader from '../components/ListingHeader';
import Footer from '../components/Footer';
import SubscribeNewsLetterSlider from '../components/SubscribeNewsLetter'
class PublicLayout extends Component {
  render() {
    return (
      <div>
        <ListingHeader />
        {this.props.children}
        <SubscribeNewsLetterSlider />
        <Footer />
      </div>
    );
  }
}

export default PublicLayout;

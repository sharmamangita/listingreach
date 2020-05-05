import React, { Component } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

class AdminLayout extends Component {
  render() {
    return (
      <div>
      <AdminSidebar/>
      <AdminHeader/>
        {this.props.children}
      </div>
    );
  }
}

export default AdminLayout;
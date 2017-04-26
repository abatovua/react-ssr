import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends Component {
  render() {
    return (
      <AppBar
        title="EReact"
        style={{ position: 'fixed' }}
        showMenuIconButton={false}
      />
    );
  }
}


export default Header;


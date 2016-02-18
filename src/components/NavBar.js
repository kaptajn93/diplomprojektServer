import React from 'react';

import { Link } from 'react-router'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import FlatButton from 'material-ui/lib/flat-button';

const NavBar = () => (
  <Toolbar>
    <ToolbarGroup firstChild={true} float="left">
      <FlatButton label="Forside" linkButton={true} containerElement={<Link to="/" />} />
      <FlatButton label="Modul 1" linkButton={true} containerElement={<Link to="/module" />} />
    </ToolbarGroup>
  </Toolbar>
);

export default NavBar;

import * as React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { User } from '@src/types';

export interface LayoutProps {
  user?: User;
  logout: () => any;
  push: (path: string) => any;
}
type State = {
  isOpen: boolean;
};

class Layout extends React.PureComponent<LayoutProps, State> {
  constructor(props: LayoutProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  componentWillMount() {
    const { push, user } = this.props;
    if (!user) {
      push('/');
    }
  }

  render() {
    const { children, user, logout } = this.props;
    if (!user) {
      return null;
    }
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand>Heroku Compliance</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user.email} {user.isAdmin && '(Admin)'}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <div>{children}</div>
      </div>
    );
  }
}

export default (Layout as any) as React.SFC<LayoutProps>;


import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = this.props.title;
    }

    render() {
      return (
        <header></header>
      );
    }
}

Header.defaultProps = {
    title: 'Home'
};

Header.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default Header;


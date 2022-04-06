import React from 'react';
import { shallow, render, mount } from 'enzyme';
import countries from './countries';

describe('countries', () => {
  let props;
  let shallowcountries;
  let renderedcountries;
  let mountedcountries;

  const shallowTestComponent = () => {
    if (!shallowcountries) {
      shallowcountries = shallow(<countries {...props} />);
    }
    return shallowcountries;
  };

  const renderTestComponent = () => {
    if (!renderedcountries) {
      renderedcountries = render(<countries {...props} />);
    }
    return renderedcountries;
  };

  const mountTestComponent = () => {
    if (!mountedcountries) {
      mountedcountries = mount(<countries {...props} />);
    }
    return mountedcountries;
  };  

  beforeEach(() => {
    props = {};
    shallowcountries = undefined;
    renderedcountries = undefined;
    mountedcountries = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});

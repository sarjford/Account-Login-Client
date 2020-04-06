import React from 'react';
import ReactDOM from 'react-dom';
import { render } from './enzyme';

import App from './App';

describe('App component', () => {

  it('renders div containing routes', () => {
    const wrapper = render(<App />);
    expect(wrapper.find('.app')).toBeDefined();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../index';

const url = {
  pathname: '/',
  query: {},
  back: jest.fn(),
  push: jest.fn(),
  pushTo: jest.fn(),
  replace: jest.fn(),
  replaceTo: jest.fn(),
};
const app = mount((
  <App
    stars={1999}
    url={url}
    info={{
      message: '127.0.0.1',
      type: 'IP'
    }}
    ip="127.0.0.1"
  />
));

describe('Index With Enzyme', () => {
  it('Have text "127.0.0.1"', () => {
    expect(app.html()).toContain('127.0.0.1');
  });

  it('Have one dom <nav>', () => {
    expect(app.find('nav')).toHaveLength(1);
  });
});

describe('Index Snapshot Testing', () => {
  it('Index Dom', () => {
    const component = renderer.create((
      <App
        stars={1999}
        url={url}
        info={{
          message: '127.0.0.1',
          type: 'IP'
        }}
        ip="127.0.0.1"
      />
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

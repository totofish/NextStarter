import { shallow, mount, render } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import App from '../pages/index'
import Layout from '../components/layout';

describe('Index With Enzyme', () => {
  const app = mount(<App />)
  it('Have text "== Index =="', () => {
    expect(app.html()).toContain('== Index ==');
  })

  it('Have one dom <nav>', () => {
    expect(app.find('nav')).toHaveLength(1);
  })
})

describe('Index Snapshot Testing', () => {
  it('Index Dom', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
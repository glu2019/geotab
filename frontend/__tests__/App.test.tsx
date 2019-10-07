import * as React from 'react'
import { mount, shallow, ShallowWrapper } from 'enzyme'
import { create, ReactTestRenderer } from 'react-test-renderer'
import App, { AppProps } from '../src/component/App'
import { withStore, axiosMock } from './test-utils'

let wrapper: ShallowWrapper<AppProps>
let snapshot: ReactTestRenderer

const apiRegex = /\/sudoku\/board/
const sudokuRes = [
  2,
  1,
  7,
  4,
  3,
  6,
  8,
  9,
  5,
  6,
  8,
  5,
  9,
  1,
  2,
  7,
  3,
  4,
  3,
  4,
  9,
  5,
  7,
  8,
  1,
  2,
  6,
  4,
  6,
  1,
  8,
  9,
  3,
  2,
  5,
  7,
  9,
  7,
  8,
  1,
  2,
  5,
  6,
  4,
  3,
  5,
  2,
  3,
  6,
  4,
  7,
  9,
  1,
  8,
  7,
  5,
  2,
  3,
  6,
  9,
  4,
  8,
  1,
  8,
  9,
  4,
  7,
  5,
  1,
  3,
  6,
  2,
  1,
  3,
  6,
  2,
  8,
  4,
  5,
  7,
  9,
]

beforeEach(() => {
  const app = <App />

  wrapper = shallow(withStore(app))
  snapshot = create(withStore(app))
})

beforeAll(() => {
  axiosMock.onGet(apiRegex).reply(async () => await [200, sudokuRes])
  axiosMock.onPost(apiRegex).reply(async () => await [200, sudokuRes])
})

afterAll(() => {
  axiosMock.onGet(apiRegex).passThrough()
  axiosMock.onPost(apiRegex).passThrough()
})

describe('<App />', () => {
  test('it matches the snapshot', () => {
    expect(snapshot).toMatchSnapshot()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.cell')).not.toBeNull()
  })

  it('render board', () => {
    const mountWrapper = mount(withStore(<App />))
    expect(mountWrapper).toMatchSnapshot()
    mountWrapper
      .find('.cell')
      .at(0)
      .simulate('click')
    mountWrapper
      .find('.cell')
      .at(1)
      .simulate('click')
    expect(mountWrapper.find('.fix').length).toBe(2)
    mountWrapper
      .find('button')
      .at(0)
      .simulate('click')
    mountWrapper
      .find('.cell')
      .at(0)
      .simulate('click')
    expect(mountWrapper.find('.fix').length).toBe(1)
    mountWrapper
      .find('button')
      .at(1)
      .simulate('click')
    mountWrapper
      .find('button')
      .at(0)
      .simulate('click')
    expect(mountWrapper.find('.fix').length).toBe(0)
  })
})

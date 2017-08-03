import homeActions from './home.actions'
import { expect } from 'chai'

describe('homeActions', () => {
  it('should return an action', () => {
    let action = homeActions()

    expect(action.payload).to.equal(1)
  })
})

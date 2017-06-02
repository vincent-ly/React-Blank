import homeActions from './home.actions'

describe('homeActions', () => {
  it('should return an action', () => {
    let action = homeActions()

    expect(action.payload).toBe(1)
  })
})

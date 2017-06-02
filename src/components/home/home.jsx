import React from 'react'

const Child = function (props) {
  return (
    <div>
      {props.test.test}
    </div>
  )
}

export default class Home extends React.Component {

  constructor () {
    super()
    document.title = 'Home'

    this.state = {}
  }

  componentDidMount () {

  }

  onChange (name, e) {
    this.setState({
      [name]: e.target.value
    })
  }

  componentWillUpdate () {
  }
  componentDidUpdate () {

  }

  render () {
    return (
      <div id='home'>

        <label htmlFor='name'>Project Name</label>
        <br />
        <input onChange={this.onChange.bind(this, 'test')} type='text' />
        <button>submit</button>
        <br />
        <Child test={this.state} />
      </div>

    )
  }
}

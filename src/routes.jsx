import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './components/home/home'

const App = ({ children }) => (

  <div>
    <header>

      <h1>
        <Link to='/'>New React-Redux App</Link>
      </h1>
      <Link to='/about'>About</Link>
      <br />
      <Link to='/users'>users</Link>

    </header>

    <main>

      <Route exact path='/' component={Home} />
      <Route exact path='/users' render={props => {
        document.title = 'Users'
        return <h1>Hi!</h1>
      }
      } />

    </main>
  </div>

)

export default App


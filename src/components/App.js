import React from 'react'

import NavBar from './NavBar'
import Footer from './Footer'

const App = ({ children }) => (
  <div>
    <NavBar />
    <div>
      { children }
    </div>
    <Footer />
  </div>
)

export default App

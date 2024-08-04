import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import Root from './components/BrowserRouter.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)


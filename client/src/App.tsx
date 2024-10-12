import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Dashboard from './routes/Dashboard.route'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

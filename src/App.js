import { Routes, Route } from 'react-router-dom'
// import PrivateRoute from './components/PrivateRoute'
import Index from './pages/Index'
import Select from './pages/Select'
import Login from './pages/Login'
import Result from './pages/Result'
import SuccessPage from './pages/SuccessPage'

function App() {

    return (
        <div>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/success' element={<SuccessPage />} />
                <Route path='/index' element={<Index />} />
                <Route path='/select' element={<Select />} />
                <Route path='/result' element={<Result />} />
            </Routes>
        </div>
    )
}

export default App;
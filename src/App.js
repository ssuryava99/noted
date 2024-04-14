import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Select from './pages/Select'
import Login from './pages/Login'
import Result from './pages/Result'

function App() {

    return (
        <div>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/select' element={<Select />} />
                <Route path='/result' element={<Result />} />
            </Routes>
        </div>
    )
}

export default App;
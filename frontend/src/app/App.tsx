import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tasks from '../components/tasks/tasks';
import LoginForm from '../components/auth/login/login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/home' element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

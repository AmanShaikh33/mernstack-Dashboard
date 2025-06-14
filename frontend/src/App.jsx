import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import { Loading } from './components/Loading';
import { UserData } from './context/UserContext';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import Login from './pages/Login';

function App() {
  const { loading, isAuth } = UserData();

  if (loading) return <Loading />;

  console.log("isAuth:", isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/login" element={!isAuth ? <Login /> : <Home />} />
        <Route path="/register" element={!isAuth ? <Register /> : <Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

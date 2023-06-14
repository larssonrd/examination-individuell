import './App.scss';
import { useSelector } from 'react-redux';
import { selectDarkMode } from './store/slices/themeSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StartPage from './pages/StartPage';
import Todos from './components/Todos';

function App() {
  const darkMode = useSelector(selectDarkMode);
  return (
    <div className={`app ${!darkMode ? 'whiteBg' : ''}`}>
      <Router>
        <Routes>
          <Route index element={<StartPage />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

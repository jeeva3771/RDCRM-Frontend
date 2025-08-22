
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes'
import './App.css'; // Make sure you have your CSS imports

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
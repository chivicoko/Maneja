
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectTasks from './pages/ProjectTasks';
import Form from './pages/Form';

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-100">
        {/* <Navbar/> */}
        <main className="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectTasks />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

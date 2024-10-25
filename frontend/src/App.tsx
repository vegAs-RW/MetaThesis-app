import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardAdvisor from './pages/AdvisorDashboard'
import CreateThesis from './pages/CreateThesis'
import EditThesis from './pages/EditThesis'
import './style/tailwind.css'
import Layout from './components/Layout'

const App: React.FC = () => {
  return (
    
      <Router>
        <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/advisor" element={<DashboardAdvisor />} />
          <Route path="/create-thesis" element={<CreateThesis />} />
          <Route path="/thesis/edit/:thesisId" element={<EditThesis />} />
        </Routes>
        </Layout>
    </Router>
      
  
  )
}

export default App

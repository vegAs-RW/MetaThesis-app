import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardAdvisor from './pages/AdvisorDashboard'
import CreateThesis from './pages/CreateThesis'
import EditThesis from './pages/EditThesis'
import './style/tailwind.css'
import Layout from './components/Layout'
import AdminDashboard from './pages/AdminDashboard'
import LaboratoryList from './pages/LaboratoriesDashboard'
import EstablishmentDashboard from './pages/EstablishmentDashboard'
import DataAnalysis from './pages/DataAnalysis'

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
          <Route path="/all-theses" element={<AdminDashboard />} />
          <Route path="/all-laboratories" element={<LaboratoryList />} />
          <Route path="/all-establishments" element={<EstablishmentDashboard />} />
          <Route path="/data-analysis" element={<DataAnalysis />} />
        </Routes>
        </Layout>
    </Router>
      
  
  )
}

export default App

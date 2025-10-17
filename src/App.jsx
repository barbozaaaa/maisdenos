import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Header from './components/Header'
import Hero from './components/Hero'
import Events from './components/Events'
import About from './components/About'
import Impact from './components/Impact'
import PhotoGallery from './components/PhotoGallery'
import DonationForm from './components/DonationForm'
import FAQ from './components/FAQ'
import CRM from './components/CRM'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import AdminLogin from './components/AdminLogin'
import CRMPage from './pages/CRMPage'
import Home from './pages/Home'
import EventRegistration from './pages/EventRegistration'
import EmailTest from './components/EmailTest'
import SimpleEmailTest from './components/SimpleEmailTest'
import RealEmailTest from './components/RealEmailTest'
import Web3FormsTest from './components/Web3FormsTest'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Rota pública - Página inicial */}
            <Route path="/" element={<Home />} />
            
            {/* Rotas de autenticação */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Rota de inscrição em eventos */}
            <Route path="/evento/:eventId/inscricao" element={<EventRegistration />} />
            
            {/* Rotas de teste de emails */}
            <Route path="/test-email" element={<EmailTest />} />
            <Route path="/test-email-simple" element={<SimpleEmailTest />} />
            <Route path="/test-email-real" element={<RealEmailTest />} />
            <Route path="/test-web3forms" element={<Web3FormsTest />} />
            
            {/* Rota protegida - CRM (apenas para admins) */}
            <Route 
              path="/crm" 
              element={
                <AdminRoute>
                  <CRMPage />
                </AdminRoute>
              } 
            />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

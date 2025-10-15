import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
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
import CRMPage from './pages/CRMPage'
import Home from './pages/Home'
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
            
            {/* Rotas de teste de emails */}
            <Route path="/test-email" element={<EmailTest />} />
            <Route path="/test-email-simple" element={<SimpleEmailTest />} />
            <Route path="/test-email-real" element={<RealEmailTest />} />
            <Route path="/test-web3forms" element={<Web3FormsTest />} />
            
            {/* Rota protegida - CRM */}
            <Route 
              path="/crm" 
              element={
                <ProtectedRoute>
                  <CRMPage />
                </ProtectedRoute>
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

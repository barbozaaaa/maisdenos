import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Events from './components/Events'
import About from './components/About'
import Impact from './components/Impact'
import PhotoGallery from './components/PhotoGallery'
import DonationForm from './components/DonationForm'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Home from './pages/Home'
import EventRegistration from './pages/EventRegistration'
import EmailTest from './components/EmailTest'
import SimpleEmailTest from './components/SimpleEmailTest'
import RealEmailTest from './components/RealEmailTest'
import Web3FormsTest from './components/Web3FormsTest'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Rota pública - Página inicial */}
          <Route path="/" element={<Home />} />
          
          {/* Rota de teste simples */}
          <Route path="/test" element={
            <div style={{ 
              padding: '50px', 
              textAlign: 'center', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              minHeight: '100vh',
              color: 'white'
            }}>
              <h1>Teste - Site Funcionando!</h1>
              <p>Se você está vendo isso, o React está funcionando!</p>
              <p>Data: {new Date().toLocaleString()}</p>
            </div>
          } />
          
          {/* Rota de inscrição em eventos */}
          <Route path="/evento/:eventId/inscricao" element={<EventRegistration />} />
          
          {/* Rotas de teste de emails */}
          <Route path="/test-email" element={<EmailTest />} />
          <Route path="/test-email-simple" element={<SimpleEmailTest />} />
          <Route path="/test-email-real" element={<RealEmailTest />} />
          <Route path="/test-web3forms" element={<Web3FormsTest />} />
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
  )
}

export default App

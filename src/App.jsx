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
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Events />
      <About />
      <Impact />
      <PhotoGallery />
      <DonationForm />
      <FAQ />
      <Footer />
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
  )
}

export default App

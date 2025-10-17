import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './EventRegistration.css';

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  useEffect(() => {
    if (eventId) {
      loadEvent();
    }
  }, [eventId]);

  const loadEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;

      if (!data) {
        toast.error('Evento não encontrado');
        navigate('/');
        return;
      }

      if (data.status !== 'aberto') {
        toast.error('Este evento não está mais aceitando inscrições');
        navigate('/');
        return;
      }

      setEvent(data);
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
      toast.error('Erro ao carregar informações do evento');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!registrationData.nome || !registrationData.email || !registrationData.telefone) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('inscricoes_eventos')
        .insert([
          {
            evento_id: eventId,
            nome: registrationData.nome,
            email: registrationData.email,
            telefone: registrationData.telefone
          }
        ]);

      if (error) throw error;

      toast.success('Inscrição realizada com sucesso! Entraremos em contato em breve.', {
        autoClose: 5000
      });

      // Redirecionar para a página inicial
      navigate('/');

    } catch (error) {
      console.error('Erro ao inscrever no evento:', error);
      toast.error('Erro ao realizar inscrição. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  if (loading) {
    return (
      <div className="event-registration-page">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando informações do evento...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-registration-page">
        <Header />
        <div className="error-container">
          <h2>Evento não encontrado</h2>
          <p>O evento que você está procurando não existe ou não está mais disponível.</p>
          <button onClick={() => navigate('/')} className="btn-back">
            Voltar ao Início
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="event-registration-page">
      <Header />
      
      <main className="registration-main">
        <div className="registration-container">
          <div className="registration-header">
            <button onClick={() => navigate('/')} className="btn-back">
              ← Voltar aos Eventos
            </button>
            <h1>Inscrição no Evento</h1>
          </div>

          <div className="registration-content">
            <div className="event-info">
              <div className="event-image">
                <img src={event.imagem_url} alt={event.titulo} />
              </div>
              
              <div className="event-details">
                <h2>{event.titulo}</h2>
                <p className="event-description">{event.descricao}</p>
                
                <div className="event-meta">
                  <div className="meta-item">
                    <span className="meta-label">📅 Data:</span>
                    <span className="meta-value">{formatDate(event.data_evento)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">🕐 Horário:</span>
                    <span className="meta-value">{formatTime(event.hora_evento)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">📍 Local:</span>
                    <span className="meta-value">{event.local}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">👥 Vagas:</span>
                    <span className="meta-value">
                      {event.vagas_preenchidas}/{event.vagas_totais}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="registration-form-section">
              <div className="form-header">
                <h3>Preencha seus dados para participar</h3>
                <p>Preencha o formulário abaixo para se inscrever no evento</p>
              </div>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label htmlFor="nome">Nome Completo *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={registrationData.nome}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleInputChange}
                    placeholder="Digite seu e-mail"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefone">Telefone *</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={registrationData.telefone}
                    onChange={handleInputChange}
                    placeholder="Digite seu telefone"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Enviando...' : 'Confirmar Inscrição'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventRegistration;

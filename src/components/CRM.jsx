import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { toast } from 'react-toastify'
import './CRM.css'

const CRM = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [voluntarios, setVoluntarios] = useState([])
  const [eventos, setEventos] = useState([])
  const [inscricoes, setInscricoes] = useState([])
  const [doacoes, setDoacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [voluntarioFilter, setVoluntarioFilter] = useState('todos')
  const [selectedVoluntarios, setSelectedVoluntarios] = useState([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [modalAction, setModalAction] = useState(null)
  const [stats, setStats] = useState({
    totalVoluntarios: 0,
    totalEventos: 0,
    totalInscricoes: 0,
    totalDoacoes: 0,
    valorTotalDoacoes: 0,
    voluntariosAprovados: 0,
    eventosAtivos: 0
  })

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        loadVoluntarios(),
        loadEventos(),
        loadInscricoes(),
        loadDoacoes()
      ])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast.error('Erro ao carregar dados do CRM')
    } finally {
      setLoading(false)
    }
  }

  const loadVoluntarios = async () => {
    try {
      const { data, error } = await supabase
        .from('voluntarios')
        .select('*')
        .order('criado_em', { ascending: false })

      if (error) throw error
      setVoluntarios(data || [])
    } catch (error) {
      console.error('Erro ao carregar voluntários:', error)
    }
  }

  const loadEventos = async () => {
    try {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .order('data_evento', { ascending: false })

      if (error) throw error
      setEventos(data || [])
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
    }
  }

  const loadInscricoes = async () => {
    try {
      const { data, error } = await supabase
        .from('inscricoes_eventos')
        .select(`
          *,
          eventos (
            titulo,
            data_evento
          )
        `)
        .order('criado_em', { ascending: false })

      if (error) throw error
      setInscricoes(data || [])
    } catch (error) {
      console.error('Erro ao carregar inscrições:', error)
    }
  }

  const loadDoacoes = async () => {
    try {
      const { data, error } = await supabase
        .from('doacoes')
        .select('*')
        .order('criado_em', { ascending: false })

      if (error) throw error
      setDoacoes(data || [])
    } catch (error) {
      console.error('Erro ao carregar doações:', error)
    }
  }

  useEffect(() => {
    if (voluntarios.length > 0 || eventos.length > 0 || inscricoes.length > 0 || doacoes.length > 0) {
      calculateStats()
    }
  }, [voluntarios, eventos, inscricoes, doacoes])

  const calculateStats = () => {
    const totalVoluntarios = voluntarios.length
    const totalEventos = eventos.length
    const totalInscricoes = inscricoes.length
    const totalDoacoes = doacoes.length
    const valorTotalDoacoes = doacoes.reduce((sum, doacao) => sum + (doacao.valor || 0), 0)
    const voluntariosAprovados = voluntarios.filter(v => v.status === 'aprovado').length
    const eventosAtivos = eventos.filter(e => e.status === 'aberto').length

    setStats({
      totalVoluntarios,
      totalEventos,
      totalInscricoes,
      totalDoacoes,
      valorTotalDoacoes,
      voluntariosAprovados,
      eventosAtivos
    })
  }

  const updateVoluntarioStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('voluntarios')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      toast.success(`Status do voluntário atualizado para ${status}`)
      loadVoluntarios()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error('Erro ao atualizar status do voluntário')
    }
  }

  const updateMultipleVoluntariosStatus = async (ids, status) => {
    try {
      const { error } = await supabase
        .from('voluntarios')
        .update({ status })
        .in('id', ids)

      if (error) throw error

      toast.success(`${ids.length} voluntários atualizados para ${status}`)
      loadVoluntarios()
      setSelectedVoluntarios([])
      setShowConfirmModal(false)
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error('Erro ao atualizar status dos voluntários')
    }
  }

  const handleSelectVoluntario = (id) => {
    setSelectedVoluntarios(prev => 
      prev.includes(id) 
        ? prev.filter(volId => volId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAllVoluntarios = () => {
    const filteredVoluntarios = getFilteredVoluntarios()
    const allSelected = filteredVoluntarios.every(v => selectedVoluntarios.includes(v.id))
    
    if (allSelected) {
      setSelectedVoluntarios([])
    } else {
      setSelectedVoluntarios(filteredVoluntarios.map(v => v.id))
    }
  }

  const handleBulkAction = (action) => {
    if (selectedVoluntarios.length === 0) {
      toast.warning('Selecione pelo menos um voluntário')
      return
    }
    setModalAction(action)
    setShowConfirmModal(true)
  }

  const confirmBulkAction = () => {
    if (modalAction) {
      updateMultipleVoluntariosStatus(selectedVoluntarios, modalAction)
    }
  }

  const getFilteredVoluntarios = () => {
    if (voluntarioFilter === 'todos') return voluntarios
    return voluntarios.filter(v => v.status === voluntarioFilter)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (loading) {
    return (
      <section id="crm" className="crm">
        <div className="crm-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando dados do CRM...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="crm" className="crm">
      <div className="crm-container">
        <div className="crm-header">
          <div className="section-tag">
            <span>CRM Dashboard</span>
          </div>
          <h2 className="section-title">
            Painel de <span className="highlight">Controle</span>
          </h2>
          <p className="section-description">
            Gerencie voluntários, eventos, doações e inscrições em um só lugar
          </p>
        </div>

        <div className="crm-tabs">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'voluntarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('voluntarios')}
          >
            Voluntários
          </button>
          <button 
            className={`tab-btn ${activeTab === 'eventos' ? 'active' : ''}`}
            onClick={() => setActiveTab('eventos')}
          >
            Eventos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'doacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('doacoes')}
          >
            Doações
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inscricoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('inscricoes')}
          >
            Inscrições
          </button>
        </div>

        <div className="crm-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-grid">
              <div className="stat-card">
                <div className="stat-content">
                  <h3>{stats.totalVoluntarios}</h3>
                  <p>Total de Voluntários</p>
                  <span className="stat-sub">{stats.voluntariosAprovados} aprovados</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <h3>{stats.totalEventos}</h3>
                  <p>Total de Eventos</p>
                  <span className="stat-sub">{stats.eventosAtivos} ativos</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <h3>{stats.totalInscricoes}</h3>
                  <p>Total de Inscrições</p>
                  <span className="stat-sub">em eventos</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <h3>{stats.totalDoacoes}</h3>
                  <p>Total de Doações</p>
                  <span className="stat-sub">{formatCurrency(stats.valorTotalDoacoes)}</span>
                </div>
              </div>

              <div className="recent-activities">
                <h3>Atividades Recentes</h3>
                <div className="activity-list">
                  {[...voluntarios.slice(0, 3), ...eventos.slice(0, 2), ...inscricoes.slice(0, 2)]
                    .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-content">
                          <p>
                            {item.nome ? `Novo voluntário: ${item.nome}` :
                             item.titulo ? `Novo evento: ${item.titulo}` :
                             `Nova inscrição em evento`}
                          </p>
                          <span>{formatDate(item.criado_em)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'voluntarios' && (
            <div className="data-table-container">
              <div className="table-header">
                <div className="header-left">
                  <h3>Voluntários Cadastrados</h3>
                  <div className="volunteer-stats">
                    <span className="stat-item">
                      <strong>{voluntarios.filter(v => v.status === 'pendente').length}</strong> Pendentes
                    </span>
                    <span className="stat-item">
                      <strong>{voluntarios.filter(v => v.status === 'aprovado').length}</strong> Aprovados
                    </span>
                    <span className="stat-item">
                      <strong>{voluntarios.filter(v => v.status === 'rejeitado').length}</strong> Rejeitados
                    </span>
                  </div>
                </div>
                <div className="header-right">
                  <button className="btn-refresh" onClick={loadVoluntarios}>
                    Atualizar
                  </button>
                </div>
              </div>

              <div className="filters-section">
                <div className="filter-group">
                  <label>Filtrar por status:</label>
                  <select 
                    value={voluntarioFilter} 
                    onChange={(e) => setVoluntarioFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="todos">Todos ({voluntarios.length})</option>
                    <option value="pendente">Pendentes ({voluntarios.filter(v => v.status === 'pendente').length})</option>
                    <option value="aprovado">Aprovados ({voluntarios.filter(v => v.status === 'aprovado').length})</option>
                    <option value="rejeitado">Rejeitados ({voluntarios.filter(v => v.status === 'rejeitado').length})</option>
                  </select>
                </div>

                {selectedVoluntarios.length > 0 && (
                  <div className="bulk-actions">
                    <span className="selected-count">
                      {selectedVoluntarios.length} selecionado(s)
                    </span>
                    <button 
                      className="btn-bulk-approve"
                      onClick={() => handleBulkAction('aprovado')}
                    >
                      Aprovar Selecionados
                    </button>
                    <button 
                      className="btn-bulk-reject"
                      onClick={() => handleBulkAction('rejeitado')}
                    >
                      Rejeitar Selecionados
                    </button>
                  </div>
                )}
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        <input 
                          type="checkbox" 
                          checked={getFilteredVoluntarios().length > 0 && getFilteredVoluntarios().every(v => selectedVoluntarios.includes(v.id))}
                          onChange={handleSelectAllVoluntarios}
                          className="checkbox-select-all"
                        />
                      </th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Idade</th>
                      <th>Área</th>
                      <th>Status</th>
                      <th>Data</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredVoluntarios().map((voluntario) => (
                      <tr key={voluntario.id} className={selectedVoluntarios.includes(voluntario.id) ? 'selected' : ''}>
                        <td>
                          <input 
                            type="checkbox" 
                            checked={selectedVoluntarios.includes(voluntario.id)}
                            onChange={() => handleSelectVoluntario(voluntario.id)}
                            className="checkbox-row"
                          />
                        </td>
                        <td>{voluntario.nome}</td>
                        <td>{voluntario.email}</td>
                        <td>{voluntario.telefone}</td>
                        <td>{voluntario.idade}</td>
                        <td>{voluntario.area_interesse}</td>
                        <td>
                          <span className={`status-badge ${voluntario.status}`}>
                            {voluntario.status}
                          </span>
                        </td>
                        <td>{formatDate(voluntario.criado_em)}</td>
                        <td>
                          <div className="action-buttons">
                            {voluntario.status === 'pendente' && (
                              <>
                                <button 
                                  className="btn-approve"
                                  onClick={() => updateVoluntarioStatus(voluntario.id, 'aprovado')}
                                >
                                  Aprovar
                                </button>
                                <button 
                                  className="btn-reject"
                                  onClick={() => updateVoluntarioStatus(voluntario.id, 'rejeitado')}
                                >
                                  Rejeitar
                                </button>
                              </>
                            )}
                            {voluntario.status === 'aprovado' && (
                              <button 
                                className="btn-reject"
                                onClick={() => updateVoluntarioStatus(voluntario.id, 'rejeitado')}
                              >
                                Rejeitar
                              </button>
                            )}
                            {voluntario.status === 'rejeitado' && (
                              <button 
                                className="btn-approve"
                                onClick={() => updateVoluntarioStatus(voluntario.id, 'aprovado')}
                              >
                                Aprovar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'eventos' && (
            <div className="data-table-container">
              <div className="table-header">
                <h3>Eventos Cadastrados</h3>
                <button className="btn-refresh" onClick={loadEventos}>
                  Atualizar
                </button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Data</th>
                      <th>Local</th>
                      <th>Vagas</th>
                      <th>Status</th>
                      <th>Tipo</th>
                      <th>Data Criação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventos.map((evento) => (
                      <tr key={evento.id}>
                        <td>{evento.titulo}</td>
                        <td>{formatDate(evento.data_evento)}</td>
                        <td>{evento.local}</td>
                        <td>
                          {evento.vagas_preenchidas}/{evento.vagas_totais}
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ 
                                width: `${(evento.vagas_preenchidas / evento.vagas_totais) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${evento.status}`}>
                            {evento.status}
                          </span>
                        </td>
                        <td>{evento.tipo_evento}</td>
                        <td>{formatDate(evento.criado_em)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'doacoes' && (
            <div className="data-table-container">
              <div className="table-header">
                <h3>Doações Recebidas</h3>
                <button className="btn-refresh" onClick={loadDoacoes}>
                  Atualizar
                </button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Doador</th>
                      <th>Email</th>
                      <th>Valor</th>
                      <th>Tipo</th>
                      <th>Status</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doacoes.map((doacao) => (
                      <tr key={doacao.id}>
                        <td>{doacao.nome_doador}</td>
                        <td>{doacao.email_doador}</td>
                        <td>{formatCurrency(doacao.valor)}</td>
                        <td>{doacao.tipo_doacao}</td>
                        <td>
                          <span className={`status-badge ${doacao.status}`}>
                            {doacao.status}
                          </span>
                        </td>
                        <td>{formatDate(doacao.criado_em)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inscricoes' && (
            <div className="data-table-container">
              <div className="table-header">
                <h3>Inscrições em Eventos</h3>
                <button className="btn-refresh" onClick={loadInscricoes}>
                  Atualizar
                </button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Evento</th>
                      <th>Data Evento</th>
                      <th>Status</th>
                      <th>Data Inscrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inscricoes.map((inscricao) => (
                      <tr key={inscricao.id}>
                        <td>{inscricao.nome}</td>
                        <td>{inscricao.email}</td>
                        <td>{inscricao.telefone}</td>
                        <td>{inscricao.eventos?.titulo || 'N/A'}</td>
                        <td>{inscricao.eventos?.data_evento ? formatDate(inscricao.eventos.data_evento) : 'N/A'}</td>
                        <td>
                          <span className={`status-badge ${inscricao.status}`}>
                            {inscricao.status}
                          </span>
                        </td>
                        <td>{formatDate(inscricao.criado_em)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CRM

-- ============================================
-- Script de Configuração do Supabase
-- Sistema de Doações - Mais de Nós
-- ============================================

-- Criar tabela de doações
CREATE TABLE doacoes (
  id BIGSERIAL PRIMARY KEY,
  nome_doador VARCHAR(255) NOT NULL,
  email_doador VARCHAR(255) NOT NULL,
  telefone_doador VARCHAR(20),
  tipo_doacao VARCHAR(50) NOT NULL CHECK (tipo_doacao IN ('dinheiro', 'roupas', 'brinquedos', 'alimentos', 'outros_bens')),
  descricao TEXT,
  valor DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmada', 'processada', 'cancelada')),
  observacoes TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_doacoes_criado_em ON doacoes(criado_em DESC);
CREATE INDEX idx_doacoes_tipo ON doacoes(tipo_doacao);
CREATE INDEX idx_doacoes_email ON doacoes(email_doador);
CREATE INDEX idx_doacoes_status ON doacoes(status);

-- Habilitar RLS (Row Level Security)
ALTER TABLE doacoes ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserções públicas
CREATE POLICY "Permitir inserção de doações" ON doacoes
  FOR INSERT
  WITH CHECK (true);

-- Criar política para leitura (útil para painel administrativo futuro)
CREATE POLICY "Permitir leitura de doações" ON doacoes
  FOR SELECT
  USING (true);

-- Comentários nas colunas (documentação)
COMMENT ON TABLE doacoes IS 'Tabela para armazenar todas as doações recebidas pela ONG Mais de Nós';
COMMENT ON COLUMN doacoes.id IS 'Identificador único da doação';
COMMENT ON COLUMN doacoes.nome_doador IS 'Nome completo do doador';
COMMENT ON COLUMN doacoes.email_doador IS 'E-mail de contato do doador';
COMMENT ON COLUMN doacoes.telefone_doador IS 'Telefone de contato do doador';
COMMENT ON COLUMN doacoes.tipo_doacao IS 'Tipo de doação: dinheiro, roupas, brinquedos, alimentos ou outros_bens';
COMMENT ON COLUMN doacoes.descricao IS 'Descrição detalhada da doação';
COMMENT ON COLUMN doacoes.valor IS 'Valor em dinheiro (apenas para tipo_doacao = dinheiro)';
COMMENT ON COLUMN doacoes.status IS 'Status da doação: pendente, confirmada, processada ou cancelada';
COMMENT ON COLUMN doacoes.observacoes IS 'Observações adicionais sobre a doação';
COMMENT ON COLUMN doacoes.criado_em IS 'Data e hora em que a doação foi registrada';
COMMENT ON COLUMN doacoes.atualizado_em IS 'Data e hora da última atualização da doação';

-- ============================================
-- Tabela de Voluntários
-- ============================================

CREATE TABLE voluntarios (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  idade INTEGER NOT NULL CHECK (idade >= 16),
  area_interesse VARCHAR(50) NOT NULL CHECK (area_interesse IN ('atendimento', 'criancas', 'logistica', 'comunicacao', 'administrativo', 'outros')),
  disponibilidade VARCHAR(50) NOT NULL CHECK (disponibilidade IN ('finais-semana', 'feriados', 'manha', 'tarde', 'noite', 'flexivel')),
  experiencia TEXT,
  motivacao TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para voluntários
CREATE INDEX idx_voluntarios_criado_em ON voluntarios(criado_em DESC);
CREATE INDEX idx_voluntarios_status ON voluntarios(status);
CREATE INDEX idx_voluntarios_area_interesse ON voluntarios(area_interesse);
CREATE INDEX idx_voluntarios_email ON voluntarios(email);

-- RLS para voluntários
ALTER TABLE voluntarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserção de voluntários" ON voluntarios
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir leitura de voluntários" ON voluntarios
  FOR SELECT
  USING (true);

-- ============================================
-- Tabela de Eventos
-- ============================================

CREATE TABLE eventos (
  id BIGSERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  data_evento DATE NOT NULL,
  hora_evento TIME NOT NULL,
  local VARCHAR(255) NOT NULL,
  tipo_evento VARCHAR(50) NOT NULL CHECK (tipo_evento IN ('acao_social', 'reuniao', 'campanha', 'espiritual', 'outros')),
  vagas_totais INTEGER NOT NULL DEFAULT 0,
  vagas_preenchidas INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'aberto' CHECK (status IN ('aberto', 'lotado', 'encerrado', 'cancelado')),
  imagem_url VARCHAR(500),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para eventos
CREATE INDEX idx_eventos_data_evento ON eventos(data_evento DESC);
CREATE INDEX idx_eventos_status ON eventos(status);
CREATE INDEX idx_eventos_tipo ON eventos(tipo_evento);
CREATE INDEX idx_eventos_criado_em ON eventos(criado_em DESC);

-- RLS para eventos
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura de eventos" ON eventos
  FOR SELECT
  USING (true);

CREATE POLICY "Permitir inserção de eventos" ON eventos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir atualização de eventos" ON eventos
  FOR UPDATE
  USING (true);

-- ============================================
-- Tabela de Inscrições em Eventos
-- ============================================

CREATE TABLE inscricoes_eventos (
  id BIGSERIAL PRIMARY KEY,
  evento_id BIGINT NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
  voluntario_id BIGINT REFERENCES voluntarios(id) ON DELETE SET NULL,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmada' CHECK (status IN ('confirmada', 'cancelada', 'presente', 'ausente')),
  observacoes TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para inscrições
CREATE INDEX idx_inscricoes_evento_id ON inscricoes_eventos(evento_id);
CREATE INDEX idx_inscricoes_voluntario_id ON inscricoes_eventos(voluntario_id);
CREATE INDEX idx_inscricoes_status ON inscricoes_eventos(status);
CREATE INDEX idx_inscricoes_criado_em ON inscricoes_eventos(criado_em DESC);

-- RLS para inscrições
ALTER TABLE inscricoes_eventos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserção de inscrições" ON inscricoes_eventos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir leitura de inscrições" ON inscricoes_eventos
  FOR SELECT
  USING (true);

-- ============================================
-- Função para atualizar vagas preenchidas
-- ============================================

CREATE OR REPLACE FUNCTION atualizar_vagas_evento()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE eventos 
  SET vagas_preenchidas = (
    SELECT COUNT(*) 
    FROM inscricoes_eventos 
    WHERE evento_id = NEW.evento_id 
    AND status = 'confirmada'
  ),
  status = CASE 
    WHEN vagas_totais <= (
      SELECT COUNT(*) 
      FROM inscricoes_eventos 
      WHERE evento_id = NEW.evento_id 
      AND status = 'confirmada'
    ) THEN 'lotado'
    ELSE 'aberto'
  END
  WHERE id = NEW.evento_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar vagas automaticamente
CREATE TRIGGER trigger_atualizar_vagas
  AFTER INSERT OR UPDATE OR DELETE ON inscricoes_eventos
  FOR EACH ROW
  EXECUTE FUNCTION atualizar_vagas_evento();

-- ============================================
-- Inserir eventos de exemplo
-- ============================================

INSERT INTO eventos (titulo, descricao, data_evento, hora_evento, local, tipo_evento, vagas_totais, imagem_url) VALUES
('Ação Solidária de Natal', 'Distribuição de brinquedos, roupas e alimentos para famílias carentes. Venha fazer parte desta ação de amor!', '2025-12-15', '14:00:00', 'Centro Comunitário São José', 'acao_social', 25, '/IMG/IMG_3901.jpg'),
('Encontro de Voluntários', 'Reunião mensal para planejamento das atividades e integração dos novos voluntários.', '2025-01-20', '19:00:00', 'Igreja Nossa Senhora da Esperança', 'reuniao', 50, '/IMG/IMG_3902.jpg'),
('Campanha de Arrecadação', 'Arrecadação de roupas, brinquedos e alimentos não perecíveis para as famílias assistidas.', '2025-02-10', '08:00:00', 'Praça Central', 'campanha', 30, '/IMG/PHOTO-2025-08-24-17-17-10.jpg'),
('Retiro Espiritual', 'Um dia de reflexão, oração e fortalecimento espiritual para todos os voluntários.', '2025-03-15', '07:00:00', 'Sítio Esperança', 'espiritual', 40, '/IMG/PHOTO-2025-08-24-17-17-12.jpg');

-- ============================================
-- Comentários das novas tabelas
-- ============================================

COMMENT ON TABLE voluntarios IS 'Tabela para cadastro de voluntários da ONG Mais de Nós';
COMMENT ON TABLE eventos IS 'Tabela para gerenciar eventos da ONG';
COMMENT ON TABLE inscricoes_eventos IS 'Tabela para gerenciar inscrições de voluntários em eventos';

-- ============================================
-- Queries úteis para consulta
-- ============================================

-- Ver todas as doações
-- SELECT * FROM doacoes ORDER BY criado_em DESC;

-- Contar doações por tipo
-- SELECT tipo_doacao, COUNT(*) as total 
-- FROM doacoes 
-- GROUP BY tipo_doacao 
-- ORDER BY total DESC;

-- Somar total de doações em dinheiro
-- SELECT SUM(valor) as total_dinheiro 
-- FROM doacoes 
-- WHERE tipo_doacao = 'dinheiro' AND valor IS NOT NULL;

-- Doações dos últimos 7 dias
-- SELECT * FROM doacoes 
-- WHERE criado_em >= NOW() - INTERVAL '7 days'
-- ORDER BY criado_em DESC;

-- Ver todos os voluntários
-- SELECT * FROM voluntarios ORDER BY criado_em DESC;

-- Ver eventos próximos
-- SELECT * FROM eventos 
-- WHERE data_evento >= CURRENT_DATE 
-- ORDER BY data_evento ASC;

-- Ver inscrições por evento
-- SELECT e.titulo, COUNT(i.id) as inscricoes
-- FROM eventos e
-- LEFT JOIN inscricoes_eventos i ON e.id = i.evento_id AND i.status = 'confirmada'
-- GROUP BY e.id, e.titulo
-- ORDER BY e.data_evento ASC;


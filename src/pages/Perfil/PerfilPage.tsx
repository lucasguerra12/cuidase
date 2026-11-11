import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Info,
  LockKeyhole,
  Save,
  Trash2,
  UserRound,
} from 'lucide-react';

import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import './PerfilPage.css';

type DadosPerfil = {
  nome: string;
  idade: string;
  email: string;
  altura: string;
  peso: string;
};

const CHAVE_PERFIL = 'cuidaSe:perfil:v1';
const CHAVE_NOME = 'cuidaSe:nome';

const PERFIL_VAZIO: DadosPerfil = {
  nome: '',
  idade: '',
  email: '',
  altura: '',
  peso: '',
};

function textoSeguro(valor: unknown): string {
  return typeof valor === 'string' ? valor : '';
}

function lerPerfil(): DadosPerfil {
  try {
    const salvo = localStorage.getItem(CHAVE_PERFIL);
    if (salvo) {
      const dados: unknown = JSON.parse(salvo);
      if (dados && typeof dados === 'object' && !Array.isArray(dados)) {
        const registro = dados as Record<string, unknown>;
        return {
          nome: textoSeguro(registro.nome),
          idade: textoSeguro(registro.idade),
          email: textoSeguro(registro.email),
          altura: textoSeguro(registro.altura),
          peso: textoSeguro(registro.peso),
        };
      }
    }
  } catch {
    // O armazenamento pode estar indisponível, ou o registro ser inválido.
  }

  try {
    return { ...PERFIL_VAZIO, nome: sessionStorage.getItem(CHAVE_NOME) ?? '' };
  } catch {
    return { ...PERFIL_VAZIO };
  }
}

function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (!partes.length) return '';
  const primeira = partes[0][0] ?? '';
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return `${primeira}${ultima}`.toUpperCase();
}

function intervaloValido(valor: string, minimo: number, maximo: number) {
  if (!valor.trim()) return true; // Os dados além do nome são opcionais.
  const numero = Number(valor);
  return Number.isFinite(numero) && numero >= minimo && numero <= maximo;
}

export default function PerfilPage() {
  const [dados, setDados] = useState<DadosPerfil>(lerPerfil);
  const [aviso, setAviso] = useState('');
  const [erro, setErro] = useState('');
  const [confirmarLimpeza, setConfirmarLimpeza] = useState(false);

  function atualizar(campo: keyof DadosPerfil, valor: string) {
    setDados((anteriores) => ({ ...anteriores, [campo]: valor }));
    setAviso('');
    setErro('');
  }

  function salvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setAviso('');
    setErro('');
    setConfirmarLimpeza(false);

    const nome = dados.nome.trim();
    const email = dados.email.trim();
    if (nome.length < 2) {
      setErro('Informe seu nome com pelo menos dois caracteres.');
      return;
    }
    if (!intervaloValido(dados.idade, 1, 120) ||
        (dados.idade && !Number.isInteger(Number(dados.idade)))) {
      setErro('Informe uma idade válida entre 1 e 120 anos.');
      return;
    }
    if (!intervaloValido(dados.altura, 30, 300)) {
      setErro('Informe uma altura válida em centímetros.');
      return;
    }
    if (!intervaloValido(dados.peso, 1, 500)) {
      setErro('Informe um peso válido em quilogramas.');
      return;
    }

    const normalizados = {
      nome,
      idade: dados.idade.trim(),
      email,
      altura: dados.altura.trim(),
      peso: dados.peso.trim(),
    };

    try {
      localStorage.setItem(CHAVE_PERFIL, JSON.stringify(normalizados));
      setDados(normalizados);
      setAviso('Perfil salvo neste navegador.');
      try {
        // Atualiza também o nome usado na saudação da Home.
        sessionStorage.setItem(CHAVE_NOME, nome);
      } catch {
        setAviso('Perfil salvo. A saudação da Home pode não ser atualizada nesta sessão.');
      }
    } catch {
      setErro('Não foi possível salvar. Verifique se o navegador permite armazenamento local.');
    }
  }

  function apagar() {
    try {
      localStorage.removeItem(CHAVE_PERFIL);
      sessionStorage.removeItem(CHAVE_NOME);
      setDados({ ...PERFIL_VAZIO });
      setAviso('Os dados do perfil foram apagados deste navegador.');
      setErro('');
      setConfirmarLimpeza(false);
    } catch {
      setErro('Não foi possível apagar os dados armazenados neste navegador.');
    }
  }

  const nomeExibicao = dados.nome.trim() || 'Seu perfil';

  return (
    <main className="perfil-page">
      <div className="perfil-container">
        <header className="perfil-header">
          <Link to="/inicio" className="perfil-voltar" aria-label="Voltar ao início">
            <ArrowLeft size={23} />
          </Link>
          <h1>Meu perfil</h1>
          <span aria-hidden="true" />
        </header>

        <section className="perfil-apresentacao" aria-labelledby="perfil-nome-exibido">
          <span className="perfil-avatar" aria-hidden="true">
            {dados.nome.trim() ? iniciais(dados.nome) : <UserRound size={35} />}
          </span>
          <div className="perfil-apresentacao-textos">
            <p className="perfil-etiqueta">SEU ESPAÇO DE CUIDADO</p>
            <h2 id="perfil-nome-exibido">{nomeExibicao}</h2>
            <p>Organize suas informações pessoais de maneira simples.</p>
          </div>
        </section>

        <section className="perfil-cartao" aria-labelledby="perfil-dados-titulo">
          <div className="perfil-secao-titulo">
            <UserRound size={23} aria-hidden="true" />
            <div>
              <h2 id="perfil-dados-titulo">Informações pessoais</h2>
              <p>Preencha apenas o que desejar compartilhar neste dispositivo.</p>
            </div>
          </div>

          <form className="perfil-formulario" onSubmit={salvar}>
            <div className="perfil-campo perfil-campo--inteiro">
              <label htmlFor="perfil-nome">Nome completo <span aria-hidden="true">*</span></label>
              <input
                id="perfil-nome"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                placeholder="Como você gostaria de ser chamada?"
                value={dados.nome}
                onChange={(e) => atualizar('nome', e.target.value)}
              />
            </div>

            <div className="perfil-campo">
              <label htmlFor="perfil-idade">Idade <small>(opcional)</small></label>
              <div className="perfil-campo-com-unidade">
                <input
                  id="perfil-idade"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="120"
                  step="1"
                  placeholder="Ex.: 25"
                  value={dados.idade}
                  onChange={(e) => atualizar('idade', e.target.value)}
                />
                <span>anos</span>
              </div>
            </div>

            <div className="perfil-campo perfil-campo--email">
              <label htmlFor="perfil-email">E-mail <small>(opcional)</small></label>
              <input
                id="perfil-email"
                type="email"
                autoComplete="email"
                maxLength={120}
                placeholder="exemplo@email.com"
                value={dados.email}
                onChange={(e) => atualizar('email', e.target.value)}
              />
            </div>

            <div className="perfil-campo">
              <label htmlFor="perfil-altura">Altura <small>(opcional)</small></label>
              <div className="perfil-campo-com-unidade">
                <input
                  id="perfil-altura"
                  type="number"
                  inputMode="decimal"
                  min="30"
                  max="300"
                  step="0.1"
                  placeholder="Ex.: 165"
                  value={dados.altura}
                  onChange={(e) => atualizar('altura', e.target.value)}
                />
                <span>cm</span>
              </div>
            </div>

            <div className="perfil-campo">
              <label htmlFor="perfil-peso">Peso <small>(opcional)</small></label>
              <div className="perfil-campo-com-unidade">
                <input
                  id="perfil-peso"
                  type="number"
                  inputMode="decimal"
                  min="1"
                  max="500"
                  step="0.1"
                  placeholder="Ex.: 65.5"
                  value={dados.peso}
                  onChange={(e) => atualizar('peso', e.target.value)}
                />
                <span>kg</span>
              </div>
            </div>

            {erro && <p className="perfil-erro" role="alert">{erro}</p>}
            {aviso && <p className="perfil-sucesso" role="status"><CheckCircle2 size={19} />{aviso}</p>}

            <button className="perfil-botao-salvar" type="submit">
              <Save size={19} aria-hidden="true" /> Salvar informações
            </button>
          </form>
        </section>

        <aside className="perfil-privacidade">
          <LockKeyhole size={23} aria-hidden="true" />
          <div>
            <h2>Sobre a privacidade</h2>
            <p>
              Este é um protótipo sem conta ou banco de dados. Ao salvar, seus dados ficam
              armazenados somente neste navegador, sem envio a um servidor. Eles não são
              criptografados pelo aplicativo e podem ser vistos por outras pessoas que usem
              o mesmo dispositivo ou perfil do navegador.
            </p>
          </div>
        </aside>

        <section className="perfil-excluir" aria-labelledby="perfil-excluir-titulo">
          <div>
            <h2 id="perfil-excluir-titulo"><Trash2 size={20} aria-hidden="true" /> Limpar dados do perfil</h2>
            <p>Remove as informações salvas aqui e o nome usado na saudação da Home. Não apaga seus compromissos da Agenda.</p>
          </div>
          {!confirmarLimpeza ? (
            <button type="button" className="perfil-botao-apagar" onClick={() => setConfirmarLimpeza(true)}>
              Apagar perfil
            </button>
          ) : (
            <div className="perfil-confirmacao">
              <p><Info size={18} aria-hidden="true" /> Deseja apagar os dados deste perfil?</p>
              <div>
                <button type="button" onClick={() => setConfirmarLimpeza(false)} className="perfil-botao-cancelar">Cancelar</button>
                <button type="button" onClick={apagar} className="perfil-botao-confirmar">Sim, apagar</button>
              </div>
            </div>
          )}
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

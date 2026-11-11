
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, UserRound, Flower2 } from 'lucide-react';

import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !senha.trim()) {
      setErro('Preencha todos os campos para continuar.');
      return;
    }

    setErro('');
    navigate('/inicio');
  }

  return (
    <main className="login-screen">
      <section className="login-panel">

        <header className="login-brand">
          <Flower2 className="login-logo" strokeWidth={1} />

          <h1>CUIDA-SE</h1>
          <p>Sua saúde em boas mãos</p>
        </header>

        <form className="login-form" onSubmit={handleLogin}>

          <div className="login-input">
            <UserRound size={20} strokeWidth={1.5} />

            <input
              type="text"
              placeholder="E-mail ou celular"
              aria-label="E-mail ou celular"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-input">
            <LockKeyhole size={20} strokeWidth={1.5} />

            <input
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Senha"
              aria-label="Senha"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {erro && <p className="login-error" role="alert">{erro}</p>}

          <button type="submit" className="login-button">
            Entrar
          </button>

        </form>
      </section>
    </main>
  );
}

import { useState } from "react";
import "./App.css";

// Importa as páginas do GerenciaCÃO.
import Inicio from "./assets/pages/inicio";
import Contato from "./assets/pages/contato";
import Equipe from "./assets/pages/equipe";
import Sobre from "./assets/pages/sobre";
import Funcionalidades from "./assets/pages/funcionalidades";

/* ==========================================
   MENU DE NAVEGAÇÃO
========================================== */

// Define as páginas disponíveis no menu superior.
const paginas = [
  { id: "inicio", nome: "Início" },
  { id: "funcionalidades", nome: "Funcionalidades" },
  { id: "sobre", nome: "Sobre" },
  { id: "equipe", nome: "Equipe" },
  { id: "contato", nome: "Contato" },
];

/* ==========================================
   COMPONENTE PRINCIPAL
========================================== */

// Responsável pelo cabeçalho e pela navegação do site.
function App() {

  // Armazena a página que está sendo exibida.
  const [paginaAtual, setPaginaAtual] = useState("inicio");

  // Altera a página selecionada e retorna ao topo.
  function navegarPara(id) {
    setPaginaAtual(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Busca as informações da página atual.
  const paginaSelecionada = paginas.find(
    (pagina) => pagina.id === paginaAtual
  );

  return (
    <div className="site">

      {/* Cabeçalho compartilhado entre todas as páginas. */}
      <header className="cabecalho">

        {/* Tipografia do projeto.
            Funciona como botão para voltar ao Início. */}
        <button
          className="botao-logo"
          onClick={() => navegarPara("inicio")}
          aria-label="Voltar ao início"
        >
          <img
            src="/images/tipografia.png"
            alt="GerenciaCÃO"
          />
        </button>

        {/* Menu de navegação superior. */}
        <nav
          className="menu"
          aria-label="Navegação principal"
        >

          {/* Cria os botões com base no array paginas. */}
          {paginas.map((pagina) => (
            <button
              key={pagina.id}
              className={
                paginaAtual === pagina.id ? "ativo" : ""
              }
              onClick={() => navegarPara(pagina.id)}
              aria-current={
                paginaAtual === pagina.id
                  ? "page"
                  : undefined
              }
            >
              {pagina.nome}
            </button>
          ))}

        </nav>
      </header>

      {/* ==========================================
          EXIBIÇÃO DAS PÁGINAS
      ========================================== */}

      {/* Verifica a página selecionada e exibe
          o componente correspondente. */}

      {paginaAtual === "inicio" ? (

        // Exibe a página inicial do GerenciaCÃO.
        <Inicio
          onExperimentar={() =>
            navegarPara("funcionalidades")
          }
        />

      ) : paginaAtual === "funcionalidades" ? (

        // Exibe as seções amarelas do aplicativo.
        <Funcionalidades />

      ) : paginaAtual === "sobre" ? (

        // Exibe a história e o propósito do projeto.
        <Sobre
          onVerFuncionalidades={() =>
            navegarPara("funcionalidades")
          }
        />

      ) : paginaAtual === "equipe" ? (

        // Exibe os integrantes do GerenciaCÃO.
        <Equipe />

      ) : paginaAtual === "contato" ? (

        // Exibe o formulário de contato.
        <Contato />

      ) : (

        // Mensagem para uma página não reconhecida.
        <main className="pagina-provisoria">
          <h1>{paginaSelecionada?.nome ?? "Página não encontrada"}</h1>
          <p>Esta página não está disponível.</p>
        </main>

      )}

    </div>
  );
}

// Exporta o componente principal do site.
export default App;

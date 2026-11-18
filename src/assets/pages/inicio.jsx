/* ==========================================
   PÁGINA INÍCIO — GERENCIACÃO
========================================== */

// Componente responsável pela página inicial.
//
// A propriedade "onExperimentar" recebe uma função
// do App.jsx para abrir a página Funcionalidades.
function Inicio({ onExperimentar }) {
  return (
    <main>

      {/* ==========================================
          SEÇÃO PRINCIPAL — APRESENTAÇÃO
      ========================================== */}

      <section className="inicio">

        {/* Coluna esquerda: título e botão principal. */}
        <div className="inicio-texto">

          {/* Mensagem principal do GerenciaCÃO. */}
          <h1>
            Mais organização
            <br />
            para quem cuida de
            <br />
            <span>tantas vidas</span>
          </h1>

          {/* Redireciona para a página Funcionalidades. */}
          <button
            className="botao-teste"
            onClick={onExperimentar}
          >
            Experimente já
          </button>

        </div>

        {/* Coluna direita: imagem do aplicativo. */}
        <div className="inicio-celular">

          {/* Imagem da mão segurando o celular. */}
          <img
            src="./images/splashscreen.png"
            alt="Celular apresentando o GerenciaCÃO"
          />

        </div>

      </section>

    </main>
  );
}

// Permite utilizar este componente no App.jsx.
export default Inicio;

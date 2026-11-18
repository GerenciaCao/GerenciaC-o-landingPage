
import "./pages.css";

// Lista dos principais recursos apresentados na solução.
// Usaremos esses dados para montar pequenos cartões.
const recursos = [
  { simbolo: "🐾", nome: "Animais" },
  { simbolo: "💰", nome: "Finanças" },
  { simbolo: "📅", nome: "Agenda" },
  { simbolo: "❤️", nome: "Adoções" },
];

// Componente da página Sobre.
// A propriedade onVerFuncionalidades permite navegar
// para a página Funcionalidades ao clicar no botão final.
function Sobre({ onVerFuncionalidades }) {
  return (
    <main className="sobre-pagina">

      {/* SEÇÃO 1 — Apresentação do projeto. */}
      <section className="sobre-abertura">
        <span className="pagina-etiqueta">
          SOBRE O PROJETO
        </span>

        <h1>
          O que é o <span>GerenciaCÃO?</span>
        </h1>

        <p>
          O GerenciaCÃO é um aplicativo desenvolvido
          para facilitar a organização de abrigos
          de animais. Seu objetivo é reunir informações
          importantes em um só lugar, tornando o
          acompanhamento dos cuidados, compromissos
          e finanças mais simples e prático.
        </p>
      </section>

      
{/* SEÇÃO 2 — Apresentação da persona Helena. */}
<section className="sobre-secao sobre-helena">

  {/* Coluna esquerda: imagem da Helena. */}
  <div className="sobre-imagem">
    <img
      className="sobre-fotografia"
      src="/images/helena.png"
      alt="Helena cuidando dos animais do abrigo"
    />
  </div>

  {/* Coluna direita: informações sobre a Helena. */}
  <div className="sobre-conteudo">
    <span className="pagina-etiqueta">
      PARA QUEM CRIAMOS
    </span>

    <h2>
      Conheça a <span>Helena.</span>
    </h2>

    <p>
      Helena tem 56 anos e cuida de um abrigo
      independente na Grande São Paulo.
    </p>

    <p>
      Entre resgates, doações e cuidados diários,
      precisa organizar inúmeras informações,
      mesmo com pouco tempo e recursos limitados.
    </p>

    <small>
      Helena é uma persona fictícia do projeto.
    </small>
  </div>

</section>

      
{/* SEÇÃO 3 — O desafio enfrentado pelos abrigos. */}
<section className="sobre-secao sobre-desafio">

  {/* Coluna esquerda: texto explicativo. */}
  <div className="sobre-conteudo">
    <span className="pagina-etiqueta">
      O DESAFIO
    </span>

    <h2>
      Cuidar de tantos animais já é um desafio.
      <span> Organizar tudo não deveria ser outro.</span>
    </h2>

    <p>
      Informações espalhadas em papéis,
      conversas e planilhas dificultam
      o acompanhamento da saúde dos animais,
      das despesas e dos compromissos do abrigo.
    </p>
  </div>

  {/* Coluna direita: segunda imagem da Helena. */}
  <div className="sobre-imagem">
    <img
      className="sobre-fotografia"
      src="/images/helena1.png"
      alt="Helena enfrentando desafios na organização do abrigo"
    />
  </div>

</section>


      {/* SEÇÃO 4 — Solução proposta pelo GerenciaCÃO. */}
      <section className="sobre-solucao">

        <span className="pagina-etiqueta">
          NOSSA SOLUÇÃO
        </span>

        <h2>
          Tudo o que importa, <span>em um só lugar.</span>
        </h2>

        <p>
          Com o GerenciaCÃO, queremos facilitar
          o registro das informações dos bichinhos,
          a organização financeira, os agendamentos
          e o acompanhamento dos processos de adoção.
        </p>

        {/* Cria um cartão para cada recurso principal. */}
        <div className="sobre-recursos">
          {recursos.map((recurso) => (
            <div
              className="sobre-recurso"
              key={recurso.nome}
            >
              <span>{recurso.simbolo}</span>
              <strong>{recurso.nome}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 5 — Propósito do projeto. */}
      <section className="sobre-proposito">

        <span className="pagina-etiqueta">
          NOSSO PROPÓSITO
        </span>

        <h2>
          A tecnologia organiza.
          <span> Quem cuida faz a diferença.</span>
        </h2>

        <p>
          Nosso propósito é oferecer uma ferramenta
          acolhedora, intuitiva e colaborativa,
          que apoie quem dedica seu tempo ao cuidado
          dos animais.
        </p>

        {/* Direciona para a página de funcionalidades. */}
        <button
          className="sobre-botao"
          onClick={onVerFuncionalidades}
        >
          Conhecer funcionalidades
        </button>
      </section>

      {/* Rodapé da página Sobre. */}
      <footer className="sobre-rodape">
        <p>© 2026 GerenciaCÃO</p>
        <p>Equipe 3 • Projeto acadêmico</p>
      </footer>
    </main>
  );
}

// Exporta o componente Sobre.
export default Sobre;

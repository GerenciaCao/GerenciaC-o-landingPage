
import "./pages.css";


// Lista dos integrantes do GerenciaCÃO.
// A propriedade "foto" informa o caminho da imagem de cada pessoa.
//
// As imagens devem estar dentro de public/images.
// Ajuste os nomes abaixo conforme os arquivos que você salvou.

const integrantes = [
  {
    nome: "Lucas Torino",
    funcao: "P.O. / Dados",
    foto: "/images/lucastorino.jpg",
  },
  {
    nome: "Giovanna",
    funcao: "Scrum Master / Marketing",
    foto: "/images/giovanna.jpg",
  },
  {
    nome: "Nikolas",
    funcao: "Documentação / Finanças",
    foto: "/images/nikolas.png",
  },
  {
    nome: "Emilly",
    funcao: "Desenvolvimento / IA",
    foto: "/images/emilly.png",
  },
  {
    nome: "Gustavo",
    funcao: "Desenvolvimento / Vendas",
    foto: "/images/gustavo.jpg",
  },
  {
    nome: "Max",
    funcao: "Desenvolvimento / Marketing",
    foto: "/images/max.png",
  },
  {
    nome: "Pedro",
    funcao: "Desenvolvimento / IA",
    foto: "/images/pedro.jpg",
  },
  {
    nome: "Thales",
    funcao: "Desenvolvimento / Marketing",
    foto: "/images/thales.jpg",
  },
];

// Componente reutilizável que representa um integrante.
// Recebe as informações do objeto pela propriedade pessoa.
function CartaoIntegrante({ pessoa }) {

  // Cria as iniciais do nome para usar na ausência da foto.
  const iniciais = pessoa.nome
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");

  return (
    <article className="equipe-cartao">

      {/* Fotografia ou iniciais do integrante. */}
      <div className="equipe-foto">
        {pessoa.foto ? (
          <img src={pessoa.foto} alt={pessoa.nome} />
        ) : (
          <span>{iniciais}</span>
        )}
      </div>

      {/* Nome e função do integrante. */}
      <div className="equipe-dados">
        <h2>{pessoa.nome}</h2>
        <p>{pessoa.funcao}</p>
      </div>
    </article>
  );
}

// Página completa de apresentação da equipe.
function Equipe() {
  return (
    <main className="equipe-pagina">

      {/* Apresentação da página. */}
      <section className="equipe-cabecalho">

        <span className="pagina-etiqueta">
          NOSSA EQUIPE
        </span>

        <h1>
          Conheça quem está por trás do
          <span> GerenciaCÃO</span>
        </h1>

        <p>
          Uma equipe de estudantes que uniu tecnologia,
          organização e criatividade para desenvolver
          uma solução voltada aos abrigos de animais.
        </p>
      </section>

      {/* Gera automaticamente um cartão por integrante. */}
      <section
        className="equipe-grade"
        aria-label="Integrantes da equipe"
      >
        {integrantes.map((pessoa) => (
          <CartaoIntegrante
            key={pessoa.nome}
            pessoa={pessoa}
          />
        ))}
      </section>

    </main>
  );
}

// Exporta a página para ser utilizada no App.jsx.
export default Equipe;

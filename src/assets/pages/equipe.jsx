
import "./pages.css";


// Lista dos integrantes do GerenciaCÃO.
// A propriedade "foto" informa o caminho da imagem de cada pessoa.
//
// As imagens devem estar dentro de public/images.
// Ajuste os nomes abaixo conforme os arquivos que você salvou.

const integrantes = [
  {
    nome: "Lucas Torino",
    linkedin: "https://www.linkedin.com/in/lucas-torino-91844843a/",
    funcao: "P.O. / Dados",
    foto: "/images/Torino.png",
  },
  {
    nome: "Giovanna Fernandes",
    linkedin: "https://www.linkedin.com/in/giovanna-fernandes-san/",
    funcao: "Scrum Master / Marketing",
    foto: "/images/giovanna.jpg",
  },
  {
    nome: "Nikolas De Paula",
    linkedin: "https://www.linkedin.com/in/nikolaspsousa/",
    funcao: "Documentação / Finanças",
    foto: "/images/nikolas.png",
  },
  {
    nome: "Emilly Keury",
    linkedin: "https://www.linkedin.com/in/emilly-coelho-458857390/",
    funcao: "Desenvolvimento / IA",
    foto: "/images/emilly.png",
  },
  {
    nome: "Gustavo Felipe",
    linkedin: "https://www.linkedin.com/in/gustavo-felipe10/",
    funcao: "Desenvolvimento / Vendas",
    foto: "/images/gusta.png",
  },
  {
    nome: "Max Arthur",
    linkedin: "https://www.linkedin.com/in/maxarthur/",
    funcao: "Desenvolvimento / Marketing",
    foto: "/images/max.jpeg",
  },
  {
    nome: "Pedro Henrique",
    linkedin: "https://www.linkedin.com/in/p3dru/",
    funcao: "Desenvolvimento / IA",
    foto: "/images/pedro.jpg",
  },
  {
    nome: "Thales Alexandre",
    linkedin: "https://www.linkedin.com/in/thalesascarvalho/",
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
    <a
      className="equipe-cartao"
      href={pessoa.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`LinkedIn de ${pessoa.nome} (abre em nova aba)`}
    >

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
        <span className="equipe-linkedin">Ver LinkedIn</span>
      </div>
    </a>
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


import "./funcionalidades.css";

/* ==========================================
   TELAS PRINCIPAIS DO APLICATIVO
========================================== */

// Essas duas funcionalidades já possuem imagens
// exportadas na pasta public/images.
const telasEmDestaque = [
  {
    id: "login",
    numero: "01",
    categoria: "CONTA E ACESSO",
    titulo: "Comece a organizar seu abrigo.",
    descricao:
      "Crie sua conta e acesse as informações do abrigo em um só lugar. A proposta também inclui opções para recuperar o acesso, caso você esqueça sua senha.",
    imagem: "/images/tela-login.png",
    textoAlternativo: "Tela de login do GerenciaCÃO",
    pontos: [
      "Cadastro e acesso",
      "Recuperação de senha",
    ],
  },
  {
    id: "painel",
    numero: "02",
    categoria: "VISÃO GERAL",
    titulo: "Tudo o que importa, em um só lugar.",
    descricao:
      "Acompanhe as informações mais recentes do abrigo, como fichas dos bichinhos, doações, despesas e adoções em andamento. Veja também como está a capacidade do espaço.",
    imagem: "/images/tela.png",
    textoAlternativo: "Tela inicial do GerenciaCÃO",
    pontos: [
      "Atividades recentes",
      "Finanças e adoções",
      "Capacidade do abrigo",
    ],
  },
];

/* ==========================================
   OUTRAS FUNCIONALIDADES
========================================== */

// Recursos previstos no Briefing e no Dossiê.
// Por enquanto, estes itens não dependem
// de imagens de telas ainda não finalizadas.
const recursos = [
  {
    id: "animais",
    numero: "03",
    icone: "🐾",
    titulo: "Ficha do bichinho",
    descricao:
      "Cada bichinho tem sua própria história. Reúna fotos, idade, informações de saúde e outros dados importantes em uma ficha que pode ser consultada e atualizada.",
    detalhes: [
      "Cadastro dos animais",
      "Histórico e cuidados",
      "Atualização das fichas",
    ],
  },
  {
    id: "financas",
    numero: "04",
    icone: "💰",
    titulo: "Finanças e doações",
    descricao:
      "Registre as despesas e as doações recebidas pelo abrigo. A proposta também inclui relatórios para facilitar o acompanhamento financeiro ao longo das semanas e dos meses.",
    detalhes: [
      "Registro de despesas",
      "Controle de doações",
      "Relatórios financeiros",
    ],
  },
  {
    id: "agenda",
    numero: "05",
    icone: "📅",
    titulo: "Calendário de cuidados",
    descricao:
      "Organize visitas, consultas e outros compromissos. Você poderá alterar datas e associar os bichinhos aos eventos para acompanhar melhor a rotina de cuidados.",
    detalhes: [
      "Agendamento de eventos",
      "Reagendamento",
      "Compromissos por bichinho",
    ],
  },
  {
    id: "adocoes",
    numero: "06",
    icone: "❤️",
    titulo: "Acompanhamento das adoções",
    descricao:
      "Acompanhe cada etapa da busca por um novo lar, desde o primeiro interesse até as visitas e o andamento do processo. Quando a adoção acontecer, a ficha poderá ser atualizada.",
    detalhes: [
      "Interessados em adotar",
      "Etapas da adoção",
      "Registro da adoção",
    ],
  },
  {
    id: "divulgacao",
    numero: "07",
    icone: "📣",
    titulo: "Divulgação dos bichinhos",
    descricao:
      "Prepare imagens para divulgar os animais utilizando modelos visuais e as informações já cadastradas. A proposta também contempla postagens para anunciar adoções realizadas.",
    detalhes: [
      "Modelos de divulgação",
      "Informações das fichas",
      "Postagens sobre adoções",
    ],
  },
  {
    id: "parcerias",
    numero: "08",
    icone: "🤝",
    titulo: "Parcerias e ofertas",
    descricao:
      "Encontre produtos e serviços relevantes para a rotina do abrigo, como ração, banho e tosa. O projeto prevê anúncios de parceiros, pesquisa por categorias e ofertas com descontos.",
    detalhes: [
      "Produtos e serviços",
      "Pesquisa por categoria",
      "Ofertas de parceiros",
    ],
  },
  {
    id: "abrigo",
    numero: "09",
    icone: "👥",
    titulo: "Organização da equipe",
    descricao:
      "Reúna as informações do abrigo e organize quem faz parte da equipe. Convide integrantes e defina diferentes permissões para que cada pessoa possa colaborar nas tarefas.",
    detalhes: [
      "Informações do abrigo",
      "Convites para integrantes",
      "Permissões da equipe",
    ],
  },
];

/* ==========================================
   COMPONENTE — SEÇÃO COM IMAGEM
========================================== */

// Recebe os dados de uma funcionalidade
// e cria uma seção amarela com texto e imagem.
function TelaEmDestaque({ tela }) {
  return (
    <section
      className="funcionalidade-faixa"
      id={tela.id}
    >
      <div className="funcionalidade-faixa-conteudo">

        {/* Coluna com as explicações da tela. */}
        <div className="funcionalidade-faixa-texto">

          <span className="funcionalidade-categoria">
            {tela.numero} / {tela.categoria}
          </span>

          <h2>{tela.titulo}</h2>

          <p>{tela.descricao}</p>

          {/* Pequenos destaques da funcionalidade. */}
          <ul className="funcionalidade-pontos">
            {tela.pontos.map((ponto) => (
              <li key={ponto}>{ponto}</li>
            ))}
          </ul>

        </div>

        {/* Exibe a imagem da tela do aplicativo. */}
        <div className="funcionalidade-faixa-imagem">
          <img
            src={tela.imagem}
            alt={tela.textoAlternativo}
          />
        </div>

      </div>
    </section>
  );
}

/* ==========================================
   COMPONENTE — CARTÃO DE FUNCIONALIDADE
========================================== */

// Cria um cartão explicativo para os recursos
// que ainda não possuem uma imagem final.
function CartaoFuncionalidade({ recurso }) {
  return (
    <article
      className="funcionalidade-cartao"
      id={recurso.id}
    >

      {/* Número e ilustração da funcionalidade. */}
      <div className="funcionalidade-cartao-topo">
        <span className="funcionalidade-cartao-icone">
          {recurso.icone}
        </span>

        <span className="funcionalidade-cartao-numero">
          {recurso.numero}
        </span>
      </div>

      {/* Nome e explicação do recurso. */}
      <h3>{recurso.titulo}</h3>
      <p>{recurso.descricao}</p>

      {/* Lista resumida das possibilidades. */}
      <ul className="funcionalidade-cartao-lista">
        {recurso.detalhes.map((detalhe) => (
          <li key={detalhe}>{detalhe}</li>
        ))}
      </ul>

    </article>
  );
}

/* ==========================================
   PÁGINA FUNCIONALIDADES
========================================== */

// Componente principal da página Funcionalidades.
function Funcionalidades() {
  return (
    <main className="funcionalidades-pagina">

      {/* Apresentação da página. */}
      <section className="funcionalidades-abertura">
        <span className="funcionalidades-etiqueta">
          FUNCIONALIDADES DO GERENCIACÃO
        </span>

        <h1>
          Um aplicativo pensado para
          <span> facilitar cada cuidado.</span>
        </h1>

        <p>
          Conheça os recursos que estamos desenvolvendo
          para reunir as informações do abrigo, organizar
          compromissos e apoiar quem cuida dos bichinhos.
        </p>
      </section>

      {/* Mostra as duas seções amarelas com imagens. */}
      <div className="funcionalidades-telas">
        {telasEmDestaque.map((tela) => (
          <TelaEmDestaque
            key={tela.id}
            tela={tela}
          />
        ))}
      </div>

      {/* Apresenta os demais recursos do projeto. */}
      <section className="funcionalidades-recursos">

        <div className="funcionalidades-recursos-cabecalho">
          <span className="funcionalidades-etiqueta">
            MAIS RECURSOS
          </span>

          <h2>
            Organização para diferentes
            <span> momentos da rotina.</span>
          </h2>

          <p>
            Da ficha de cada bichinho à organização
            da equipe, tudo foi pensado para ajudar
            nas atividades do abrigo.
          </p>
        </div>

        {/* Cria os cartões com base na lista de recursos. */}
        <div className="funcionalidades-grade">
          {recursos.map((recurso) => (
            <CartaoFuncionalidade
              key={recurso.id}
              recurso={recurso}
            />
          ))}
        </div>

      </section>

      {/* Encerramento da apresentação. */}
      <section className="funcionalidades-encerramento">

        <h2>
          A tecnologia organiza.
          <span> Quem cuida faz a diferença.</span>
        </h2>

        <p>
          O GerenciaCÃO está em desenvolvimento.
          As funcionalidades apresentadas fazem parte
          da proposta do projeto e poderão ser
          aprimoradas ao longo do desenvolvimento.
        </p>

      </section>

    </main>
  );
}

// Exporta a página para o App.jsx.
export default Funcionalidades;


import "./pages.css";

// E-mail oficial para contato com a equipe.
// Se o endereço mudar, basta alterar esta constante.
const EMAIL_EQUIPE = "demoday.gerenciacao@gmail.com";

// Componente responsável pela página Contato.
function Contato() {

  // Executada quando o usuário envia o formulário.
  function enviarMensagem(evento) {
    // Impede que o navegador recarregue a página.
    evento.preventDefault();

    // Captura os valores preenchidos no formulário.
    const dados = new FormData(evento.currentTarget);

    const nome = dados.get("nome");
    const email = dados.get("email");
    const mensagem = dados.get("mensagem");

    // Prepara o assunto do e-mail.
    const assunto = encodeURIComponent(
      "Contato pelo site GerenciaCÃO"
    );

    // Monta o corpo da mensagem.
    const corpo = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`
    );

    // Abre o aplicativo de e-mail do visitante.
    // O envio só ocorre quando ele confirmar no e-mail.
    window.location.href =
      `mailto:${EMAIL_EQUIPE}?subject=${assunto}&body=${corpo}`;
  }

  return (
    <main className="contato-pagina">
      {/* Coluna esquerda: apresentação e formas de contato. */}
      <section className="contato-informacoes">

        <span className="pagina-etiqueta">
          FALE COM A GENTE
        </span>

        <h1>
          Vamos conversar sobre o
          <br />
          <span>GerenciaCão?</span>
        </h1>

        <p>
          Tem alguma dúvida, sugestão ou interesse em
          conhecer melhor o nosso projeto? Entre em
          contato com a equipe!
        </p>

        {/* Contato direto por e-mail. */}
        <div className="contato-meio">
          <div className="contato-icone">
            ✉
          </div>

          <div>
            <strong>E-mail</strong>

            <a href={`mailto:${EMAIL_EQUIPE}`}>
              {EMAIL_EQUIPE}
            </a>
          </div>
        </div>
      </section>

      {/* Coluna direita: formulário de contato. */}
      <section className="contato-formulario-container">

        <h2>Envie uma mensagem</h2>

        <form
          className="contato-formulario"
          onSubmit={enviarMensagem}
        >
          {/* Campo para informar o nome. */}
          <div className="formulario-campo">
            <label htmlFor="contato-nome">
              Nome
            </label>

            <input
              id="contato-nome"
              name="nome"
              type="text"
              placeholder="Seu nome"
              autoComplete="name"
              required
            />
          </div>

          {/* Campo para informar o e-mail. */}
          <div className="formulario-campo">
            <label htmlFor="contato-email">
              E-mail
            </label>

            <input
              id="contato-email"
              name="email"
              type="email"
              placeholder="Seu melhor e-mail"
              autoComplete="email"
              required
            />
          </div>

          {/* Campo para escrever a mensagem. */}
          <div className="formulario-campo">
            <label htmlFor="contato-mensagem">
              Mensagem
            </label>

            <textarea
              id="contato-mensagem"
              name="mensagem"
              placeholder="Escreva sua mensagem..."
              rows="5"
              required
            />
          </div>

          {/* Botão de envio do formulário. */}
          <button type="submit" className="contato-enviar">
            Enviar mensagem
          </button>

        </form>
      </section>
    </main>
  );
}

// Permite importar esta página no App.jsx.
export default Contato;

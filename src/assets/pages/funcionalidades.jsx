import Demonstracao from "./demonstracao";
import "./funcionalidades.css";

export default function Funcionalidades() {
  return (
    <main className="funcionalidades-pagina">
      <section className="funcionalidades-abertura">
        <h1>Conheça o GerenciaCão <span>por dentro.</span></h1>
        <p>Entre na demonstração e explore a rotina do abrigo. A cada tela, descubra como o aplicativo ajuda a acompanhar os bichinhos, os cuidados e os recursos de quem acolhe.</p>
      </section>
      <Demonstracao />
      <section className="funcionalidades-encerramento">
        <h2>A tecnologia organiza. <span>Quem cuida faz a diferença.</span></h2>
        <p>O GerenciaCÃO está em desenvolvimento. As funcionalidades apresentadas fazem parte da proposta do projeto e poderão ser aprimoradas ao longo do desenvolvimento.</p>
      </section>
    </main>
  );
}

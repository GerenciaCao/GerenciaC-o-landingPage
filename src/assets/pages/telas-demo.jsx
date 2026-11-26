import { useState } from "react";

// Traduz as telas Compose do projeto GerenciaCaogusta em prévias para o navegador.
// Apenas filtros e navegação alteram estado; nenhum cadastro é persistido.
const imagens = "/images/demo";



export function CabecalhoApp({ navegar, inicio }) {
  const [menu, setMenu] = useState(false);
  function abrir(tela) { setMenu(false); navegar(tela); }
  return <header className="gc-android__cabecalho">
    <button type="button" className="gc-android__avatar" aria-label="Abrir perfil de Helena" onClick={()=>abrir("perfil")}><img src={`${imagens}/persona.png`} alt=""/></button>
    {inicio ? <div className="gc-android__saudacao"><strong>Olá, Helena!</strong><small>Administrador · Abrigo Esperança</small></div> : <div className="gc-android__espaco"/>}
    <button type="button" className="gc-android__menu-botao" aria-label="Abrir menu do aplicativo" aria-expanded={menu} onClick={()=>setMenu(m=>!m)}>⋮</button>
    {menu&&<div className="gc-android__menu"><button type="button" onClick={()=>abrir("perfil")}>Meu perfil</button><button type="button" onClick={()=>abrir("sair")}>Sair da conta</button></div>}
  </header>;
}

function Topo({ titulo, voltar }) {
  return <div className="gc-demo__topo-interno"><button className="gc-demo__voltar" aria-label="Voltar" type="button" onClick={voltar}>‹</button><div><strong>{titulo}</strong></div></div>;
}

const formularios = {
  "nova-ficha": { titulo: "Cadastrar bichinho", campos: ["Nome","Situação do animal","Espécie","Raça","Idade","Cor","Vacinações","Condições de saúde","Medicamentos em uso","Descrição","Observações adicionais"] },
  doacao: { titulo: "Registrar doação", campos: ["Valor *","Data *","Horário *","Bichinho relacionado · opcional","Descrição · opcional","Observações · opcional"] },
  despesa: { titulo: "Registrar despesa", campos: ["Descrição","Valor em reais","Data · DD/MM/AAAA","Observações · opcional"] },
  "novo-compromisso": { titulo: "Agendar cuidado", campos: ["Nome do compromisso","Categoria","Bichinho relacionado","Data · DD/MM/AAAA","Horário","Local · opcional","Observações · opcional"] },
  dados: { titulo: "Dados pessoais", campos: ["Nome","E-mail","Telefone com DDD"] },
};

const opcoes = [
  ["Cadastrar bichinho","Registre um animal no abrigo","nova-ficha","iconanimais.png"],
  ["Criar postagem","Prepare a divulgação de um bichinho","postagem","inicio_pata.svg"],
  ["Registrar doação","Anote o que o abrigo recebeu","doacao","inicio_carteira.svg"],
  ["Registrar despesa","Registre os gastos do abrigo","despesa","inicio_recibo.svg"],
  ["Agendar cuidado","Vacinas, visitas e serviços","novo-compromisso","iconcalendario.png"],
];

function PreviaFormulario({ config, cancelar, tela }) {
  const [tipo, setTipo] = useState("Dinheiro");
  return <><p className="gc-demo__nota">Formulário de demonstração. Os dados não são salvos.</p>
    {tela==="nova-ficha"&&<div className="gc-android__foto-ficha">Adicionar imagem</div>}
    {tela==="doacao"&&<div className="gc-demo__filtros">{["Dinheiro","Produtos"].map(t=><button type="button" key={t} aria-pressed={tipo===t} className={tipo===t?"ativo":""} onClick={()=>setTipo(t)}>{t}</button>)}</div>}
    <fieldset disabled className="gc-android__formulario"><legend>Informações do cadastro</legend>{(tela==="doacao"&&tipo==="Produtos"?["Título do produto *","Quantidade e unidade *",...config.campos.slice(1)]:config.campos).map((c,i)=><label key={c}>{c}<input placeholder={i===0?"Exemplo demonstrativo":""}/></label>)}<button className="gc-android__primario" type="button">Salvar</button></fieldset>
    <button type="button" className="gc-android__secundario" onClick={cancelar}>Cancelar</button>
  </>;
}

export function TelaComplementar({ tela, origem, voltar, navegar, sair, animais, abrirFicha }) {
  const titulos={adicionar:"Adicionar",compromisso:"Detalhes do compromisso",abrigo:"Meu abrigo",equipe:"Equipe do abrigo",arquivadas:"Fichas arquivadas",redes:"Redes e conexões",divulgacao:"Divulgação",postagem:"Criar postagem",relatorios:"Relatórios",notificacoes:"Notificações",seguranca:"Segurança e privacidade",aparencia:"Aparência e acessibilidade",ajuda:"Sobre o GerenciaCÃO",oferta:"Oferta de parceiro",sair:"Sair da conta?"};
  const formulario=formularios[tela];
  const adocao=tela.startsWith("adocao-")?animais.find(a=>a.id===tela.slice(7)):null;
  return <div className="gc-demo__pagina" key={tela}><Topo titulo={formulario?.titulo||titulos[tela]||(adocao?`Adoção de ${adocao.nome}`:"GerenciaCÃO")} voltar={voltar}/>
    {formulario&&<PreviaFormulario key={tela} config={formulario} cancelar={voltar} tela={tela}/>}
    {tela==="adicionar"&&<><h3>O que deseja adicionar?</h3><p>Escolha uma ação para organizar sua rotina.</p>{opcoes.filter(([, ,destino])=>origem==="financas"?["doacao","despesa"].includes(destino):origem==="animais"?["nova-ficha","postagem"].includes(destino):true).map(([nome,descricao,destino,icone])=><button type="button" className="gc-android__compromisso" key={destino} onClick={()=>navegar(destino)}><img src={`${imagens}/${icone}`} alt=""/><span><strong>{nome}</strong><small>{descricao}</small></span><b>›</b></button>)}</>}
    {tela==="arquivadas"&&<><h3>Nenhuma ficha arquivada</h3><p>As fichas de demonstração estão ativas na lista de animais.</p><button className="gc-android__primario" type="button" onClick={()=>navegar("animais")}>Ver animais</button></>}
    {tela==="divulgacao"&&<><h3>Ajude um bichinho a encontrar um lar</h3><p>Crie publicações com os dados da ficha e um modelo pronto.</p><h3>Como funciona</h3><p>1. Escolha o bichinho</p><p>2. Personalize o modelo</p><p>3. Revise e compartilhe</p><button className="gc-android__primario" type="button" onClick={()=>navegar("postagem")}>Criar postagem</button></>}
    {adocao&&<><h2>{adocao.nome}</h2><p>Pessoa de exemplo</p><h3>Etapas da adoção</h3>{["Pessoa interessada","Entrevista","Visita marcada","Acompanhamento"].map(e=><div className="gc-demo__linha-info" key={e}>{e}<span>{({lua:"Entrevista",bento:"Pessoa interessada",mel:"Visita marcada",tico:"Acompanhamento"})[adocao.id]===e?"Etapa atual":""}</span></div>)}<button className="gc-android__primario" type="button" onClick={()=>abrirFicha(adocao.id)}>Ver ficha de {adocao.nome}</button><button className="gc-android__secundario" type="button" onClick={()=>navegar("adocoes")}>Voltar às adoções</button></>}
    {tela==="notificacoes"&&<>{["Pausar todas as notificações","Modo descanso","Mensagens","Notificações por e-mail","Notificações por SMS"].map(n=><label className="gc-android__preferencia" key={n}>{n}<input type="checkbox" disabled/></label>)}<p className="gc-demo__nota">Preferências apenas para visualização.</p></>}
    {tela==="seguranca"&&<>{["Salvar informações da conta","Conta privada"].map(n=><label className="gc-android__preferencia" key={n}>{n}<input type="checkbox" disabled/></label>)}<p className="gc-demo__nota">Esta demonstração não utiliza autenticação nem armazena credenciais.</p></>}
    {tela==="aparencia"&&<><label className="gc-android__campo">Tema<select disabled><option>Claro</option></select></label><label className="gc-android__campo">Brilho<input type="range" disabled defaultValue="80"/></label><p className="gc-demo__nota">Prévia das preferências do aplicativo.</p></>}
    {tela==="ajuda"&&<><img className="gc-android__marca" src={`${imagens}/logolaranja.png`} alt="GerenciaCÃO"/><h2>Feito para quem acolhe</h2><p>Demonstração em React baseada nas telas e nos recursos do projeto GerenciaCaogusta, do Android Studio.</p><p>Navegação com dados ilustrativos, sem conexão a serviços externos.</p></>}
    {tela==="sair"&&<><p>Você voltará para a tela de login.</p><button type="button" className="gc-android__primario" onClick={sair}>Sair</button><button type="button" className="gc-android__secundario" onClick={voltar}>Cancelar</button></>}
  </div>;
}

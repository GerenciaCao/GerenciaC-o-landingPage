import { useState } from "react";
import { Escolha, Painel, Titulo } from "./componentes-app";
import { fotos } from "./dados-app";

const grupos=[
  ["MINHA CONTA",[["Dados pessoais","Nome, foto e contato","dados"],["Segurança e acesso","Senha e privacidade","seguranca"]]],
  ["PREFERÊNCIAS",[["Notificações","Lembretes e avisos","notificacoes"],["Aparência e acessibilidade","Tema, texto e leitura","aparencia"]]],
  ["PRECISA DE AJUDA?",[["Ajuda e sobre o aplicativo","","ajuda"]]]
];

export function PerfilApp({ voltar, navegar }){
  const [dados,setDados]=useState(false);
  function abrir(destino){if(destino==="dados")setDados(true);else navegar(destino);}
  return <div className="app-pagina"><Titulo voltar={voltar}>Meu perfil</Titulo>
    <div className="app-cartao app-identidade"><img src={fotos+"persona.png"} alt="Helena Silva"/><div><h3>Helena Silva</h3><small>Administrador</small><p>Abrigo Esperança</p><button onClick={()=>abrir("dados")}>Editar perfil</button></div></div>
    <div className="app-dupla app-atalhos-perfil">{[["Meu abrigo","Dados e contatos","abrigo"],["Equipe do abrigo","Membros e funções","equipe"]].map(([n,d,t])=><button key={t} onClick={()=>abrir(t)}><strong>{n}</strong><small>{d}</small></button>)}</div>
    {grupos.map(([titulo,itens])=><section className="app-grupo" key={titulo}><h3>{titulo}</h3><div className="app-cartao">{itens.map(([n,d,t])=><button key={t} onClick={()=>abrir(t)}><span><b>{n}</b>{d&&<small>{d}</small>}</span>›</button>)}</div></section>)}
    <button className="app-secundario" onClick={()=>navegar("sair")}>Sair da conta</button>
    {dados&&<Painel titulo="Editar perfil" fechar={()=>setDados(false)}>{[["Nome","Helena Silva"],["E-mail","helena@exemplo.com"],["Telefone com DDD","11999999999"]].map(([n,v])=><label key={n} className="app-campo">{n}<input value={v} readOnly/></label>)}<small>Dados da conta de demonstração.</small></Painel>}
  </div>;
}

const modelos=["Procura um lar","Foi adotado!","Conheça o bichinho"];
const tituloModelo=(nome,modelo)=>modelo===modelos[0]?nome+" procura um lar":modelo===modelos[1]?nome+" foi adotado!":"Conheça "+nome;
export function PostagemApp({ animais, voltar }){
  const [nome,setNome]=useState(animais[0].nome),[modelo,setModelo]=useState(modelos[0]);
  const pet=animais.find(a=>a.nome===nome);
  return <div className="app-pagina"><Titulo voltar={voltar}>Criar postagem</Titulo>
    <Escolha nome="Bichinho" valor={nome} alterar={setNome} opcoes={animais.map(a=>a.nome)}/>
    <div className="app-chips">{modelos.map(m=><button key={m} aria-pressed={modelo===m} onClick={()=>setModelo(m)}>{m}</button>)}</div>
    <ArtePostagem key={pet.id+modelo} pet={pet} modelo={modelo}/></div>;
}
function ArtePostagem({pet,modelo}){
  const [editar,setEditar]=useState(false);
  const [titulo,setTitulo]=useState(tituloModelo(pet.nome,modelo));
  const [texto,setTexto]=useState(pet.idade+" · SRD\n"+pet.sobre);
  return <><h3>Prévia da publicação</h3><div className="app-postagem"><img src={fotos+"inicio_pata.svg"} alt=""/><strong>{titulo}</strong><p>{texto}</p><small>Abrigo Esperança</small></div>
    <button onClick={()=>setEditar(!editar)}>{editar?"Ocultar edição":"Editar texto"}</button>
    {editar&&<><label className="app-campo">Título da publicação<input maxLength={120} value={titulo} onChange={e=>setTitulo(e.target.value)}/></label>
      <label className="app-campo">Texto da publicação<textarea rows="4" maxLength="420" value={texto} onChange={e=>setTexto(e.target.value)}/></label></>}
    <p>O compartilhamento da publicação está disponível no aplicativo.</p></>;
}

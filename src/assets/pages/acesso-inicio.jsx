import { useState } from "react";
import { Carrossel, CartaoEvento } from "./componentes-app";
import { diaLocal, eventos, fotos } from "./dados-app";

export function Acesso({ entrar }){
  const [tela,setTela]=useState("login");
  const [mostrar,setMostrar]=useState(false);
  const [aviso,setAviso]=useState("");
  function abrir(destino){ setAviso(""); setMostrar(false); setTela(destino); }
  const login=tela==="login", cadastro=tela==="cadastro";
  function enviar(e){
    e.preventDefault();
    if(login) entrar();
    else setAviso(cadastro?"Cadastro disponível no aplicativo.":"Recuperação de senha disponível no aplicativo.");
  }
  return <div className="app-acesso">
    <img className="app-marca" src={fotos+"marca-login.png"} alt="GerenciaCÃO" />
    <h2>{login?"Acesse sua conta":cadastro?"Criar sua conta":"Recuperar senha"}</h2>
    <p>{login?"Continue organizando seu abrigo.":cadastro?"É rápido. Vamos começar?":"Digite o e-mail da sua conta."}</p>
    <form key={tela} onSubmit={enviar} autoComplete="off">
      {cadastro&&<label>Nome<input placeholder="Seu nome" /></label>}
      <label>E-mail<input name="email" type="email" placeholder="Seu e-mail" required /></label>
      {(login||cadastro)&&<label>Senha<span className="app-senha"><input type={mostrar?"text":"password"} placeholder="Digite sua senha" autoComplete="new-password" required minLength={8}/><button type="button" onClick={()=>setMostrar(!mostrar)}>{mostrar?"Ocultar":"Mostrar"}</button></span></label>}
      {cadastro&&<label>Confirmar senha<input type="password" autoComplete="new-password" placeholder="Confirme sua senha" /></label>}
      {login&&<><button className="app-esqueceu" type="button" onClick={()=>abrir("recuperar")}>Esqueci minha senha</button>
        <button className="app-demobtn" type="button" onClick={entrar}>Demonstração</button></>}
      <button className="app-entrar" type="submit">{login?"Entrar":cadastro?"Cadastrar":"Enviar instruções"}</button>
    </form>
    {aviso&&<p role="status">{aviso}</p>}
    {login?<><p>Ainda não tem conta? <button onClick={()=>abrir("cadastro")}>Criar minha conta</button></p>
      <div className="app-ou">ou continue com</div><div className="app-social">{["Google","Microsoft","Facebook"].map((s,i)=><button key={s} aria-label={s} onClick={()=>setAviso("Login com "+s+" disponível no aplicativo.")}>{["G","▦","f"][i]}</button>)}</div></>:
      <button onClick={()=>abrir("login")}>{cadastro?"Já tem uma conta? Entrar":"Voltar para entrar"}</button>}
  </div>;
}

export function Ocupacao({ animais }){
  const adotados=animais.filter(a=>a.status==="Adotado").length;
  const acolhidos=animais.length-adotados;
  const percentual=Math.round(100*acolhidos/60);
  return <div className="app-ocupacao"><div className="app-anel" style={{"--ocupado":percentual+"%"}}><b>{percentual}%</b><small>ocupado</small></div>
    <dl>{[["Vagas disponíveis",60-acolhidos],["Animais adotados",adotados],["Animais no abrigo",acolhidos]].map(([n,v])=><div key={n}><dt>{n}</dt><dd>{v}</dd></div>)}</dl></div>;
}

export function InicioApp({ navegar, animais }){
  const [aberto,setAberto]=useState(null);
  const [hoje]=useState(()=>new Date());
  const dias=Array.from({length:7},(_,i)=>new Date(hoje.getFullYear(),hoje.getMonth(),hoje.getDate()+i));
  const registros=eventos.filter(e=>e.data===aberto);
  return <div className="app-pagina">
    <Carrossel rotulo="Banner do início" permitirPausa slides={[
      <div key="loja" className="app-banner-home"><div><strong>Cuidar do seu pet custa menos!</strong><button onClick={()=>navegar("parcerias")}>Ir para Loja</button></div><img src={fotos+"cachorroinicio.png"} alt=""/></div>,
      <button key="pedigree" className="app-banner-img" onClick={()=>navegar("parcerias")}><img src={fotos+"bannerpedigree.png"} alt="Pedigree · Ir para Loja"/></button>
    ]}/>
    <h3>Ações rápidas</h3>
    <div className="app-atalhos">{[["Cadastrar animal","nova-ficha","iconanimais.png"],["Registrar doação","doacao","inicio_carteira.svg"],["Registrar despesa","despesa","inicio_recibo.svg"]].map(([label,tela,img])=><button key={tela} onClick={()=>navegar(tela)}><img src={fotos+img} alt=""/>{label}</button>)}</div>
    <div className="app-linha"><h3>Agenda</h3><button onClick={()=>navegar("agenda")}>Ver agenda</button></div>
    <div className="app-semana">{dias.map(d=>{
      const id=diaLocal(d);
      return <button key={id} aria-pressed={aberto===id} onClick={()=>setAberto(aberto===id?null:id)}>
        <small>{d.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".","")}</small><b>{d.getDate()}</b></button>;
    })}</div>
    {aberto&&<div className="app-cartao"><strong>Compromissos de {aberto.split("-").reverse().join("/")}</strong>
      {registros.length?registros.map(e=><CartaoEvento key={e.id} evento={e} abrir={()=>navegar("evento",e.id)}/>):<p>Nenhum compromisso neste dia.</p>}
      <button onClick={()=>navegar("agenda",aberto)}>Abrir este dia na agenda</button></div>}
    <div className="app-cartao"><div className="app-linha"><h3>Nível de ocupação</h3><button onClick={()=>navegar("abrigo")}>Ver dados</button></div><Ocupacao animais={animais}/></div>
    <button className="app-cartao app-item" onClick={()=>navegar("redes")}><img className="app-avatar" src={fotos+"iconabrigos.png"} alt=""/><span><b>Encontre cuidadores perto de você</b><small>Conheça outros abrigos e quem acolhe na sua região.</small></span>›</button>
  </div>;
}

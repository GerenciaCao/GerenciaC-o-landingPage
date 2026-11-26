import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./demonstracao.css";
import { CabecalhoApp, TelaComplementar } from "./telas-demo";
import "./telas-demo.css";

import { Acesso, InicioApp } from "./acesso-inicio";
import { AgendaApp, EventoApp, FinancasApp } from "./agenda-financas";
import { AbrigoApp, AdocoesApp, AnimaisApp, EquipeApp, FichaApp } from "./animais-app";
import { LojaApp, RedesApp } from "./loja-redes";
import { PerfilApp, PostagemApp } from "./perfil-postagem";
import "./interface-app.css";
import { explicacaoDaTela } from "./explicacoes-demo";

/*
 * GERENCIACÃO — DEMONSTRAÇÃO NAVEGÁVEL
 *
 * Esta é uma reprodução demonstrativa feita em React, baseada na identidade
 * visual, nos layouts Compose e nos recursos do projeto Android Studio. Não executa o APK Android,
 * não acessa servidor e não registra/edita dados reais.
 *
 * Todas as interações de navegação acontecem DENTRO do aparelho.
 */

const imagens = "/images/demo";
// Dados fictícios para permitir explorar as telas sem conectar um banco.
const bichinhos = [
  { id: "lua", nome: "Lua", idade: "2 anos", especie: "Gatos", sexo: "Fêmea", castrado: "Castrada", imagem: `${imagens}/gato1.png`, status: "Disponível", sobre: "Lua é uma gatinha carinhosa, curiosa e tranquila. Gosta de companhia e de brincar." },
  { id: "bento", nome: "Bento", idade: "5 anos", especie: "Cães", sexo: "Macho", castrado: "Castrado", imagem: `${imagens}/dog1.png`, status: "Disponível", sobre: "Bento é um cão companheiro e sociável. Gosta de passear e receber carinho." },
  { id: "mel", nome: "Mel", idade: "1 ano", especie: "Cães", sexo: "Fêmea", castrado: "Não informado", imagem: null, status: "Visita marcada", sobre: "Mel é brincalhona e gosta de companhia." },
  { id: "tico", nome: "Tico", idade: "3 anos", especie: "Cães", sexo: "Macho", castrado: "Não informado", imagem: null, status: "Adotado", sobre: "Tico é um animal fictício usado para demonstrar o acompanhamento da adoção." },
];

function NavegacaoInterna({ tela, navegar }) {
  const itens = [
    { tela: "inicio", rotulo: "Início", imagem: "iconhome.png" },
    { tela: "parcerias", rotulo: "Loja", imagem: "inicio_loja.svg" },
    { tela: "animais", rotulo: "Animais", imagem: "iconanimais.png" },
    { tela: "financas", rotulo: "Finanças", imagem: "inicio_carteira.svg" },
    { tela: "agenda", rotulo: "Agenda", imagem: "iconcalendario.png" },

  ];
  return (
    <nav className="gc-demo__nav-app" aria-label="Navegação dentro do aplicativo">
      {itens.map((item) => (
        <button key={item.tela} type="button" onClick={() => navegar(item.tela)} className={tela === item.tela || (tela === "ficha" && item.tela === "animais") ? "ativo" : ""} aria-current={tela === item.tela ? "page" : undefined}>
          {item.imagem ? <img src={`${imagens}/${item.imagem}`} alt="" /> : <span aria-hidden="true">{item.icone}</span>}
          <small>{item.rotulo}</small>
        </button>
      ))}
    </nav>
  );
}

const abas = ["inicio","parcerias","animais","financas","agenda"];
const azul = ["perfil","abrigo","equipe","redes","dados","notificacoes","seguranca","aparencia","ajuda"];

function Relogio(){
  const [hora,setHora]=useState(()=>new Date());
  useEffect(()=>{
    const timer=setInterval(()=>setHora(new Date()),30000);
    return ()=>clearInterval(timer);
  },[]);
  return hora.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
}

export default function Demonstracao(){
  const [historico,setHistorico]=useState([]);
  const [conexoes,setConexoes]=useState([]);
  const moldura=useRef(null);
  const iniciada=historico.length>0;
  const atual=historico.at(-1)?.tela || "login";
  useLayoutEffect(()=>{
    const el=moldura.current;
    function ajustar(){el.style.setProperty("--escala-app",el.clientWidth/392);}
    ajustar();
    const observador=new ResizeObserver(ajustar);
    observador.observe(el);
    return ()=>observador.disconnect();
  },[]);
  function navegar(tela,alvo){
    setHistorico(h=>{
      if(h.at(-1)?.tela===tela && h.at(-1)?.alvo===alvo) return h;
      const anterior=h.findLastIndex(r=>r.tela===tela && r.alvo===alvo);
      return anterior<0?[...h,{tela,alvo}]:h.slice(0,anterior+1);
    });
  }
  function voltar(){setHistorico(h=>h.length>1?h.slice(0,-1):[{tela:"inicio"}]);}
  function abrirAba(tela){setHistorico([{tela}]);}
  function sair(){setHistorico([]);setConexoes([]);}
  const abrirFicha=id=>navegar("ficha",id);
  const alternar=id=>setConexoes(lista=>lista.includes(id)?lista.filter(x=>x!==id):[...lista,id]);
  const abaAtual=historico.filter(h=>abas.includes(h.tela)).at(-1)?.tela || "inicio";
  const explicacao=explicacaoDaTela(atual, abaAtual);
  function renderizar({tela,alvo}){
    switch(tela){
      case "inicio": return <InicioApp navegar={navegar} animais={bichinhos}/>;
      case "animais": return <AnimaisApp animais={bichinhos} navegar={navegar}/>;
      case "ficha": return <FichaApp pet={bichinhos.find(p=>p.id===alvo)} voltar={voltar} navegar={navegar}/>;
      case "adocoes": return <AdocoesApp animais={bichinhos} voltar={voltar} navegar={navegar}/>;
      case "parcerias": return <LojaApp/>;
      case "financas": return <FinancasApp navegar={navegar}/>;
      case "agenda": return <AgendaApp dataAlvo={alvo} navegar={navegar}/>;
      case "evento": return <EventoApp id={alvo} voltar={voltar} abrirFicha={abrirFicha}/>;
      case "abrigo": return <AbrigoApp animais={bichinhos} voltar={voltar} navegar={navegar}/>;
      case "equipe": return <EquipeApp voltar={voltar}/>;
      case "redes": return <RedesApp voltar={voltar} conexoes={conexoes} alternar={alternar}/>;
      case "perfil": return <PerfilApp navegar={navegar} voltar={voltar}/>;
      case "postagem": return <PostagemApp animais={bichinhos} voltar={voltar}/>;
      default: return <TelaComplementar tela={tela} origem={alvo} voltar={voltar} navegar={navegar} sair={sair} animais={bichinhos} abrirFicha={abrirFicha}/>;
    }
  }
  return <section className={"gc-demo"+(iniciada?" gc-demo--iniciada":"")} aria-label="Demonstração navegável do GerenciaCÃO">
    <div className="gc-demo__inner">{iniciada&&<div className="gc-demo__explicacao" key={atual} aria-live="polite">
      <span className="gc-demo__etiqueta">{explicacao.secao}</span><h2>{explicacao.titulo}</h2><p>{explicacao.descricao}</p>
      <ul className="gc-demo__topicos">{explicacao.topicos.map(topico=><li key={topico}>{topico}</li>)}</ul>
      <div className="gc-demo__explorar"><strong>Experimente nesta tela</strong><p>{explicacao.explorar}</p></div></div>}
      <div className="gc-demo__coluna-celular"><div className="gc-demo__aparelho" aria-label="Prévia interativa do aplicativo GerenciaCÃO">
        <div ref={moldura} className="gc-demo__screen" data-cor={azul.includes(atual)?"azul":iniciada?"laranja":"creme"}>
          <div className="gc-demo__statusbar" aria-hidden="true"><span><Relogio/> ⚙</span><span>▴ ◔ ▰</span></div>
          {iniciada&&<CabecalhoApp key={atual} navegar={navegar} inicio={atual==="inicio"}/>}
          {!iniciada&&<div className="gc-demo__rolagem"><Acesso entrar={()=>abrirAba("inicio")}/></div>}
          {historico.map((rota,i)=><div className="gc-demo__rolagem" key={i+"-"+rota.tela+"-"+(rota.alvo||"")} hidden={i!==historico.length-1}>{renderizar(rota)}</div>)}
          {iniciada&&<NavegacaoInterna tela={abaAtual} navegar={abrirAba}/>}<div className="gc-demo__barra-gesto" aria-hidden="true"/>
        </div></div>
        {!iniciada&&<p className="gc-demo__instrucoes">Toque em <strong>“Demonstração”</strong> dentro do celular para explorar o GerenciaCÃO.</p>}
      </div></div></section>;
}

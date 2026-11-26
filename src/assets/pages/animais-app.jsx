import { useState } from "react";
import { Titulo, Busca, Painel, Escolha } from "./componentes-app";
import { fotos, normalizar } from "./dados-app";
import { Ocupacao } from "./acesso-inicio";

const etapas={lua:"Entrevista",bento:"Pessoa interessada",mel:"Visita marcada",tico:"Acompanhamento"};
function Foto({ pet }){
  return pet.imagem?<img className="app-avatar" src={pet.imagem} alt=""/>:<span className="app-inicial">{pet.nome[0]}</span>;
}
function Situacao({ situacao }){
  return <span className="app-situacao" data-situacao={situacao}>● {situacao}</span>;
}

export function AnimaisApp({ animais, navegar }){
  const [busca,setBusca]=useState(""),[especie,setEspecie]=useState("Todos"),[situacao,setSituacao]=useState("Todas"),[filtros,setFiltros]=useState(false);
  const lista=animais.filter(p=>normalizar(p.nome).includes(normalizar(busca)) && (especie==="Todos" || p.especie===especie) && (situacao==="Todas" || p.status===situacao));
  return <div className="app-pagina"><Titulo acao="+ Adicionar" aoClicar={()=>navegar("adicionar","animais")}>Animais</Titulo>
    <Busca texto="Buscar por ficha" valor={busca} alterar={setBusca} filtro={()=>setFiltros(true)}/>
    <div className="app-especies"><div className="app-chips">{["Todos","Cães","Gatos"].map((s,i)=><button key={s} aria-pressed={s===especie} onClick={()=>setEspecie(s)}>
      {i>0&&<img src={fotos+(i===1?"icondog":"iconcat")+".png"} alt=""/>}{s}</button>)}</div>
      <button className="app-arquivo" onClick={()=>navegar("arquivadas")}><b>▤</b>Fichas arquivadas</button></div>
    <div className="app-linha"><h3>Fichas do abrigo</h3><small>{lista.length} {lista.length===1?"ficha":"fichas"}</small></div>
    {lista.map(p=><button className="app-cartao app-item app-animal" key={p.id} onClick={()=>navegar("ficha",p.id)}><Foto pet={p}/><span><strong>{p.nome}</strong><small>{p.idade}</small></span><Situacao situacao={p.status}/></button>)}
    {!lista.length&&<p>Nenhum bichinho encontrado.</p>}
    <button className="app-secundario" onClick={()=>navegar("adocoes")}>Acompanhar adoções</button>
    <button className="app-secundario" onClick={()=>navegar("divulgacao")}>Divulgação dos bichinhos</button>
    {filtros&&<Painel titulo="Filtrar fichas" fechar={()=>setFiltros(false)}><Escolha nome="Situação do animal" valor={situacao} alterar={setSituacao} opcoes={["Todas","Disponível","Visita marcada","Em tratamento","Adotado"]}/><button className="app-primario" onClick={()=>setFiltros(false)}>Aplicar filtro</button></Painel>}
  </div>;
}

export function FichaApp({ pet, voltar, navegar }){
  return <div className="app-pagina"><Titulo voltar={voltar}>Ficha do bichinho</Titulo>
    <div className="app-foto-ficha">{pet.imagem?<img src={pet.imagem} alt={pet.nome}/>:<span>Foto não cadastrada</span>}</div>
    <div className="app-linha"><h2>{pet.nome}</h2><Situacao situacao={pet.status}/></div>
    <div className="app-cartao"><h3>Dados do animal</h3><dl className="app-dados">
      {[[ "Espécie",pet.especie==="Gatos"?"Gato":"Cão"],["Raça","SRD"],["Idade",pet.idade],["Sexo",pet.sexo],["Status reprodutivo",pet.castrado]].map(([n,v])=><div key={n}><dt>{n}</dt><dd>{v}</dd></div>)}</dl></div>
    <h3>Sobre {pet.nome}</h3><p>{pet.sobre}</p><h3>Histórico de saúde</h3>
    <div className="app-historico"><strong>Nenhum registro cadastrado</strong><p>Vacinas, consultas e tratamentos aparecerão aqui.</p></div>
    <button className="app-primario" onClick={()=>navegar("adocao-"+pet.id)}>Acompanhar adoção</button>
  </div>;
}

export function AdocoesApp({ animais, voltar, navegar }){
  const [busca,setBusca]=useState(""),[etapa,setEtapa]=useState("Todas");
  const lista=animais.filter(p=>normalizar(p.nome+" Pessoa de exemplo").includes(normalizar(busca)) && (etapa==="Todas"||etapas[p.id]===etapa));
  return <div className="app-pagina"><Titulo voltar={voltar}>Adoções</Titulo><Busca valor={busca} alterar={setBusca} texto="Buscar bichinho ou pessoa"/>
    <Escolha nome="Etapa" valor={etapa} alterar={setEtapa} opcoes={["Todas",...new Set(Object.values(etapas))]}/>
    <h3>Processos em andamento</h3>{lista.map(p=><button className="app-cartao app-item" key={p.id} onClick={()=>navegar("adocao-"+p.id)}><Foto pet={p}/><span><strong>{p.nome}</strong><small>Pessoa de exemplo · {etapas[p.id]}</small></span>›</button>)}
    {!lista.length&&<p>Nenhum processo encontrado.</p>}</div>;
}

export function AbrigoApp({ animais, voltar, navegar }){
  return <div className="app-pagina"><Titulo voltar={voltar}>Meu abrigo</Titulo><img className="app-capa" src={fotos+"abrigopersona.jpg"} alt="Abrigo Esperança"/>
    <h2>Abrigo Esperança</h2><div className="app-cartao"><h3>Ocupação</h3><p>Capacidade do abrigo · 60 animais</p><Ocupacao animais={animais}/></div>
    <button className="app-secundario" onClick={()=>navegar("equipe")}>Ver equipe do abrigo</button></div>;
}

export function EquipeApp({voltar}){
  const [busca,setBusca]=useState(""),[membro,setMembro]=useState(null);
  const equipe=[["Helena","Administrador"],["Ana","Cuidador"],["Paulo","Voluntário"]].filter(([nome,funcao])=>normalizar(nome+" "+funcao).includes(normalizar(busca)));
  return <div className="app-pagina"><Titulo voltar={voltar}>Equipe do abrigo</Titulo><Busca valor={busca} alterar={setBusca} texto="Pesquisar membro"/>
    {equipe.map(([nome,funcao])=><button key={nome} className="app-cartao app-item" onClick={()=>setMembro([nome,funcao])}><span className="app-inicial">{nome[0]}</span><span><strong>{nome}</strong><small>{funcao}</small></span>›</button>)}
    {!equipe.length&&<p>Nenhum integrante encontrado.</p>}
    {membro&&<Painel titulo="Perfil do integrante" fechar={()=>setMembro(null)}><h3>{membro[0]}</h3><p>{membro[1]} · Abrigo Esperança</p></Painel>}</div>;
}

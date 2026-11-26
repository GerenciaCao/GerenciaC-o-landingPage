import { useState } from "react";
import { Busca, Carrossel, Escolha, Painel, Titulo } from "./componentes-app";
import { abrigos, banners, fotos, moeda, normalizar, ofertas } from "./dados-app";

const padrao={categoria:"Todas",parceiro:"Todos",min:"",max:"",ordem:"Destaques",especie:""};
const servicos=[["Banho e tosa","bannerbanhoetosa","Serviços"],["Clínicas veterinárias","bannerclinicas","Saúde"]];
const preco = i => i.preco===null?"Consultar valor":moeda(i.preco);
const contem=(texto,busca)=>normalizar(texto).includes(normalizar(busca));

export function LojaApp(){
  const [aba,setAba]=useState("Produtos"),[busca,setBusca]=useState("");
  const [filtro,setFiltro]=useState(padrao),[rascunho,setRascunho]=useState(null);
  const [servico,setServico]=useState(""),[selecionada,setSelecionada]=useState(null);
  const catalogo=ofertas.filter(i=>i.servico===(aba==="Serviços"));
  const filtrando=Object.keys(padrao).some(k=>filtro[k]!==padrao[k]) || !!busca;
  const visiveis=catalogo.filter(i=>contem(i.nome+" "+i.parceiro+" "+i.categoria,busca)
    && (!servico || i.categoria===servico)
    && (filtro.categoria==="Todas" || i.categoria===filtro.categoria)
    && (filtro.parceiro==="Todos" || i.parceiro===filtro.parceiro)
    && (!filtro.especie || filtro.especie==="Ambos" || i.especie==="Ambos" || i.especie===filtro.especie)
    && (!filtro.min || (i.preco!==null && i.preco>=Number(filtro.min)*100))
    && (!filtro.max || (i.preco!==null && i.preco<=Number(filtro.max)*100)));
  if(filtro.ordem!=="Destaques"){
    visiveis.sort((a,b)=>a.preco===null?Number(b.preco!==null):b.preco===null?-1:
      (filtro.ordem==="Menor preço"?1:-1)*(a.preco-b.preco));
  }
  function limpar(){setBusca("");setFiltro(padrao);setServico("");}
  function campo(k,v){setRascunho({...rascunho,[k]:v});}
  const precosInvalidos=rascunho?.max && rascunho.min && Number(rascunho.max)<Number(rascunho.min);
  const categorias=aba==="Serviços" && !servico;
  return <div className="app-pagina"><Titulo>Parcerias</Titulo>
    <Busca valor={busca} alterar={setBusca} texto="Buscar produtos ou serviços" filtro={()=>setRascunho({...filtro})}/>
    <div className="app-abas">{["Produtos","Serviços"].map(t=><button key={t} aria-pressed={t===aba} onClick={()=>{setAba(t);limpar();}}>{t}</button>)}</div>
    {filtrando&&<button onClick={limpar}>‹ Voltar para a vitrine</button>}
    {[filtro.categoria==="Todas"?"":filtro.categoria,filtro.especie].filter(Boolean).length>0&&<p className="app-chip">{[filtro.categoria==="Todas"?"":filtro.categoria,filtro.especie].filter(Boolean).join(" · ")}</p>}
    {aba==="Produtos"&&!filtrando&&<Carrossel rotulo="Banner da loja" slides={banners.map(([arquivo,nome,categoria,especie])=><button key={arquivo} className="app-banner-img" onClick={()=>setFiltro({...padrao,categoria,especie})}><img src={fotos+arquivo+".png"} alt={nome}/></button>)}/>}
    {categorias ? <div>{servicos.filter(([nome,,cat])=>contem(nome,busca)&&(filtro.categoria==="Todas" || filtro.categoria===cat)).map(([nome,arquivo,cat])=><button className="app-servico" key={cat} onClick={()=>{setServico(cat);setBusca("");}}><img src={fotos+arquivo+".png"} alt={nome}/></button>)}
      {!servicos.some(([nome,,cat])=>contem(nome,busca)&&(filtro.categoria==="Todas"||filtro.categoria===cat))&&<p>Nenhuma categoria encontrada.</p>}</div>:
      <>{servico&&<button onClick={()=>{setServico("");setBusca("");}}>‹ Todas as categorias</button>}
      <h3>{servico?servicos.find(([, ,c])=>c===servico)?.[0]:filtrando?"Resultados":"Produtos em destaque"}</h3>
      <div className={servico?"app-lista":"app-vitrine"}>{visiveis.map(i=><button key={i.nome+i.parceiro} className="app-produto" onClick={()=>setSelecionada(i)}>
        {!servico&&<div className="app-produto-imagem">{i.foto?<img src={fotos+i.foto+".png"} alt=""/>:<img className="app-produto-icone" src={fotos+"inicio_loja.svg"} alt=""/>}</div>}
        <strong>{servico?i.parceiro:i.nome}</strong><small>{servico?i.nome:i.parceiro}</small><b>{preco(i)}</b></button>)}</div>
      {!visiveis.length&&<p>Nenhuma oferta encontrada.</p>}</>}
    {rascunho&&<Painel titulo="Filtrar ofertas" fechar={()=>setRascunho(null)}>
      <Escolha nome="Categoria" valor={rascunho.categoria} alterar={v=>campo("categoria",v)} opcoes={["Todas",...new Set([...catalogo.map(i=>i.categoria),...(aba==="Produtos"?banners.map(b=>b[2]):[])])]}/>
      <Escolha nome="Parceiro" valor={rascunho.parceiro} alterar={v=>campo("parceiro",v)} opcoes={["Todos",...new Set(catalogo.map(i=>i.parceiro))]}/>
      <div className="app-dupla">{[["min","Preço mínimo"],["max","Preço máximo"]].map(([k,n])=><label key={k} className="app-campo">{n}<input type="number" min="0" step="0.01" value={rascunho[k]} onChange={e=>campo(k,e.target.value)}/></label>)}</div>
      <Escolha nome="Ordenar por" valor={rascunho.ordem} alterar={v=>campo("ordem",v)} opcoes={["Destaques","Menor preço","Maior preço"]}/>
      {precosInvalidos&&<p role="alert">O preço máximo precisa ser maior ou igual ao mínimo.</p>}
      <button className="app-primario" disabled={!!precosInvalidos || Number(rascunho.min)<0 || Number(rascunho.max)<0} onClick={()=>{setFiltro(rascunho);setRascunho(null);}}>Aplicar filtros</button><button className="app-secundario" onClick={()=>setRascunho({...padrao})}>Limpar filtros</button>
    </Painel>}
    {selecionada&&<Painel titulo={selecionada.nome} fechar={()=>setSelecionada(null)}>
      {selecionada.foto&&<img className="app-oferta-foto" src={fotos+selecionada.foto+".png"} alt={selecionada.nome}/>}
      <strong>{preco(selecionada)}</strong><p>{selecionada.parceiro}</p><p>{selecionada.descricao}</p><small>Oferta demonstrativa do parceiro.</small>
    </Painel>}
  </div>;
}

export function RedesApp({ voltar, conexoes, alternar }){
  const [busca,setBusca]=useState(""),[aba,setAba]=useState("Explorar"),[filtros,setFiltros]=useState(false);
  const [cidade,setCidade]=useState("Todas"),[raio,setRaio]=useState("Todos"),[vagas,setVagas]=useState(false),[ordem,setOrdem]=useState("Distância");
  const [abrigo,setAbrigo]=useState(null);
  const lista=abrigos.filter(a=>contem(a.nome+" "+a.cidade+" "+a.bairro,busca) && (cidade==="Todas" || cidade===a.cidade)
    && (raio==="Todos" || a.km<=parseInt(raio)) && (!vagas || a.capacidade>a.animais)
    && (aba==="Explorar" || conexoes.includes(a.foto))).sort((a,b)=>ordem==="Distância"?a.km-b.km:a.nome.localeCompare(b.nome,"pt-BR"));
  return <div className="app-pagina"><Titulo voltar={voltar}>Redes e conexões</Titulo>
    <Busca valor={busca} alterar={setBusca} texto="Buscar por nome ou cidade" filtro={()=>setFiltros(true)}/>
    <div className="app-abas">{["Explorar","Minhas conexões"].map(t=><button key={t} aria-pressed={t===aba} onClick={()=>setAba(t)}>{t}</button>)}</div>
    {lista.map(a=><button key={a.foto} className="app-cartao app-item" onClick={()=>setAbrigo(a)}><img className="app-avatar" src={fotos+a.foto+".png"} alt=""/><span><strong>{a.nome}</strong><small>{a.bairro} · {a.cidade}</small><small>{a.km.toLocaleString("pt-BR")} km · exemplo</small></span>›</button>)}
    {!lista.length&&<p>{aba==="Explorar"?"Nenhum abrigo encontrado.":"Nenhuma conexão encontrada."}</p>}
    {filtros&&<Painel titulo="Filtrar abrigos" fechar={()=>setFiltros(false)}>
      <Escolha nome="Cidade" valor={cidade} alterar={setCidade} opcoes={["Todas",...new Set(abrigos.map(a=>a.cidade))]}/>
      <Escolha nome="Raio de distância" valor={raio} alterar={setRaio} opcoes={["Todos","5 km","10 km","20 km"]}/>
      <Escolha nome="Ordenar por" valor={ordem} alterar={setOrdem} opcoes={["Distância","Nome"]}/>
      <label><input type="checkbox" checked={vagas} onChange={e=>setVagas(e.target.checked)}/> Somente abrigos com vagas</label>
      <button className="app-primario" onClick={()=>setFiltros(false)}>Aplicar filtros</button></Painel>}
    {abrigo&&<Painel titulo={abrigo.nome} fechar={()=>setAbrigo(null)}><img className="app-capa" src={fotos+abrigo.foto+".png"} alt={abrigo.nome}/>
      <p>{abrigo.bairro} · {abrigo.cidade}</p><p>{abrigo.animais} animais acolhidos · {abrigo.capacidade-abrigo.animais} vagas</p>
      <h4>Equipe</h4><p>{abrigo.equipe}</p><h4>Contato</h4><p>{abrigo.email}</p>
      <button className="app-primario" onClick={()=>alternar(abrigo.foto)}>{conexoes.includes(abrigo.foto)?"Remover conexão":"Conectar"}</button></Painel>}
  </div>;
}

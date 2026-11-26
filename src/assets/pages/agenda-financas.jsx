import { useState } from "react";
import { Titulo, Painel, CartaoEvento } from "./componentes-app";
import { diaLocal, eventos, inicioMes, lancamentos, moeda, porExtenso } from "./dados-app";

function deslocar(data, deslocamento) {
  return new Date(data.getFullYear(), data.getMonth()+deslocamento, 1);
}

function Mes({ data, mudar, atual }) {
  return <div className="app-mes">
    <button aria-label="Mês anterior" onClick={()=>mudar(deslocar(data,-1))}>‹</button>
    <strong>{porExtenso(data)}</strong>
    <button aria-label="Mês seguinte" onClick={()=>mudar(deslocar(data,1))}>›</button>
    {atual && <button onClick={()=>mudar(inicioMes(new Date()))}>Atual</button>}
  </div>;
}

const dataBr = iso => iso.split("-").reverse().join("/");

export function AgendaApp({ dataAlvo, navegar }) {
  const [data,setData] = useState(()=>dataAlvo ? new Date(dataAlvo+"T12:00:00") : new Date());
  const [todos,setTodos] = useState(false);
  const selecionado=diaLocal(data);
  const mes=inicioMes(data), total=deslocar(mes,1);
  total.setDate(0);
  const doMes=eventos.filter(e=>e.data.startsWith(selecionado.slice(0,7)));
  const exibidos=doMes.filter(e=>todos || e.data===selecionado);
  function mudar(nova){setData(nova);setTodos(false);}
  return <div className="app-pagina"><Titulo acao="+ Novo compromisso" aoClicar={()=>navegar("novo-compromisso")}>Agenda</Titulo>
    <Mes data={data} mudar={mudar}/>
    <div className="app-calendario">{["D","S","T","Q","Q","S","S"].map((d,i)=><strong key={"s"+i}>{d}</strong>)}
      {Array.from({length:mes.getDay()},(_,i)=><span key={"v"+i}/>)}
      {Array.from({length:total.getDate()},(_,i)=>{
        const n=i+1, dia=new Date(mes.getFullYear(),mes.getMonth(),n);
        const registros=doMes.filter(e=>e.data===diaLocal(dia));
        return <button key={n} data-marcado={registros.length>0} aria-label={"Dia "+n+(registros.length?", com compromisso":"")} aria-pressed={data.getDate()===n}
          onClick={()=>mudar(dia)}>{n}</button>;
      })}
    </div>
    <div className="app-linha"><h3>{todos?"Compromissos do mês":"Próximos compromissos"}</h3><button onClick={()=>setTodos(!todos)}>{todos?"Ver dia":"Ver todos"}</button></div>
    <small>{todos?porExtenso(mes):"Dia "+data.toLocaleDateString("pt-BR",{day:"numeric",month:"long"})}</small>
    <div className="app-legenda"><span>Visitas</span><span>Cuidados</span><span>Serviços</span></div>
    {exibidos.map(e=><div key={e.id}>{todos&&<small>{dataBr(e.data)}</small>}<CartaoEvento evento={e} abrir={()=>navegar("evento",e.id)}/></div>)}
    {!exibidos.length&&<p>{todos?"Nenhum compromisso neste mês.":"Nenhum compromisso neste dia."}</p>}
  </div>;
}

export function EventoApp({ id, voltar, abrirFicha }){
  const e=eventos.find(item=>item.id===id);
  if(!e) return <div className="app-pagina"><Titulo voltar={voltar}>Compromisso</Titulo><p>Compromisso não encontrado.</p></div>;
  const pet=e.pet==="lua"?"Lua":"Bento";
  return <div className="app-pagina"><Titulo voltar={voltar}>Detalhes do compromisso</Titulo><div className="app-cartao">
    <span className="app-chip">{e.tipo}</span><h3>{e.nome}</h3>
    <dl className="app-dados">{[["Data",dataBr(e.data)],["Horário",e.hora],["Bichinho",pet],["Local",e.local],["Observações",e.nota]].filter(([,v])=>v).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    <button className="app-primario" onClick={()=>abrirFicha(e.pet)}>Ver ficha de {pet}</button>
  </div></div>;
}

function totalizar(itens,tipo) {
  return itens.filter(i=>i.tipo===tipo).reduce((s,i)=>s+(i.centavos||0),0);
}

export function FinancasApp({ navegar }){
  const [mes,setMes]=useState(()=>inicioMes(new Date()));
  const [filtro,setFiltro]=useState("Tudo"),[oculto,setOculto]=useState(false);
  const [todas,setTodas]=useState(false),[detalhe,setDetalhe]=useState(null),[relatorio,setRelatorio]=useState(false);
  const itens=mes.getFullYear()===2026 && mes.getMonth()===10 ? lancamentos : [];
  const entradas=totalizar(itens,"Doações"), saidas=totalizar(itens,"Despesas");
  const saldo=entradas-saidas;
  const valor=n=>oculto?"••••":moeda(n);
  const filtrados=itens.filter(i=>filtro==="Tudo" || i.tipo===filtro);
  const exibir=todas?filtrados:filtrados.slice(0,3);
  return <div className="app-pagina"><Titulo acao="+ Registrar" aoClicar={()=>navegar("adicionar","financas")}>Finanças</Titulo>
    <label className="app-periodo"><span>{porExtenso(mes)} ▾</span><input type="month" aria-label="Selecionar mês financeiro" value={diaLocal(mes).slice(0,7)} onChange={e=>{if(e.target.value)setMes(new Date(e.target.value+"-01T12:00:00"));}}/></label>
    <div className="app-cartao app-saldo"><div className="app-linha"><h3>Resultado do mês</h3><button aria-label={oculto?"Mostrar valores":"Ocultar valores"} onClick={()=>setOculto(!oculto)}>◉</button></div>
      <strong className={saldo>=0?"positivo":"negativo"}>{!oculto && saldo>0?"+ ":""}{valor(saldo)}</strong>
      <small>Doações em dinheiro menos despesas</small><div className="app-subtotais">
        <div><small>Doações em dinheiro</small><b className="positivo">{valor(entradas)}</b></div>
        <div><small>Despesas</small><b className="negativo">{valor(saidas)}</b></div>
      </div></div>
    <div className="app-controles-mes"><button onClick={()=>setMes(deslocar(mes,-1))}>‹ Mês anterior</button><button onClick={()=>setMes(inicioMes(new Date()))}>Atual</button><button onClick={()=>setMes(deslocar(mes,1))}>Mês seguinte ›</button></div>
    <div className="app-linha"><h3>Movimentações</h3><button onClick={()=>setTodas(!todas)}>{todas?"Ver menos":"Ver todas"}</button></div>
    <div className="app-chips">{["Tudo","Doações","Despesas"].map(t=><button key={t} aria-pressed={t===filtro} onClick={()=>setFiltro(t)}>{t}</button>)}</div>
    {exibir.map(i=><button className="app-cartao app-item app-mov" key={i.dia+i.nome} onClick={()=>setDetalhe(i)}>
      <span className={i.tipo==="Doações"?"app-entrada":"app-saida"}>{i.tipo==="Doações"?"↓":"↑"}</span><span><strong>{i.nome}</strong><small>{i.dia}/11/2026 · {i.detalhe}</small></span>
      <b className={i.tipo==="Doações"?"positivo":"negativo"}>{i.quantidade||((oculto?"":i.tipo==="Doações"?"+ ":"− ")+valor(i.centavos))}</b></button>)}
    {!filtrados.length&&<p>Nenhuma movimentação neste período.</p>}
    <button className="app-secundario" onClick={()=>setRelatorio(true)}>Ver relatórios</button>
    {detalhe&&<Painel titulo={detalhe.nome} fechar={()=>setDetalhe(null)}><p>{detalhe.dia}/11/2026 · {detalhe.detalhe}</p><strong>{detalhe.quantidade||valor(detalhe.centavos)}</strong></Painel>}
    {relatorio&&<Painel titulo="Relatórios" fechar={()=>setRelatorio(false)}><h4>{porExtenso(mes)}</h4><p>Resultado do mês · {valor(saldo)}</p><h4>Evolução financeira</h4>
      {[0,1,2,3].map(i=>{const semana=itens.filter(l=>Math.min(3,Math.floor((Number(l.dia)-1)/7))===i);return <div className="app-faixa" key={i}><strong>Semana {i+1}</strong><small>Doações {valor(totalizar(semana,"Doações"))} · Despesas {valor(totalizar(semana,"Despesas"))}</small></div>;})}</Painel>}
  </div>;
}

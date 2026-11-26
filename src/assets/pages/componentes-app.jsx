import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { fotos } from "./dados-app";

export function Titulo({ children, voltar, acao, aoClicar }){
  return <div className="app-titulo">
    {voltar && <button className="app-voltar" aria-label="Voltar" onClick={voltar}>‹</button>}
    <h2>{children}</h2>
    {acao && <button className="app-pilula" onClick={aoClicar}>{acao}</button>}
  </div>;
}

export function Busca({ valor, alterar, texto, filtro }){
  return <div className="app-busca">
    <img src={fotos+"inicio_busca.svg"} alt="" />
    <input type="search" aria-label={texto} placeholder={texto} value={valor} onChange={e=>alterar(e.target.value)} />
    {filtro && <button className="app-filtro" aria-label="Abrir filtros" onClick={filtro}>☰</button>}
  </div>;
}

export function Escolha({ nome, valor, alterar, opcoes }){
  return <label className="app-campo">{nome}<select value={valor} onChange={e=>alterar(e.target.value)}>
    {opcoes.map(v=><option key={v}>{v}</option>)}
  </select></label>;
}

export function Painel({ titulo, fechar, children }){
  const ref = useRef(null);
  const fecharAtual = useRef(fechar);
  useEffect(()=>{fecharAtual.current=fechar;},[fechar]);
  useEffect(()=>{
    const antes = document.activeElement;
    const painel = ref.current;
    const controles=()=>Array.from(painel.querySelectorAll('button:not(:disabled), input, select, [tabindex="0"]'));
    controles()[0]?.focus({preventScroll:true});
    function teclas(e){
      if(e.key==="Escape"){ e.preventDefault(); e.stopPropagation(); fecharAtual.current(); }
      if(e.key==="Tab"){
        const itens=controles();
        if(e.shiftKey && document.activeElement===itens[0]){e.preventDefault();itens.at(-1)?.focus();}
        else if(!e.shiftKey && document.activeElement===itens.at(-1)){e.preventDefault();itens[0]?.focus();}
      }
    }
    painel.addEventListener("keydown",teclas);
    return ()=>{painel.removeEventListener("keydown",teclas); if(antes?.isConnected) antes.focus({preventScroll:true});};
  },[]); // O painel é montado a cada abertura.
  return createPortal(<div className="app-overlay" onClick={e=>{if(e.target===e.currentTarget)fechar();}}>
    <div className="app-painel" role="dialog" aria-modal="true" aria-label={titulo} ref={ref}>
      <div className="app-linha"><h3>{titulo}</h3><button aria-label="Fechar" onClick={fechar}>×</button></div>
      {children}
    </div>
  </div>,document.querySelector(".gc-demo__screen"));
}

export function Carrossel({ slides, rotulo, intervalo=2500, permitirPausa=false }){
  const [indice, setIndice] = useState(0);
  const [pausa, setPausa] = useState(false);
  const [manual,setManual]=useState(false);
  const toque = useRef(0);
  const arrastou = useRef(false);
  const root = useRef(null);
  const total=slides.length;
  useEffect(()=>{
    if(manual || pausa || total<2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer=setInterval(()=>{if(!document.hidden && root.current?.getClientRects().length) setIndice(i=>(i+1)%total);},intervalo);
    return ()=>clearInterval(timer);
  },[manual,pausa,total,intervalo]);
  return <div className="app-carrossel" aria-label={rotulo} ref={root}
    onFocus={()=>setPausa(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPausa(false);}}
    onMouseEnter={()=>setPausa(true)} onMouseLeave={()=>setPausa(false)}
    onTouchStart={e=>{toque.current=e.touches[0].clientX; arrastou.current=false;}}
    onTouchEnd={e=>{const dx=e.changedTouches[0].clientX-toque.current;if(Math.abs(dx)>30){arrastou.current=true;setIndice(i=>(i+total+(dx<0?1:-1))%total);}}}
    onClickCapture={e=>{if(arrastou.current){e.stopPropagation();arrastou.current=false;}}}>
    {slides[indice]}
    <div className="app-pontos">{slides.map((_,i)=><button key={i} aria-label={rotulo+" "+(i+1)} aria-pressed={i===indice} onClick={()=>setIndice(i)} />)}{permitirPausa&&<button className="app-pausa" aria-label={manual?"Retomar banners":"Pausar banners"} onClick={()=>setManual(!manual)}>{manual?"▶":"Ⅱ"}</button>}</div>
  </div>;
}

export function CartaoEvento({ evento, abrir }){
  return <button className="app-cartao app-item" onClick={abrir}>
    <img className="app-avatar" src={fotos+(evento.pet==="lua"?"gato1":"dog1")+".png"} alt="" />
    <span><strong>{evento.nome}</strong><small>{evento.hora} · {evento.tipo}</small></span><b>›</b>
  </button>;
}

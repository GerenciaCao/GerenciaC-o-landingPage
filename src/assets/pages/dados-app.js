// Registros iniciais de TelaDadosRestantes.kt e DadosDemontração.kt.
export const fotos = "/images/demo/";
export const moeda = centavos => (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const normalizar = s => s.normalize("NFD").replace(/\p{M}/gu, "").trim().toLowerCase();
export const inicioMes = data => new Date(data.getFullYear(), data.getMonth(), 1);
export const diaLocal = data => [data.getFullYear(), String(data.getMonth()+1).padStart(2,"0"), String(data.getDate()).padStart(2,"0")].join("-");
export const porExtenso = data => data.toLocaleString("pt-BR",{month:"long",year:"numeric"});
export const eventos = [
  { id:"vacina", data:"2026-11-07", hora:"14:00", tipo:"Cuidados", nome:"Vacina da Lua", pet:"lua", local:"Clínica parceira", nota:"Levar a carteirinha de vacinação." },
  { id:"visita", data:"2026-11-07", hora:"16:00", tipo:"Visitas", nome:"Visita ao Bento", pet:"bento" },
  { id:"vacinacao", data:"2026-12-04", hora:"14:00", tipo:"Cuidados", nome:"Vacinação da Lua", pet:"lua", local:"Abrigo Esperança", nota:"Vacinação fictícia para demonstração do aplicativo." }
];
const doacoes = [60000,80000,50000,90000], despesas = [30000,40000,32000,40000];
export const lancamentos = ["03","10","17","24"].flatMap((dia, i) => [
  { dia, nome:"Doação", tipo:"Doações", centavos:doacoes[i], detalhe:"Dinheiro" },
  { dia, nome:"Despesa de ração", tipo:"Despesas", centavos:despesas[i], detalhe:"Outros" }
]).concat({dia:"07",nome:"Ração recebida",tipo:"Doações",quantidade:"20 kg",detalhe:"Produtos"}).sort((a,b)=>b.dia.localeCompare(a.dia));
export const abrigos = [
  ["ongpatasunidas","Patas Unidas","São Paulo","Vila Esperança",18,30,2.4,"Ana, Pedro, Marina","contato@patasunidas.example"],
  ["cantinhodosfocinhos","Cantinho dos Focinhos","São Paulo","Vila Maria",25,40,4.7,"Ana, Bruno, Clara, Daniel","contato@cantinhodosfocinhos.example"],
  ["abrigolaranimal","Abrigo Lar Animal","Guarulhos","Centro",20,20,7.2,"Carla, Rafael","contato@laranimal.example"],
  ["patasfelizes","Patas Felizes","São Paulo","Santana",12,24,9.1,"Paula, João","contato@patasfelizes.example"],
  ["patinhasdobem","Patinhas do Bem","Osasco","Centro",16,25,12.8,"Luiza, Marcos","contato@patinhasdobem.example"]
].map(([foto,nome,cidade,bairro,animais,capacidade,km,equipe,email])=>({foto,nome,cidade,bairro,animais,capacidade,km,equipe,email}));
export const banners = [
  ["banner_farmacia_caes","Farmácia para cães","Saúde","Cães"],
  ["banner_alimentos_gatos","Alimentos para gatos","Alimentação","Gatos"],
  ["banner_brinquedos_caes","Brinquedos para cães","Brinquedos","Cães"],
  ["banner_higiene_animal","Higiene animal","Higiene","Ambos"],
  ["banner_brinquedos_gatos","Brinquedos para gatos","Brinquedos","Gatos"],
  ["banner_alimentos_caes","Alimentos para cães","Alimentação","Cães"],
  ["banner_farmacia_gatos","Farmácia para gatos","Saúde","Gatos"]
];
export const ofertas = [
  ["Sachê Pedigree Carne","Alimentação","Parceiro de exemplo",6990,"pedigree","Cães","Para cães adultos de raças pequenas. Embalagem de 100 g."],
  ["Sachê Whiskas","Alimentação","Parceiro de exemplo",599,"loja_alimento_umido","Gatos","Para gatos adultos. Embalagem de 85 g."],
  ["Sachê Pedigree Carne","Alimentação","Exemplo de catálogo",499,"pedigree","Ambos","Para cães adultos de raças pequenas. Embalagem de 100 g."],
  ["Banho e tosa","Serviços","Prestador de exemplo",7999,null,"Ambos","Serviço demonstrativo.",true],
  ["Spa para bichinhos","Serviços","Prestador de exemplo",7999,null,"Ambos","Consulte condições e disponibilidade com o prestador.",true],
  ["Ração para abrigo","Alimentação","Marca parceira",null,null,"Ambos","Consulte tamanhos, disponibilidade e valores com o parceiro."],
  ["Consulta veterinária","Saúde","Clínica parceira",null,null,"Ambos","Consulte a região atendida e as condições do serviço.",true],
  ["Banho e tosa","Serviços","Atendimento local",null,null,"Ambos","Consulte a disponibilidade e as condições do serviço.",true],
  ["Medicamentos","Saúde","Produtos veterinários",null,null,"Ambos","Consulte as condições com o parceiro."]
].map(([nome,categoria,parceiro,preco,foto,especie,descricao,servico=false])=>({nome,categoria,parceiro,preco,foto,especie,descricao,servico}));

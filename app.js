
async function load(){
  const c=await fetch("config.json?v=1").then(r=>r.json());
  const $=id=>document.getElementById(id);
  $("titulo").textContent=c.titulo;$("subtitulo").textContent=c.subtitulo;
  $("agendaTitulo").textContent=c.agendamento.titulo;$("agendaDescricao").textContent=c.agendamento.descricao;
  $("agendaBtn").href=c.agendamento.url;$("agendaBtn").textContent=c.agendamento.botao;
  $("email").textContent=c.contato.email;$("email").href="mailto:"+c.contato.email;
  $("telefone").textContent=c.contato.telefone;$("telefone").href="tel:"+c.contato.telefoneLink;
  $("presencial").textContent=c.atendimento.presencial;$("remoto").textContent=c.atendimento.remoto;
  ["endereco","complemento","bairroCidade","cep"].forEach(k=>$(k).textContent=c.contato[k]);
  $("links").innerHTML=c.links.map(x=>`<a class="procedure" href="${x.url}" target="_blank" rel="noopener noreferrer">${x.titulo}<span>→</span></a>`).join("");
}
load().catch(()=>{});

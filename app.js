
(async()=>{
const root=document.getElementById('app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let D;
try{D=await fetch('contato.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json()})}
catch(e){root.innerHTML='<div class="intro">Não foi possível carregar as informações de contato.</div>';return}

const person=p=>`<article class="card"><div class="role">${esc(p.role)}</div><h3>${esc(p.name)}</h3>${p.position?`<p>${esc(p.position)}</p>`:''}${p.department?`<p>${esc(p.department)}</p>`:''}${p.email?`<p><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></p>`:''}</article>`;

let booking = '';
if(D.appointment.active){
 if(D.appointment.embed_url){
   booking = `<iframe class="booking-frame" src="${esc(D.appointment.embed_url)}" loading="lazy" title="Agenda de atendimento da Coordenação"></iframe>`;
 } else if(D.appointment.booking_url){
   booking = `<div class="actions"><a href="${esc(D.appointment.booking_url)}" target="_blank" rel="noopener">Escolher horário disponível</a></div>`;
 }
}

root.innerHTML=`
<section class="hero">
 <div class="eyebrow">UFPR · CURSO DE BIOMEDICINA</div>
 <h1>${esc(D.title)}</h1>
 <p>${esc(D.subtitle)}</p>
</section>

<div class="intro">${esc(D.intro)}</div>

<section class="section">
 <h2>Equipe da Coordenação</h2>
 <div class="grid">
  ${person(D.coordination.coordinator)}
  ${person(D.coordination.vice)}
  ${person(D.coordination.secretary)}
 </div>
</section>

<section class="section">
 <h2>Atendimento</h2>
 <div class="service-grid">
  <article class="service"><h3>${esc(D.service.in_person.title)}</h3><p><b>${esc(D.service.in_person.days)}</b></p><p>${esc(D.service.in_person.hours)}</p><p>Telefone: ${esc(D.service.phone)}</p></article>
  <article class="service"><h3>${esc(D.service.remote.title)}</h3><p>E-mail: <a href="mailto:${esc(D.service.remote.email)}">${esc(D.service.remote.email)}</a></p><p>Teams: ${esc(D.service.remote.teams)}</p><p>WhatsApp: ${esc(D.service.remote.whatsapp)}</p></article>
 </div>
</section>

<section class="section">
 <div class="appointment">
  <span class="badge">${D.appointment.active?'Agenda disponível':'Agenda em preparação'}</span>
  <h2>${esc(D.appointment.title)}</h2>
  <p>${esc(D.appointment.description)}</p>
  <div class="checks">${D.appointment.fields.map(x=>`<div class="check">✓ ${esc(x)}</div>`).join('')}</div>
  ${booking}
  ${!D.appointment.active?`<div class="notice">${esc(D.appointment.notice)}</div>`:''}
  <div class="privacy">${esc(D.privacy)}</div>
 </div>
</section>

<section class="section">
 <h2>Antes de agendar</h2>
 <div class="grid">${D.before_booking.map(x=>`<article class="card"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('')}</div>
</section>

<section class="section">
 <h2>Localização</h2>
 <div class="panel address">
  <b>${esc(D.address.institution)}</b><br>
  ${esc(D.address.street)}<br>
  ${esc(D.address.neighborhood)} · ${esc(D.address.city)}<br>
  CEP ${esc(D.address.cep)} · ${esc(D.address.reference)}<br>
  ${esc(D.address.postal_box)}
  <p><b>Transporte:</b> ${D.transport.map(esc).join(' · ')}</p>
 </div>
</section>

<section class="section">
 <h2>Acessos úteis</h2>
 <div class="links">${D.useful_links.map(l=>`<article class="link-card"><h3>${esc(l.label)}</h3><p>${esc(l.description)}</p><a href="${esc(l.url)}" target="_blank" rel="noopener">Acessar</a></article>`).join('')}</div>
</section>`;
})();

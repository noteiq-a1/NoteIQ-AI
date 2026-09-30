const pdf=document.getElementById('pdf'),drop=document.getElementById('drop');
let fileName='';
function go(){document.getElementById('workspace').scrollIntoView({behavior:'smooth'})}
pdf.onchange=()=>{if(pdf.files[0])load(pdf.files[0])};
drop.ondragover=e=>{e.preventDefault();drop.style.borderColor='#5b5ce2'};
drop.ondragleave=()=>drop.style.borderColor='#cbd3e1';
drop.ondrop=e=>{e.preventDefault();drop.style.borderColor='#cbd3e1';if(e.dataTransfer.files[0])load(e.dataTransfer.files[0])};
function load(f){fileName=f.name;document.getElementById('status').textContent='Uploaded: '+fileName;addBot('PDF <b>'+esc(fileName)+'</b> is ready. Ask a question or generate notes.')}
function send(){let q=document.getElementById('question').value.trim();if(!q)return;addUser(q);document.getElementById('question').value='';setTimeout(()=>respond(q),300)}
function ask(q){document.getElementById('question').value=q;send()}
function respond(q){let a;if(!fileName)a='Please upload a PDF first.';else if(/summar/i.test(q))a='Prototype response: a real AI backend will summarize the uploaded PDF into key concepts, definitions and revision points.';else if(/important|topic/i.test(q))a='Prototype response: a real AI/RAG backend will identify the most important topics from your uploaded PDF and present them as exam-friendly points.';else if(/question|exam/i.test(q))a='Prototype response: a real backend can generate 2-mark, 5-mark and 10-mark questions from the PDF.';else a='Question received. Connect NoteIQ to an AI/RAG backend for a real PDF-grounded answer.';addBot(a)}
function notes(){let n=document.getElementById('notes');if(!fileName){n.innerHTML='<b>Upload a PDF first.</b>';return}n.innerHTML='<h4>'+esc(fileName)+'</h4><ul><li>Key concepts and definitions</li><li>Important topics for revision</li><li>Short exam-ready points</li><li>Potential questions</li></ul><p><b>Prototype:</b> connect an AI/RAG backend to generate actual PDF-based notes.</p>'}
function addUser(t){let x=document.createElement('div');x.className='bubble user';x.textContent=t;chat.appendChild(x);chat.scrollTop=chat.scrollHeight}
function addBot(t){let x=document.createElement('div');x.className='bubble bot';x.innerHTML=t;chat.appendChild(x);chat.scrollTop=chat.scrollHeight}
function clearChat(){chat.innerHTML='<div class="bubble bot">Chat cleared. Ask me something about your PDF.</div>'}
function esc(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
class WebModular {
  constructor() {
    this.registry = { platform:{calls:0}, view:{calls:0}, engine:{calls:0,ready:false,busy:false}, telemetry:{calls:0,values:[],last:0} };
    this.modules = [['WebCPU','Execution and scheduling'],['WebRAM','Memory management'],['WebGPU','Hardware acceleration'],['WebDSP','Digital signal processing'],['WebAudio','Audio runtime'],['WebMIDI','Musical interfaces'],['WebDAW','Audio production'],['WebAI','Intelligent modules']];
    this.init();
  }
  init() { this.detect(); this.style(); this.view(); this.worker(); this.monitor(); window.addEventListener('resize',()=>this.detect()); }
  detect() {
    const p=this.registry.platform; p.calls++;
    p.device=matchMedia('(max-width:680px)').matches?'mobile':matchMedia('(max-width:1050px)').matches||navigator.maxTouchPoints>0?'tablet':'desktop';
    const ua=navigator.userAgent;
    p.os=/Android/i.test(ua)?'Android':/Windows/i.test(ua)?'Windows':/Mac/i.test(ua)?'macOS':/Linux/i.test(ua)?'Linux':'other';
    p.browser=/Firefox/i.test(ua)?'Firefox':/Edg\//i.test(ua)?'Edge':/Chrome/i.test(ua)?'Chromium':/Safari/i.test(ua)?'Safari':'other';
    p.threads=navigator.hardwareConcurrency||'unknown';
    const badge=document.getElementById('platform');if(badge)badge.textContent=p.device+' · '+p.os;
  }
  style() {
    const s=document.createElement('style');
    s.textContent=[
      ':root{font-family:Inter,system-ui,sans-serif;color-scheme:dark;background:#07101e;color:#e9f5ff}',
      '*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-height:100vh;background:radial-gradient(ellipse at 48% 8%,#183b60,transparent 50%),#07101e}',
      '.shell{max-width:1220px;margin:auto;padding:25px clamp(20px,5vw,70px) 65px}',
      'header,footer{display:flex;justify-content:space-between;align-items:center;gap:16px}header a,footer a{color:inherit;text-decoration:none}',
      '.brand{font-size:24px;font-weight:800;letter-spacing:-1px;display:flex;align-items:center;gap:12px}',
      '.mark{font-size:37px;color:#64d8ff;text-shadow:0 0 20px #1ca4ff}',
      'nav{display:flex;gap:20px;align-items:center}nav a{color:#b0cadf;font-size:14px}',
      '.badge{border:1px solid #30628a;padding:8px 12px;border-radius:30px;color:#8bd8ff;font-size:12px;text-transform:capitalize}',
      '.hero{text-align:center;padding:clamp(75px,12vw,145px) 0 70px}',
      '.overline{color:#61cfff;font-size:12px;text-transform:uppercase;font-weight:800;letter-spacing:.23em}',
      'h1{font-size:clamp(46px,8vw,96px);line-height:1.08;letter-spacing:-.065em;margin:18px 0}h1 span{color:#55ccff}',
      '.lead{max-width:680px;margin:auto;font-size:clamp(16px,2vw,21px);line-height:1.7;color:#a4bfd2}',
      '.buttons{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:33px}',
      '.button{padding:14px 23px;border-radius:12px;background:#27c8fa;color:#061528;font-size:14px;font-weight:750;text-decoration:none}',
      '.button.alt{background:#11263c;color:#d7e9fa;border:1px solid #355977}',
      'section{margin-top:60px}h2{font-size:28px;margin-bottom:8px;letter-spacing:-.04em}.desc{color:#9cb5cb;margin-top:0;line-height:1.6}',
      '.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:24px}',
      '.card,.panel{background:linear-gradient(150deg,#142a43,#091728);border:1px solid #294a68;border-radius:18px;padding:23px}',
      '.card{min-height:155px}.symbol{color:#49ceff;font-size:26px}.card h3{font-size:17px;margin:18px 0 6px}.card p{font-size:13px;color:#91aec7;line-height:1.5;margin:0}',
      '.panel{display:grid;grid-template-columns:1fr 1fr;gap:24px}.status{color:#c0d7e7;font-size:14px;line-height:1.7}',
      '.dot{display:inline-block;height:9px;width:9px;background:#ffc66c;border-radius:100%;margin-right:9px}.dot.ok{background:#4de9b0}.dot.bad{background:#ff687b}',
      '.details{color:#9ebbd1;font-size:13px;line-height:2;margin-top:18px}',
      '.metrics{display:grid;grid-template-columns:1fr 1fr;gap:12px}.metric{background:#081a2e;border-radius:12px;padding:17px}',
      '.metric small{display:block;color:#92b1c9;font-size:12px}.metric strong{display:block;font-size:26px;margin-top:8px;color:#e1f4ff}',
      'footer{margin-top:90px;padding-top:23px;border-top:1px solid #2b4964;color:#8ca9bd;font-size:12px}',
      '@media(max-width:950px){.grid{grid-template-columns:repeat(2,1fr)}.panel{grid-template-columns:1fr}}',
      '@media(max-width:600px){nav a{display:none}.grid{grid-template-columns:1fr}footer{align-items:start;flex-direction:column}}',
      '@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}'
    ].join('');
    document.head.append(s);
  }
  view() {
    this.registry.view.calls++;
    const root=document.createElement('div');root.className='shell';
    const cards=this.modules.map(m=>'<article class="card"><div class="symbol">⬡</div><h3>'+m[0]+'</h3><p>'+m[1]+'</p></article>').join('');
    root.innerHTML='<header><a class="brand" href="./"><span class="mark">⬡</span>WebModular</a><nav><a href="#modules">Modules</a><a href="#runtime">Runtime</a><a href="https://github.com/WebModular">GitHub</a><span class="badge" id="platform"></span></nav></header>'+
      '<main><div class="hero"><div class="overline">Open web architecture · JavaScript + R</div><h1>Build in <span>modules.</span><br>Run in harmony.</h1><p class="lead">Reusable browser systems where JavaScript orchestrates the experience and a concurrent R engine audits and analyses runtime telemetry through webR and WebAssembly.</p><div class="buttons"><a class="button" href="#modules">Explore modules</a><a class="button alt" href="https://github.com/WebModular/WebModular.github.io">View source ↗</a></div></div>'+
      '<section id="modules"><h2>Composable foundations</h2><p class="desc">Building blocks for desktop, tablet and mobile applications.</p><div class="grid">'+cards+'</div></section>'+
      '<section id="runtime"><h2>Concurrent runtime monitor</h2><p class="desc">R statistics execute outside the UI event loop, with batched asynchronous messages.</p><div class="panel"><div><div class="status"><i class="dot" id="dot"></i><span id="status" aria-live="polite">Starting isolated R engine…</span></div><div class="details" id="details"></div></div><div class="metrics"><div class="metric"><small>Mean frame interval</small><strong id="mean">—</strong></div><div class="metric"><small>95th percentile</small><strong id="p95">—</strong></div><div class="metric"><small>Samples analysed by R</small><strong id="count">0</strong></div><div class="metric"><small>Browser frame rate</small><strong id="fps">—</strong></div></div></div></section></main>'+
      '<footer><span>© '+new Date().getFullYear()+' WebModular · JavaScript / R / WebAssembly</span><a href="https://github.com/WebModular">GitHub organization</a></footer>';
    document.body.append(root);this.detect();
    const p=this.registry.platform;
    document.getElementById('details').textContent=p.browser+' · '+p.os+' · '+p.threads+' logical threads · WebAssembly '+(typeof WebAssembly==='undefined'?'unavailable':'available');
  }
  setStatus(message,state='') {
    document.getElementById('status').textContent=message;
    document.getElementById('dot').className='dot '+state;
  }
  worker() {
    const record=this.registry.engine;record.calls++;
    const url=new URL('index.R',document.baseURI).href;
    const workerText=[
      'class WebModularRWorker {',
      'constructor(){this.registry={start:{calls:0},analyse:{calls:0}};this.ready=false;this.queue=Promise.resolve();this.start()}',
      'async start(){this.registry.start.calls++;try{',
      'const lib=await import("https://webr.r-wasm.org/v0.6.0/webr.mjs");',
      'this.engine=new lib.WebR({baseUrl:"https://webr.r-wasm.org/v0.6.0/"});await this.engine.init();',
      'const response=await fetch('+JSON.stringify(url)+');if(!response.ok)throw Error("R source HTTP "+response.status);',
      'await this.engine.evalRVoid(await response.text());this.ready=true;postMessage({type:"ready"});',
      '}catch(e){postMessage({type:"error",message:String(e.message||e)})}}',
      'analyse(values){if(!this.ready)return;this.queue=this.queue.then(async()=>{',
      'this.registry.analyse.calls++;const data=values.filter(x=>Number.isFinite(x)&&x>=0&&x<1000).slice(0,180);',
      'const result=await this.engine.evalRString("WebModular$ingest(c("+data.join(",") + "))");',
      'postMessage({type:"stats",result:result});',
      '}).catch(e=>postMessage({type:"error",message:String(e.message||e)}))}',
      '}',
      'const engine=new WebModularRWorker();',
      'self.onmessage=e=>{if(e.data&&e.data.type==="analyse")engine.analyse(e.data.values)};'
    ].join('\n');
    try {
      const blob=URL.createObjectURL(new Blob([workerText],{type:'text/javascript'}));
      record.worker=new Worker(blob,{type:'module',name:'WebModular-R'});
      setTimeout(()=>URL.revokeObjectURL(blob),3000);
      record.worker.onmessage=e=>{
        const m=e.data;
        if(m.type==='ready'){record.ready=true;this.setStatus('R runtime online · isolated WebAssembly worker','ok')}
        if(m.type==='error'){record.ready=false;record.busy=false;this.setStatus('R runtime unavailable: '+m.message,'bad')}
        if(m.type==='stats'){
          record.busy=false;
          const fields=String(m.result).split('|');
          document.getElementById('mean').textContent=fields[0]+' ms';
          document.getElementById('p95').textContent=fields[1]+' ms';
          document.getElementById('count').textContent=fields[3]||'0';
        }
      };
      record.worker.onerror=e=>{record.ready=false;record.busy=false;this.setStatus('Worker error: '+e.message,'bad')};
    } catch(e){this.setStatus('Worker unavailable: '+e.message,'bad')}
  }
  monitor() {
    const tick=time=>{
      const t=this.registry.telemetry;t.calls++;
      if(t.last&&!document.hidden){const d=time-t.last;if(d>0&&d<1000){t.values.push(Math.round(d*100)/100);if(t.values.length>180)t.values.shift();document.getElementById('fps').textContent=Math.round(1000/d)+' fps'}}
      t.last=time;requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setInterval(()=>{
      const e=this.registry.engine,t=this.registry.telemetry;
      if(document.hidden||!e.ready||e.busy||!t.values.length)return;
      e.busy=true;e.worker.postMessage({type:'analyse',values:t.values.splice(0)});
    },1600);
    document.addEventListener('visibilitychange',()=>{this.registry.telemetry.last=0;if(document.hidden)this.registry.telemetry.values.length=0});
  }
}
new WebModular();

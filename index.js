class WebModular {
  constructor() {
    this.registry = {
      platform: { calls: 0, device: null, os: null, browser: null },
      view: { calls: 0, banner: null, button: null },
      animation: { calls: 0, active: false },
      vector: { calls: 0, icon: null },
      wasm: { calls: 0, available: false, instance: null },
      gpu: { calls: 0, available: false, adapter: null }
    };
    this.init();
  }
  init() {
    this.detect();
    this.style();
    this.view();
    this.startRuntimes();
    addEventListener('resize', () => this.detect(), { passive: true });
  }
  detect() {
    const p = this.registry.platform;
    p.calls++;
    const ua = navigator.userAgent;
    p.device = matchMedia('(max-width:680px)').matches ? 'mobile' :
      matchMedia('(max-width:1050px)').matches || navigator.maxTouchPoints > 0 ? 'tablet' : 'desktop';
    p.os = /Android/i.test(ua) ? 'Android' : /Windows/i.test(ua) ? 'Windows' :
      /Mac/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'other';
    p.browser = /Firefox/i.test(ua) ? 'Firefox' : /Edg\//i.test(ua) ? 'Edge' :
      /Chrome/i.test(ua) ? 'Chromium' : /Safari/i.test(ua) ? 'Safari' : 'other';
    document.documentElement.dataset.device = p.device;
  }
  style() {
    const font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@400;500&display=swap';
    document.head.append(font);
    const s = document.createElement('style');
    s.textContent = [
      ':root{color-scheme:dark;background:#151a22;font-family:system-ui,sans-serif}',
      '*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#151a22}',
      'body{min-height:100dvh;background:radial-gradient(ellipse 90% 38% at 50% -25%,rgba(118,125,138,.12),transparent 100%),#151a22}',
      '.glass-banner{position:relative;isolation:isolate;width:100%;height:36px;padding:0;display:flex;align-items:stretch;',
      'background:linear-gradient(to right,rgba(143,165,184,.13) 0%,rgba(108,131,154,.085) 28%,rgba(63,83,108,.025) 65%,transparent 100%);backdrop-filter:blur(14px) saturate(125%);-webkit-backdrop-filter:blur(14px) saturate(125%);',
      'border:0;box-shadow:none;overflow:hidden}',
      '.glass-banner::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;',
      'background:linear-gradient(to top,rgba(155,176,196,.21) 0%,rgba(124,149,173,.115) 32%,rgba(80,105,132,.025) 74%,transparent 100%);mask-image:linear-gradient(to right,#000 0%,rgba(0,0,0,.8) 26%,rgba(0,0,0,.25) 65%,transparent 100%);-webkit-mask-image:linear-gradient(to right,#000 0%,rgba(0,0,0,.8) 26%,rgba(0,0,0,.25) 65%,transparent 100%)}',
      '.glass-button{appearance:none;display:grid;place-items:center;width:36px;height:36px;flex:none;margin:0;padding:0;',
      'border:0;border-radius:0;background:linear-gradient(155deg,rgba(170,190,208,.26),rgba(105,127,149,.105));',
      'box-shadow:inset 0 1px rgba(255,255,255,.10);color:#dcebf8;cursor:pointer;outline-offset:-3px;',
      'transition:background .25s ease,transform .3s cubic-bezier(.2,.8,.2,1)}',
      '.glass-button:hover{background:linear-gradient(155deg,rgba(174,203,226,.37),rgba(109,144,175,.17))}',
      '.glass-button[aria-pressed="true"]{border-radius:0;background:rgba(150,185,216,.23)}',
      '.glass-button:focus-visible{outline:2px solid rgba(188,222,255,.9)}',
      '.glass-icon{display:block;width:29px;height:29px;object-fit:contain;pointer-events:none;transition:transform .3s ease,opacity .3s ease}',
      '.glass-button[aria-pressed="true"] .glass-icon{transform:scale(.88);opacity:.85}',
      '.text-workspace{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);width:100%;min-height:calc(100dvh - 36px);padding-bottom:48px}',
      '.text-region{min-width:0;min-height:0;padding:clamp(16px,3vw,42px);border:0;background:transparent;display:flex;align-items:center;justify-content:center}',
      '.text-loading{font-family:"Smooch Sans",sans-serif;color:rgba(227,234,241,.42);font-size:18px;letter-spacing:.055em;animation:text-breathe 2.4s ease-in-out infinite}',
      '.text-region:nth-child(2) .text-loading{animation-delay:1.2s}',
      '@keyframes text-breathe{0%,100%{opacity:.4}50%{opacity:1}}',
      '.site-copyright{position:fixed;left:0;right:0;bottom:0;padding:0 16px max(12px,env(safe-area-inset-bottom));text-align:center;', 
      'font-family:"Smooch Sans",sans-serif;font-size:15px;font-weight:400;letter-spacing:.015em;line-height:1.2;color:#fff;pointer-events:none}',
      '@media(prefers-reduced-motion:reduce){.glass-button{transition:none}.text-loading{animation:none}}'
    ].join('');
    document.head.append(s);
  }
  view() {
    const v = this.registry.view;
    v.calls++;
    const banner = document.createElement('header');
    banner.className = 'glass-banner';
    banner.setAttribute('aria-label', 'WebModular top banner');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'glass-button';
    button.setAttribute('aria-label', 'WebModular menu');
    button.setAttribute('aria-pressed', 'false');
    const icon = document.createElement('img');
    icon.className = 'glass-icon';
    icon.src = new URL('./favicon.png', document.baseURI).href;
    icon.alt = '';
    icon.draggable = false;
    button.append(icon);
    button.addEventListener('click', () => this.morph(button, icon));
    banner.append(button);
    const footer = document.createElement('footer');
    footer.className = 'site-copyright';
    footer.textContent = '© 2026 WebModular. All rights reserved.';
    const workspace = document.createElement('main');
    workspace.className = 'text-workspace';
    workspace.setAttribute('aria-label', 'Two text content areas');
    for (const side of ['left', 'right']) {
      const area = document.createElement('section');
      area.className = 'text-region';
      area.dataset.side = side;
      area.setAttribute('aria-label', side + ' text loading area');
      const loading = document.createElement('span');
      loading.className = 'text-loading';
      loading.textContent = 'Loading…';
      loading.setAttribute('role', 'status');
      area.append(loading);
      workspace.append(area);
    }
    document.body.replaceChildren(banner, workspace, footer);
    v.banner = banner;
    v.button = button;
    this.registry.vector.icon = icon;
    this.registry.vector.calls++;
  }
  morph(button, icon) {
    const state = this.registry.animation;
    state.calls++;
    state.active = !state.active;
    button.setAttribute('aria-pressed', String(state.active));
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches && icon.animate) {
      icon.animate([{transform:'scale(.72) rotate(-12deg)',opacity:.4},{transform:'scale(1) rotate(0deg)',opacity:.65}],{duration:260,easing:'cubic-bezier(.2,.8,.2,1)'});
    }
  }
  async startRuntimes() {
    const wasm = this.registry.wasm;
    wasm.calls++;
    if (typeof WebAssembly !== 'undefined') {
      try {
        wasm.instance = await WebAssembly.instantiate(new Uint8Array([0,97,115,109,1,0,0,0]));
        wasm.available = true;
      } catch (e) { wasm.error = String(e); }
    }
    const gpu = this.registry.gpu;
    gpu.calls++;
    if (navigator.gpu && typeof navigator.gpu.requestAdapter === 'function') {
      try {
        gpu.adapter = await navigator.gpu.requestAdapter();
        gpu.available = !!gpu.adapter;
      } catch (e) { gpu.error = String(e); }
    }
  }
}
new WebModular();

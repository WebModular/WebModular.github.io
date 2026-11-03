class WebModular {
  constructor() {
    this.registry = {
      platform: { calls: 0, device: null, os: null, browser: null },
      view: { calls: 0, banner: null, button: null },
      engine: { calls: 0, ready: false, busy: false },
      telemetry: { calls: 0, values: [], last: 0 }
    };
    this.init();
  }
  init() {
    this.detect();
    this.style();
    this.view();
    window.addEventListener('resize', () => this.detect());
  }
  detect() {
    const p = this.registry.platform;
    p.calls++;
    p.device = matchMedia('(max-width:680px)').matches ? 'mobile' :
      matchMedia('(max-width:1050px)').matches || navigator.maxTouchPoints > 0 ? 'tablet' : 'desktop';
    const ua = navigator.userAgent;
    p.os = /Android/i.test(ua) ? 'Android' : /Windows/i.test(ua) ? 'Windows' :
      /Mac/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'other';
    p.browser = /Firefox/i.test(ua) ? 'Firefox' : /Edg\//i.test(ua) ? 'Edge' :
      /Chrome/i.test(ua) ? 'Chromium' : /Safari/i.test(ua) ? 'Safari' : 'other';
    document.documentElement.dataset.device = p.device;
  }
  style() {
    const s = document.createElement('style');
    s.textContent = [
      ':root{color-scheme:dark;background:#07101e;font-family:system-ui,sans-serif}',
      '*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#07101e}',
      '.glass-banner{position:relative;isolation:isolate;width:100%;height:54px;padding:7px 12px;display:flex;align-items:center;',
      'background:rgba(125,151,174,.30);backdrop-filter:blur(22px) saturate(145%);-webkit-backdrop-filter:blur(22px) saturate(145%);',
      'border:0;box-shadow:0 7px 26px rgba(0,0,0,.12)}',
      '.glass-banner::before{content:"";position:absolute;z-index:-1;inset:0;pointer-events:none;',
      'background:linear-gradient(0deg,rgba(156,188,210,.38) 0%,rgba(112,144,174,.22) 34%,rgba(85,111,140,.08) 72%,rgba(70,95,125,0) 100%)}',
      '.glass-button{appearance:none;display:grid;place-items:center;width:40px;height:40px;flex:none;',
      'border:0;border-radius:14px;background:linear-gradient(155deg,rgba(255,255,255,.28),rgba(255,255,255,.07));',
      'box-shadow:inset 0 1px rgba(255,255,255,.3),0 2px 8px rgba(0,0,0,.12);color:#eaf7ff;cursor:pointer;',
      'transition:background .2s ease,transform .2s ease,box-shadow .2s ease}',
      '.glass-button:hover,.glass-button[aria-pressed="true"]{background:linear-gradient(155deg,rgba(255,255,255,.40),rgba(255,255,255,.12));box-shadow:inset 0 1px rgba(255,255,255,.46),0 3px 12px rgba(0,0,0,.2)}',
      '.glass-button:active{transform:scale(.96)}.glass-button:focus-visible{outline:2px solid #bfeeff;outline-offset:3px}',
      '@media(max-width:680px){.glass-banner{height:50px;padding:6px 9px}.glass-button{height:38px;width:38px}}',
      '@media(prefers-reduced-motion:reduce){.glass-button{transition:none}}'
    ].join('');
    document.head.append(s);
  }
  view() {
    const view = this.registry.view;
    view.calls++;
    const banner = document.createElement('header');
    banner.className = 'glass-banner';
    banner.setAttribute('aria-label', 'WebModular top banner');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'glass-button';
    button.setAttribute('aria-label', 'Glass button');
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
    });
    banner.append(button);
    document.body.replaceChildren(banner);
    view.banner = banner;
    view.button = button;
  }
}
new WebModular();

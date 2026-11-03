class WebModular {
  constructor() {
    this.registry = {
      platform: { calls: 0, device: null, os: null, browser: null },
      view: { calls: 0 },
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
  }
  style() {
    const s = document.createElement('style');
    s.textContent = ':root{color-scheme:dark;background:#07101e}html,body{margin:0;min-height:100%;background:#07101e}';
    document.head.append(s);
  }
  view() {
    this.registry.view.calls++;
    document.body.replaceChildren();
  }
}
new WebModular();

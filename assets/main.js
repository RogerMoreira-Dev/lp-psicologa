(function () {
  "use strict";
  var S = window.SITE || {};
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  var toastEl = $("[data-toast]");
  var timer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(function () { toastEl.hidden = true; }, 5000);
  }

  /* WhatsApp: com número configurado vai direto; sem número (demonstração) abre para escolher o contato */
  function waUrl(text) {
    var n = String(S.whatsapp || "").replace(/\D/g, "");
    return (n ? "https://wa.me/" + n : "https://wa.me/") + "?text=" + encodeURIComponent(text);
  }
  function demo() {
    if (!S.whatsapp) toast("Demonstração: o WhatsApp abre com a mensagem pronta. No site da cliente, vai direto para o número dela.");
  }
  var DEFAULT = "Olá, " + (S.name || "") + "! Vim pelo site e gostaria de agendar uma sessão.";
  $$("[data-wa]").forEach(function (a) {
    a.href = waUrl(DEFAULT);
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", demo);
  });

  /* Agendamento: monta a mensagem e mostra a prévia */
  var form = $("[data-book]");
  if (form) {
    var preview = $("[data-preview]", form);
    var build = function () {
      var fd = new FormData(form);
      var nome = String(fd.get("nome") || "").trim().slice(0, 40);
      var lines = ["Olá, " + (S.name || "") + "! " + (nome ? "Meu nome é " + nome + ". " : "") + "Gostaria de agendar uma sessão."];
      if (fd.get("modo")) lines.push("Modalidade: " + fd.get("modo"));
      if (fd.get("periodo")) lines.push("Melhor período: " + fd.get("periodo"));
      return lines.join("\n");
    };
    var update = function () { preview.textContent = build(); };
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var a = document.createElement("a");
      a.href = waUrl(build());
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      demo();
    });
  }

  /* Vitrine de fotos do topo */
  var main = $("[data-main]");
  var cap = $("[data-cap]");
  $$(".thumbs button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".thumbs button").forEach(function (x) { x.classList.toggle("on", x === b); });
      main.src = "https://images.unsplash.com/" + b.dataset.img + "?w=900&q=70&auto=format&fit=crop";
      main.alt = b.dataset.alt;
      if (cap) cap.textContent = b.dataset.label;
    });
  });

  /* Topo com fundo ao rolar e barra fixa no celular */
  var top = $("[data-top]");
  var onScroll = function () { if (top) top.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  var mbar = $("[data-mbar]");
  var ctas = $(".hero .cta-row");
  if (mbar && ctas && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      mbar.classList.toggle("show", !en[0].isIntersecting && en[0].boundingClientRect.top < 0);
    }).observe(ctas);
  }

  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

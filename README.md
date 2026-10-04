# Site de psicóloga (exemplo de portfólio)

Site de uma página para psicóloga com agendamento pelo WhatsApp: a pessoa escolhe a modalidade (presencial ou online) e o melhor período, vê a mensagem pronta e envia.

**No ar:** https://rogermoreira-dev.github.io/lp-psicologa/

> Helena Prado é uma profissional fictícia. CRP, endereço e contatos são de exemplo e a página tem `noindex`. Fotos do Unsplash (licença gratuita).

## Feito para a área

- Textos dentro das orientações do Código de Ética do CFP: sem depoimentos de pacientes, sem promessa de resultado e sem preço como propaganda.
- Explica presencial e online (com cadastro no e-Psi), sigilo, reembolso pelo plano e a diferença entre psicóloga e psiquiatra.
- Rodapé com os contatos de emergência: CVV 188 e SAMU 192.

## Usar com uma cliente

1. Troque nome, CRP, bairro, horários e textos em `index.html`.
2. Coloque o WhatsApp (só números, com 55 e DDD) em `window.SITE.whatsapp`, no `<head>`.
3. Troque as fotos pelas fotos profissionais dela.
4. Remova a faixa de demonstração e a linha `<meta name="robots" content="noindex, nofollow">`.

HTML, CSS e JavaScript puros, sem build. Publicado pelo GitHub Pages direto da branch `main`.

Estrutura inspirada no template "craftsman contractor" do 21st.dev. Código original.

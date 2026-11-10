const botaoMenu = document.querySelector(".botao-menu");
const menuPrincipal = document.querySelector("#menu-principal");
const prefereMenosMovimento = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function alternarMenu(forcarFechado) {
  const estaAberto = forcarFechado
    ? false
    : menuPrincipal.classList.toggle("aberto");
  if (forcarFechado) menuPrincipal.classList.remove("aberto");
  botaoMenu.setAttribute("aria-expanded", estaAberto);
  botaoMenu.textContent = estaAberto ? "Fechar" : "Menu";
}

botaoMenu.addEventListener("click", () => alternarMenu(false));
menuPrincipal.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => alternarMenu(true));
});

const elementoDigitado = document.querySelector(".texto-digitado");
const assuntos = [
  "Java e Spring Boot",
  "Front-End",
  "Banco de Dados",
  "Python",
];
let indiceDoAssunto = 0;
let indiceDaLetra = assuntos[0].length;
let estaApagando = true;

function digitarAssunto() {
  const assuntoAtual = assuntos[indiceDoAssunto];
  indiceDaLetra += estaApagando ? -1 : 1;
  elementoDigitado.textContent = assuntoAtual.slice(0, indiceDaLetra);

  let espera = estaApagando ? 40 : 90;
  if (!estaApagando && indiceDaLetra === assuntoAtual.length) {
    estaApagando = true;
    espera = 1800;
  } else if (estaApagando && indiceDaLetra === 0) {
    estaApagando = false;
    indiceDoAssunto = (indiceDoAssunto + 1) % assuntos.length;
    espera = 350;
  }
  setTimeout(digitarAssunto, espera);
}

const cartoesDeProjeto = document.querySelectorAll(".projeto");
cartoesDeProjeto.forEach((cartao, posicao) =>
  cartao.style.setProperty("--ordem", posicao),
);

if (!prefereMenosMovimento) {
  document.documentElement.classList.add("js-animacao");
  setTimeout(digitarAssunto, 2600);

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  document
    .querySelectorAll(".tabela-rolagem, .lista-projetos")
    .forEach((bloco) => observador.observe(bloco));
}

const botoesDeFiltro = document.querySelectorAll(".filtros button");

botoesDeFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    const categoriaEscolhida = botao.dataset.filtro;
    botoesDeFiltro.forEach((outro) =>
      outro.setAttribute("aria-pressed", outro === botao),
    );
    cartoesDeProjeto.forEach((cartao) => {
      cartao.hidden = !(
        categoriaEscolhida === "todos" ||
        cartao.dataset.categoria === categoriaEscolhida
      );
    });
  });
});

const formularioContato = document.querySelector("#formulario-contato");
const mensagemDoFormulario = document.querySelector("#mensagem-formulario");

formularioContato.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nomeDaPessoa = formularioContato.elements["nome"].value.trim();
  mensagemDoFormulario.textContent = `Obrigado, ${nomeDaPessoa}! Sua mensagem foi simulada com sucesso.`;
  formularioContato.reset();
});

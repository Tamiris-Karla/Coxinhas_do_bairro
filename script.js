
const PRODUTOS = [
  // ----- COXINHAS -----
  { id: 11, categoria: "coxinha", nome: "Coxinha de Camarão", descricao: "Camarão cremoso com catupiry", preco: 22.0, imagem: "imagens/camarao.jpg" },
  { id: 12, categoria: "coxinha", nome: "Coxinha de Charque", descricao: "Charque desfiado e bem temperado", preco: 12.5, imagem: "imagens/charque.jpg" },
  { id: 13, categoria: "coxinha", nome: "Coxinha de Frango", descricao: "Frango desfiado • Massa crocante", preco: 10.5, imagem: "imagens/frango.jpg" },
  { id: 14, categoria: "coxinha", nome: "Coxinha de Queijo", descricao: "Queijo derretido por dentro", preco: 12.0, imagem: "imagens/queijo.jpg" },
  { id: 15, categoria: "coxinha", nome: "Coxinha de Carne de Sol", descricao: "Carne de sol com queijo coalho", preco: 18.0, imagem: "imagens/carne-de-sol.jpg" },
  { id: 16, categoria: "coxinha", nome: "Coxinha Vegetariana", descricao: "Legumes refogados e ervas", preco: 16.5, imagem: "imagens/vegetariana.jpg" },

  // ----- SOBREMESAS -----
  { id: 21, categoria: "sobremesa", nome: "Coxinha de Morango com Brigadeiro Tradicional", descricao: "Morango com brigadeiro de chocolate", preco: 10.0, icone: "🍓", imagem: "imagens/morango-brigadeiro.jpg" },
  { id: 22, categoria: "sobremesa", nome: "Coxinha de Morango com Brigadeiro de Leite Ninho", descricao: "Morango com brigadeiro de leite ninho", preco: 10.0, icone: "🍓", imagem: "imagens/morango-ninho.jpg" },
  { id: 23, categoria: "sobremesa", nome: "Coxinha de Doce de Leite com Canela", descricao: "Doce de leite cremoso e canela", preco: 10.0, icone: "🍯", imagem: "imagens/doce-de-leite.jpg" },
  { id: 24, categoria: "sobremesa", nome: "Pudim de Leite Tradicional", descricao: "Fatia com calda de caramelo", preco: 12.0, icone: "🍮", imagem: "imagens/pudim.jpg" },

  // ----- MOLHOS -----
  { id: 31, categoria: "molho", nome: "Molho de Pimenta", descricao: "Picante artesanal", preco: 1.5, icone: "🌶️", imagem: "imagens/molho-pimenta.jpg" },
  { id: 32, categoria: "molho", nome: "Maionese Temperada", descricao: "Alho e ervas", preco: 1.5, icone: "🧄", imagem: "imagens/maionese.jpg" },

  // ----- BEBIDAS -----
  { id: 41, categoria: "bebida", nome: "Suco de Laranja 300ml", descricao: "Natural, feito na hora", preco: 9.0, icone: "🍊", imagem: "imagens/suco-laranja.jpg" },
  { id: 42, categoria: "bebida", nome: "Suco de Maracujá 300ml", descricao: "Natural, feito na hora", preco: 9.0, icone: "🍹", imagem: "imagens/suco-maracuja.jpg" },
  { id: 43, categoria: "bebida", nome: "Refrigerante Cola 350ml", descricao: "Lata gelada", preco: 9.0, icone: "🥤", imagem: "imagens/refrigerante-cola.jpg" },
  { id: 44, categoria: "bebida", nome: "Guaraná 350ml", descricao: "Lata gelada", preco: 9.0, icone: "🥤", imagem: "imagens/guarana.jpg" },
  { id: 45, categoria: "bebida", nome: "Água Mineral 500ml", descricao: "Sem gás", preco: 4.0, icone: "💧", imagem: "imagens/agua.jpg" }
];


const BAIRROS = [
  { nome: "Boa Viagem", km: 1 },
  { nome: "Pina", km: 3 },
  { nome: "Imbiribeira", km: 4 },
  { nome: "Piedade (Jaboatão)", km: 5 },
  { nome: "Boa Vista", km: 7 },
  { nome: "Madalena", km: 8 },
  { nome: "Ibura", km: 8 },
  { nome: "Graças", km: 9 },
  { nome: "Casa Forte", km: 11 },
  { nome: "Várzea", km: 14 },
  { nome: "Olinda", km: 15 },
  { nome: "Paulista", km: 22 }
];

// ---------- 3) CLIENTE NÚMERO 1 ----------
const CLIENTE_1 = {
  nome: "Tamiris Karla Silva dos Santos",
  email: "tamiris@email.com",
  senha: "123456",
  telefone: "",
  rua: "Rua Nogueira de Souza",
  numero: "s/n",
  bairro: "Pina",
  cidade: "Recife"
};




function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}


function buscarProduto(id) {
  return PRODUTOS.find(function (p) { return p.id === id; });
}


function desenharCoxinha() {
  return '<svg viewBox="0 0 100 100"><path d="M50 8 C62 8 90 55 84 78 C80 92 20 92 16 78 C10 55 38 8 50 8Z" fill="#E8A33D" stroke="#B9701B" stroke-width="3"/><ellipse cx="40" cy="46" rx="8" ry="15" fill="#F6C766" opacity="0.8"/></svg>';
}


function desenhoPadrao(produto) {
  if (produto.categoria === "coxinha") return desenharCoxinha();
  return produto.icone;
}


function imagemDoProduto(produto) {
  if (!produto.imagem) return desenhoPadrao(produto);
  // onerror: se a foto não for encontrada, troca pelo desenho (o site nunca fica "quebrado")
  return '<img src="' + produto.imagem + '" alt="' + produto.nome + '" onerror="trocarPorDesenho(this, ' + produto.id + ')">';
}

function trocarPorDesenho(img, id) {
  img.outerHTML = desenhoPadrao(buscarProduto(id));
}



function pegarCarrinho() {
  const salvo = JSON.parse(localStorage.getItem("carrinho")) || [];
  // ignora itens de produtos que não existem mais na lista
  return salvo.filter(function (i) { return buscarProduto(i.id); });
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContador();
}

function adicionarAoCarrinho(id) {
  const carrinho = pegarCarrinho();
  const item = carrinho.find(function (i) { return i.id === id; });
  if (item) {
    item.qtd = item.qtd + 1;       
  } else {
    carrinho.push({ id: id, qtd: 1 }); 
  }
  salvarCarrinho(carrinho);
}

function totalDeItens() {
  let total = 0;
  for (const item of pegarCarrinho()) {
    total = total + item.qtd;
  }
  return total;
}

function calcularSubtotal() {
  let soma = 0;
  for (const item of pegarCarrinho()) {
    soma = soma + buscarProduto(item.id).preco * item.qtd;
  }
  return soma;
}


function atualizarContador() {
  const bolinha = document.getElementById("contador");
  if (!bolinha) return;
  const total = totalDeItens();
  bolinha.textContent = total;
  bolinha.style.display = total > 0 ? "flex" : "none";
  bolinha.classList.remove("pop");
  void bolinha.offsetWidth;          // truque para reiniciar a animação
  bolinha.classList.add("pop");
}


function pegarClientes() {
  const salvos = JSON.parse(localStorage.getItem("clientes"));
  if (salvos) return salvos;
  const lista = [CLIENTE_1];         // primeira vez: só existe o cliente 1
  localStorage.setItem("clientes", JSON.stringify(lista));
  return lista;
}

function salvarClientes(lista) {
  localStorage.setItem("clientes", JSON.stringify(lista));
}

function pegarClienteLogado() {
  return JSON.parse(localStorage.getItem("clienteLogado"));
}

function entrar(cliente) {
  localStorage.setItem("clienteLogado", JSON.stringify(cliente));
}

function sair() {
  localStorage.removeItem("clienteLogado");
  window.location.href = "index.html";
}


function irParaProximaEtapa() {
  if (totalDeItens() === 0) {
    window.location.href = "index.html";
  } else {
    window.location.href = "entrega.html";
  }
}


function pegarEntrega() {
  return JSON.parse(localStorage.getItem("entrega"));
}


function mostrarAviso(texto) {
  const aviso = document.createElement("div");
  aviso.className = "aviso";
  aviso.textContent = texto;
  document.body.appendChild(aviso);
  setTimeout(function () { aviso.remove(); }, 2000);
}


function montarCabecalho() {
  const cliente = pegarClienteLogado();
  let areaCliente = '<a href="login.html">Entrar</a>';
  if (cliente) {
    const primeiroNome = cliente.nome.split(" ")[0];
    areaCliente = 'Olá, ' + primeiroNome + '! <a href="#" onclick="sair()">Sair</a>';
  }

  document.getElementById("cabecalho").innerHTML =
    '<a class="logo" href="index.html">' +
      '<span class="logo-circulo">' + desenharCoxinha() + '</span>' +
      '<span class="logo-texto">Coxinhas<br>do Bairro</span>' +
    '</a>' +
    '<nav class="menu">' +
      '<a href="index.html">Cardápio</a>' +
      '<a href="carrinho.html" class="link-carrinho">🛒 Carrinho<span class="contador" id="contador">0</span></a>' +
      '<span>' + areaCliente + '</span>' +
    '</nav>';

  atualizarContador();
}




function clicouAdicionar(id, botao) {
  adicionarAoCarrinho(id);

  // movimento: o botão dá uma "pulada"
  botao.classList.remove("pulou");
  void botao.offsetWidth;
  botao.classList.add("pulou");

  mostrarAviso("✔ " + buscarProduto(id).nome + " adicionada!");
}

function iniciarCardapio() {
  document.getElementById("hero-coxinha").innerHTML = desenharCoxinha(); // coxinha flutuante
}




function desenharCarrinho() {
  const carrinho = pegarCarrinho();
  const lista = document.getElementById("lista-carrinho");
  const resumo = document.getElementById("resumo-carrinho");

  // Carrinho vazio: mostra um recado
  if (carrinho.length === 0) {
    lista.innerHTML = '<p class="vazio">Seu carrinho está vazio 😢<br>Volte ao cardápio e escolha suas coxinhas!</p>';
    resumo.style.display = "none";
    return;
  }

  resumo.style.display = "block";
  let html = "";

  for (const item of carrinho) {
    const produto = buscarProduto(item.id);
    html = html +
      '<div class="item-carrinho">' +
        '<div class="produto-img">' + imagemDoProduto(produto) + '</div>' +
        '<div class="item-nome">' + produto.nome + '<br><span class="preco">' + formatarPreco(produto.preco) + '</span></div>' +
        '<div class="quantidade">' +
          '<button onclick="mudarQuantidade(' + produto.id + ', -1)">−</button>' +
          '<strong>' + item.qtd + '</strong>' +
          '<button onclick="mudarQuantidade(' + produto.id + ', 1)">+</button>' +
        '</div>' +
        '<strong>' + formatarPreco(produto.preco * item.qtd) + '</strong>' +
        '<button class="lixeira" onclick="mudarQuantidade(' + produto.id + ', -999)" title="Remover">🗑️</button>' +
      '</div>';
  }
  lista.innerHTML = html;

  resumo.innerHTML =
    '<div class="linha-resumo"><span>Subtotal</span><strong>' + formatarPreco(calcularSubtotal()) + '</strong></div>' +
    '<p class="sub">O frete é calculado na etapa de entrega.</p>';
}


function mudarQuantidade(id, mudanca) {
  let carrinho = pegarCarrinho();
  const item = carrinho.find(function (i) { return i.id === id; });
  item.qtd = item.qtd + mudanca;

 
  if (item.qtd <= 0) {
    carrinho = carrinho.filter(function (i) { return i.id !== id; });
  }
  salvarCarrinho(carrinho);
  desenharCarrinho();
}


function continuar() {
  if (totalDeItens() === 0) {
    mostrarAviso("Adicione alguma coxinha primeiro 🙂");
    return;
  }
  if (pegarClienteLogado()) {
    window.location.href = "entrega.html";
  } else {
    window.location.href = "login.html";
  }
}

function iniciarCarrinho() {
  desenharCarrinho();
}




function preencherTeste() {
  document.getElementById("email").value = CLIENTE_1.email;
  document.getElementById("senha").value = CLIENTE_1.senha;
}

function esqueceuSenha() {
  mostrarAviso("Isso é só um projeto de estudo 🙂");
}

function iniciarLogin() {
  const formulario = document.getElementById("form-login");
  const campoEmail = document.getElementById("email");
  const campoSenha = document.getElementById("senha");
  const caixaLembrar = document.getElementById("lembrar");
  const mensagemErro = document.getElementById("erro");

 
  const emailLembrado = localStorage.getItem("emailLembrado");
  if (emailLembrado) {
    campoEmail.value = emailLembrado;
    caixaLembrar.checked = true;
  }


  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); 

    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;

    
    const cliente = pegarClientes().find(function (c) {
      return c.email === email && c.senha === senha;
    });

    if (cliente) {
      if (caixaLembrar.checked) {
        localStorage.setItem("emailLembrado", email);
      } else {
        localStorage.removeItem("emailLembrado");
      }
      entrar(cliente);        
      irParaProximaEtapa();   
    } else {
      
      mensagemErro.textContent = "E-mail ou senha incorretos. Confira e tente de novo.";
      formulario.classList.remove("shake");
      void formulario.offsetWidth;
      formulario.classList.add("shake");
    }
  });
}




function iniciarCadastro() {
  const formulario = document.getElementById("form-cadastro");
  const mensagemErro = document.getElementById("erro");
  const campoBairro = document.getElementById("bairro");

  
  let opcoes = '<option value="">Escolha...</option>';
  for (const bairro of BAIRROS) {
    opcoes = opcoes + '<option value="' + bairro.nome + '">' + bairro.nome + '</option>';
  }
  campoBairro.innerHTML = opcoes;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;
    const senha2 = document.getElementById("senha2").value;
    const clientes = pegarClientes();

  
    const jaExiste = clientes.some(function (c) { return c.email === email; });
    let problema = "";
    if (jaExiste) problema = "Já existe uma conta com esse e-mail.";
    else if (senha !== senha2) problema = "As senhas não são iguais.";

    if (problema !== "") {
      mensagemErro.textContent = problema;
      formulario.classList.remove("shake");
      void formulario.offsetWidth;
      formulario.classList.add("shake");
      return; // para aqui
    }

    
    const novoCliente = {
      nome: document.getElementById("nome").value.trim(),
      email: email,
      senha: senha,
      telefone: document.getElementById("telefone").value,
      rua: document.getElementById("rua").value.trim(),
      numero: document.getElementById("numero").value.trim(),
      bairro: campoBairro.value,
      cidade: "Recife"
    };

    clientes.push(novoCliente);   // coloca na lista
    salvarClientes(clientes);     // guarda a lista
    entrar(novoCliente);          // já entra logada
    irParaProximaEtapa();
  });
}





const KM_POR_FAIXA = 5;      // a cada 5 km...
const VALOR_POR_FAIXA = 5;   // ...cobra 5 reais
let freteAtual = 0;


function calcularValorFrete(km) {
  let faixas = Math.ceil(km / KM_POR_FAIXA); // arredonda para cima
  if (faixas < 1) faixas = 1;                // mínimo: 1 faixa
  return faixas * VALOR_POR_FAIXA;
}


function preencherKmDoBairro() {
  const nomeBairro = document.getElementById("bairro").value;
  const bairro = BAIRROS.find(function (b) { return b.nome === nomeBairro; });
  if (bairro) {
    document.getElementById("km").value = bairro.km;
  }
  calcularFrete();
}

function calcularFrete() {
  const km = parseFloat(document.getElementById("km").value);
  const caixa = document.getElementById("resultado-frete");

  if (isNaN(km)) {
    caixa.innerHTML = "";
    freteAtual = 0;
    desenharResumoEntrega();
    return;
  }

  freteAtual = calcularValorFrete(km);
  const faixas = freteAtual / VALOR_POR_FAIXA;
  caixa.innerHTML =
    '📏 Distância: <strong>' + km + ' km</strong><br>' +
    '🛵 ' + faixas + ' faixa(s) de ' + KM_POR_FAIXA + ' km × ' + formatarPreco(VALOR_POR_FAIXA) +
    ' = <strong>' + formatarPreco(freteAtual) + '</strong> de frete';
  desenharResumoEntrega();
}


function desenharResumoEntrega() {
  let html = "";
  for (const item of pegarCarrinho()) {
    const produto = buscarProduto(item.id);
    html = html + '<div class="linha-resumo"><span>' + item.qtd + '× ' + produto.nome + '</span><span>' + formatarPreco(produto.preco * item.qtd) + '</span></div>';
  }
  const subtotal = calcularSubtotal();
  html = html +
    '<div class="linha-resumo" style="border-top:1px solid #EBD7B5; margin-top:8px; padding-top:10px"><span>Subtotal</span><span>' + formatarPreco(subtotal) + '</span></div>' +
    '<div class="linha-resumo"><span>Taxa de entrega</span><span>' + formatarPreco(freteAtual) + '</span></div>' +
    '<div class="linha-resumo total"><span>Total</span><span>' + formatarPreco(subtotal + freteAtual) + '</span></div>';
  document.getElementById("resumo").innerHTML = html;
}

function iniciarEntrega() {
 
  const cliente = pegarClienteLogado();
  if (!cliente) { window.location.href = "login.html"; return; }
  if (totalDeItens() === 0) { window.location.href = "index.html"; return; }

  const campoBairro = document.getElementById("bairro");
  const campoKm = document.getElementById("km");

  
  let opcoes = '<option value="">Escolha...</option>';
  for (const bairro of BAIRROS) {
    opcoes = opcoes + '<option value="' + bairro.nome + '">' + bairro.nome + '</option>';
  }
  opcoes = opcoes + '<option value="outro">Outro bairro (digite os km)</option>';
  campoBairro.innerHTML = opcoes;

  
  document.getElementById("rua").value = cliente.rua;
  document.getElementById("numero").value = cliente.numero;
  campoBairro.value = cliente.bairro;
  preencherKmDoBairro();

  
  campoBairro.addEventListener("change", preencherKmDoBairro);
  campoKm.addEventListener("input", calcularFrete);

  
  document.getElementById("form-entrega").addEventListener("submit", function (evento) {
    evento.preventDefault();
    calcularFrete();

    
    const entrega = {
      rua: document.getElementById("rua").value.trim(),
      numero: document.getElementById("numero").value.trim(),
      bairro: campoBairro.value,
      complemento: document.getElementById("complemento").value.trim(),
      km: parseFloat(campoKm.value),
      frete: freteAtual
    };
    localStorage.setItem("entrega", JSON.stringify(entrega));
    window.location.href = "pagamento.html";
  });
}




function iniciarPagamento() {
  // Proteções
  const cliente = pegarClienteLogado();
  const entrega = pegarEntrega();
  if (!cliente) { window.location.href = "login.html"; return; }
  if (totalDeItens() === 0) { window.location.href = "index.html"; return; }
  if (!entrega) { window.location.href = "entrega.html"; return; }

  const subtotal = calcularSubtotal();
  const total = subtotal + entrega.frete;

 
  const cartao = document.getElementById("cartao");
  const campoNumero = document.getElementById("numero");
  const campoNome = document.getElementById("nome");
  const campoValidade = document.getElementById("validade");
  const campoCvv = document.getElementById("cvv");
  const mensagemErro = document.getElementById("erro");
  const botaoPagar = document.getElementById("botao-pagar");

  
  let html = "";
  for (const item of pegarCarrinho()) {
    const produto = buscarProduto(item.id);
    html = html + '<div class="linha-resumo"><span>' + item.qtd + '× ' + produto.nome + '</span><span>' + formatarPreco(produto.preco * item.qtd) + '</span></div>';
  }
  html = html +
    '<div class="linha-resumo" style="border-top:1px solid #EBD7B5; margin-top:8px; padding-top:10px"><span>Subtotal</span><span>' + formatarPreco(subtotal) + '</span></div>' +
    '<div class="linha-resumo"><span>Taxa de entrega</span><span>' + formatarPreco(entrega.frete) + '</span></div>' +
    '<div class="linha-resumo total"><span>Total</span><span>' + formatarPreco(total) + '</span></div>';
  document.getElementById("resumo").innerHTML = html;

  document.getElementById("dados-entrega").innerHTML =
    '📍 <strong>Entregar em:</strong><br>' + entrega.rua + ', ' + entrega.numero + ' - ' + entrega.bairro +
    (entrega.complemento ? ' (' + entrega.complemento + ')' : '') + '<br>👤 ' + cliente.nome;

  
  let opcoesParcelas = "";
  for (let vezes = 1; vezes <= 3; vezes++) {
    opcoesParcelas = opcoesParcelas + '<option value="' + vezes + '">' + vezes + 'x de ' + formatarPreco(total / vezes) + ' sem juros</option>';
  }
  document.getElementById("parcelas").innerHTML = opcoesParcelas;
  botaoPagar.textContent = "Pagar " + formatarPreco(total);

  

  campoNumero.addEventListener("input", function () {
    const digitos = campoNumero.value.replace(/\D/g, "").slice(0, 16);
    const comEspacos = digitos.replace(/(.{4})/g, "$1 ").trim();
    campoNumero.value = comEspacos;
    document.getElementById("cartao-numero").textContent = comEspacos || "•••• •••• •••• ••••";

   
    let bandeira = "CARTÃO";
    if (digitos.startsWith("4")) bandeira = "VISA";
    if (digitos.startsWith("5") || digitos.startsWith("2")) bandeira = "MASTERCARD";
    document.getElementById("bandeira").textContent = bandeira;
  });

  
  campoNome.addEventListener("input", function () {
    document.getElementById("cartao-nome").textContent = campoNome.value.toUpperCase() || "SEU NOME";
  });

  
  campoValidade.addEventListener("input", function () {
    let digitos = campoValidade.value.replace(/\D/g, "").slice(0, 4);
    if (digitos.length > 2) {
      digitos = digitos.slice(0, 2) + "/" + digitos.slice(2);
    }
    campoValidade.value = digitos;
    document.getElementById("cartao-validade").textContent = digitos || "MM/AA";
  });

  
  campoCvv.addEventListener("input", function () {
    campoCvv.value = campoCvv.value.replace(/\D/g, "").slice(0, 3);
    document.getElementById("cartao-cvv").textContent = campoCvv.value || "•••";
  });

  
  campoCvv.addEventListener("focus", function () { cartao.classList.add("virado"); });
  campoCvv.addEventListener("blur", function () { cartao.classList.remove("virado"); });


  function mostrarErro(texto) {
    mensagemErro.textContent = texto;
    cartao.classList.remove("shake");
    void cartao.offsetWidth;
    cartao.classList.add("shake");
  }

  document.getElementById("form-pagamento").addEventListener("submit", function (evento) {
    evento.preventDefault();
    mensagemErro.textContent = "";

    
    const digitos = campoNumero.value.replace(/\D/g, "");
    if (digitos.length !== 16) return mostrarErro("O número do cartão precisa ter 16 dígitos.");
    if (campoNome.value.trim().length < 3) return mostrarErro("Digite o nome que está no cartão.");

    const mes = parseInt(campoValidade.value.slice(0, 2));
    const ano = 2000 + parseInt(campoValidade.value.slice(3, 5));
    const hoje = new Date();
    if (campoValidade.value.length !== 5 || mes < 1 || mes > 12) return mostrarErro("Validade inválida. Use o formato MM/AA.");
    if (ano < hoje.getFullYear() || (ano === hoje.getFullYear() && mes < hoje.getMonth() + 1)) return mostrarErro("Esse cartão está vencido.");
    if (campoCvv.value.length !== 3) return mostrarErro("O CVV tem 3 números.");

    
    botaoPagar.disabled = true;
    botaoPagar.innerHTML = '<span class="spinner"></span>Processando...';

    setTimeout(function () {
      
      const pedido = {
        numero: Math.floor(1000 + Math.random() * 9000),
        itens: pegarCarrinho(),
        subtotal: subtotal,
        frete: entrega.frete,
        total: total,
        parcelas: document.getElementById("parcelas").value,
        cliente: cliente.nome,
        entrega: entrega
      };
      localStorage.setItem("ultimoPedido", JSON.stringify(pedido));
      window.location.href = "sucesso.html";
    }, 2000);
  });
}




function iniciarSucesso() {
  const pedido = JSON.parse(localStorage.getItem("ultimoPedido"));
  const area = document.getElementById("confirmacao");

  if (!pedido) {
    area.innerHTML = '<p class="vazio">Nenhum pedido por aqui ainda.</p><a class="btn" href="index.html">Ver o cardápio</a>';
    return;
  }

  let itens = "";
  for (const item of pedido.itens) {
    const produto = buscarProduto(item.id);
    itens = itens + '<div class="linha-resumo"><span>' + item.qtd + '× ' + produto.nome + '</span><span>' + formatarPreco(produto.preco * item.qtd) + '</span></div>';
  }

  const e = pedido.entrega;
  area.innerHTML =
    '<div class="check-grande">✓</div>' +
    '<h2>Pedido confirmado!</h2>' +
    '<p class="sub">Pedido nº <strong>' + pedido.numero + '</strong> • ' + pedido.cliente + '</p>' +
    '<div style="text-align:left; margin-top:18px">' + itens +
      '<div class="linha-resumo"><span>Taxa de entrega</span><span>' + formatarPreco(pedido.frete) + '</span></div>' +
      '<div class="linha-resumo total"><span>Total (' + pedido.parcelas + 'x)</span><span>' + formatarPreco(pedido.total) + '</span></div>' +
    '</div>' +
    '<p class="sub" style="margin-top:16px">📍 ' + e.rua + ', ' + e.numero + ' - ' + e.bairro + '<br>🛵 Entrega estimada: 30 a 40 minutos</p>' +
    '<a class="btn" style="margin-top:14px" href="index.html">Fazer outro pedido</a>';

  
  localStorage.removeItem("carrinho");
  localStorage.removeItem("entrega");
  atualizarContador();
}



montarCabecalho();

const paginaAtual = document.body.dataset.pagina;
if (paginaAtual === "cardapio") iniciarCardapio();
if (paginaAtual === "carrinho") iniciarCarrinho();
if (paginaAtual === "login") iniciarLogin();
if (paginaAtual === "cadastro") iniciarCadastro();
if (paginaAtual === "entrega") iniciarEntrega();
if (paginaAtual === "pagamento") iniciarPagamento();
if (paginaAtual === "sucesso") iniciarSucesso();
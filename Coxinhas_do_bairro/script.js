
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
  cidade: "Recife",
  perfil: "root",
  perfis: ["admin", "root"]
};

const FORNECEDOR_1 = {
  nome: "Mercado Atual",
  email: "mercadoatual@email.com",
  senha: "123456",
  perfil: "fornecedor",
  perfis: ["fornecedor"],
  categoria: "bebida"
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
  atualizarCarrinhoAbandonado(carrinho);
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
  const salvos = JSON.parse(localStorage.getItem("clientes")) || [];
  if (!salvos.some(c => c.email.toLowerCase() === CLIENTE_1.email)) salvos.push(CLIENTE_1);
  if (!salvos.some(c => c.email.toLowerCase() === FORNECEDOR_1.email)) salvos.push(FORNECEDOR_1);
  const tamiris = salvos.find(c => c.email.toLowerCase() === CLIENTE_1.email);
  if (tamiris) { tamiris.perfil = "root"; tamiris.perfis = ["admin", "root"]; }
  const fornecedor = salvos.find(c => c.email.toLowerCase() === FORNECEDOR_1.email);
  if (fornecedor) {
    fornecedor.perfil = "fornecedor";
    fornecedor.perfis = ["fornecedor"];
    fornecedor.categoria = "bebida";
    fornecedor.fornecedorStatus = "aprovado";
  }
  localStorage.setItem("clientes", JSON.stringify(salvos));
  return salvos;
}
function salvarClientes(lista) { localStorage.setItem("clientes", JSON.stringify(lista)); }
function pegarClienteLogado() { return JSON.parse(localStorage.getItem("clienteLogado")); }
function registrarAuditoria(acao, detalhes) {
  const registros = JSON.parse(localStorage.getItem("auditoria")) || [];
  const usuario = pegarClienteLogado();
  registros.push({ id: Date.now() + Math.random(), usuario: usuario ? usuario.email : "sistema", acao, detalhes: detalhes || "", dataHora: new Date().toISOString() });
  localStorage.setItem("auditoria", JSON.stringify(registros));
}
function entrar(cliente) {
  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  const sessao = { id: Date.now(), email: cliente.email, login: new Date().toISOString(), logout: null };
  sessoes.push(sessao); localStorage.setItem("sessoes", JSON.stringify(sessoes));
  sessionStorage.setItem("sessaoAtual", String(sessao.id));
  localStorage.setItem("clienteLogado", JSON.stringify(cliente));
  atualizarCarrinhoAbandonado(pegarCarrinho());
  registrarAuditoria("LOGIN", "Início de sessão");
}
function sair() {
  const id = Number(sessionStorage.getItem("sessaoAtual"));
  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  const sessao = sessoes.find(s => s.id === id);
  if (sessao && !sessao.logout) { sessao.logout = new Date().toISOString(); localStorage.setItem("sessoes", JSON.stringify(sessoes)); }
  registrarAuditoria("LOGOUT", "Encerramento de sessão");
  sessionStorage.removeItem("sessaoAtual"); localStorage.removeItem("clienteLogado");
  window.location.href = "index.html";
}
function usuarioTemPerfil(usuario, perfil) {
  return !!usuario && (usuario.perfis || [usuario.perfil || "cliente"]).includes(perfil);
}
function exigirPerfil(perfis) {
  const usuario = pegarClienteLogado();
  if (!usuario || !perfis.some(p => usuarioTemPerfil(usuario, p))) {
    alert("Você não tem permissão para acessar esta página."); window.location.href = "login.html"; return null;
  }
  return usuario;
}

function irParaProximaEtapa() {
  if (totalDeItens() === 0) {
    const usuario = pegarClienteLogado();
    if (usuario && !usuarioTemPerfil(usuario, "fornecedor") &&
        !usuarioTemPerfil(usuario, "admin") && !usuarioTemPerfil(usuario, "root")) {
      window.location.href = "perfil.html";
    } else {
      window.location.href = "index.html";
    }
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
  let areaCliente = `
    <details class="menu-acesso">
      <summary>Entrar <span aria-hidden="true">▾</span></summary>
      <div class="submenu-acesso">
        <a href="login.html">Entrar como cliente</a>
        <a href="login-admin.html">Entrar como administrador</a>
        <a href="fornecedor-login.html">Entrar como fornecedor</a>
      </div>
    </details>
  `;

  if (cliente) {
    const primeiroNome = (cliente.nome || "Usuário").split(" ")[0];
    const ehFornecedor = usuarioTemPerfil(cliente, "fornecedor");
    const ehEquipe = usuarioTemPerfil(cliente, "admin") || usuarioTemPerfil(cliente, "root");
    const linkPerfil = (!ehFornecedor && !ehEquipe)
      ? '<a href="perfil.html">Meu perfil</a>'
      : '';

    areaCliente = `
      <div class="usuario-logado">
        <span>Olá, ${primeiroNome}!</span>
        ${linkPerfil}
        <a href="#" onclick="sair(); return false;">Sair</a>
      </div>
    `;
  }

  document.getElementById("cabecalho").innerHTML =
    '<a class="logo" href="index.html">' +
      '<span class="logo-circulo">' + desenharCoxinha() + '</span>' +
      '<span class="logo-texto">Coxinhas<br>do Bairro</span>' +
    '</a>' +
    '<nav class="menu">' +
      '<a href="index.html">Cardápio</a>' +
      '<a href="carrinho.html" class="link-carrinho">🛒 Carrinho<span class="contador" id="contador">0</span></a>' +
      '<div class="area-entrada">' + areaCliente + '</div>' +
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
  if (!formulario) return;

  const campoEmail = document.getElementById("email");
  const campoSenha = document.getElementById("senha");
  const caixaLembrar = document.getElementById("lembrar");
  const mensagemErro = document.getElementById("erro");
  const tipoLogin = document.body.dataset.tipoLogin || "cliente";
  const somenteFornecedor = tipoLogin === "fornecedor";
  const somenteAdmin = tipoLogin === "admin";
  const chaveEmail = somenteFornecedor ? "emailFornecedorLembrado" :
    somenteAdmin ? "emailAdminLembrado" : "emailLembrado";

  const emailLembrado = localStorage.getItem(chaveEmail);

  if (emailLembrado) {
    campoEmail.value = emailLembrado;
    if (caixaLembrar) caixaLembrar.checked = true;
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;

    const usuario = pegarClientes().find(function (c) {
      return c.email.toLowerCase() === email && c.senha === senha;
    });

    if (somenteFornecedor && (!usuario || !usuarioTemPerfil(usuario, "fornecedor"))) {
      mensagemErro.textContent = "E-mail ou senha de fornecedor incorretos.";
      formulario.classList.remove("shake");
      void formulario.offsetWidth;
      formulario.classList.add("shake");
      return;
    }

    if (somenteFornecedor && usuario &&
        usuario.fornecedorStatus && usuario.fornecedorStatus !== "aprovado") {
      mensagemErro.textContent = "Seu cadastro está aguardando aprovação do administrador.";
      formulario.classList.remove("shake");
      void formulario.offsetWidth;
      formulario.classList.add("shake");
      return;
    }

    if (somenteAdmin && (!usuario ||
        (!usuarioTemPerfil(usuario, "admin") && !usuarioTemPerfil(usuario, "root")))) {
      mensagemErro.textContent = "Esta conta não possui acesso administrativo.";
      formulario.classList.remove("shake");
      void formulario.offsetWidth;
      formulario.classList.add("shake");
      return;
    }

    if (!somenteFornecedor && !somenteAdmin && usuario &&
        (usuarioTemPerfil(usuario, "fornecedor") ||
         usuarioTemPerfil(usuario, "admin") || usuarioTemPerfil(usuario, "root"))) {
      mensagemErro.textContent = "Esta conta é de fornecedor. Acesse pela Área do fornecedor.";
      formulario.classList.remove("shake");
      void formulario.offsetWidth;
      formulario.classList.add("shake");
      return;
    }

    if (usuario) {
      if (caixaLembrar && caixaLembrar.checked) {
        localStorage.setItem(chaveEmail, email);
      } else {
        localStorage.removeItem(chaveEmail);
      }

      entrar(usuario);

      if (somenteAdmin) {
        window.location.href = "admin.html";
      } else if (usuarioTemPerfil(usuario, "root")) {
        window.location.href = "root.html";
      } else if (usuarioTemPerfil(usuario, "admin")) {
        window.location.href = "admin.html";
      } else if (usuarioTemPerfil(usuario, "fornecedor")) {
        window.location.href = "fornecedor.html";
      } else {
        irParaProximaEtapa();
      }
    } else {
      mensagemErro.textContent = "E-mail ou senha incorretos. Confira e tente novamente.";
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





function iniciarCadastroFornecedor() {
  const formulario = document.getElementById("form-cadastro-fornecedor");
  if (!formulario) return;

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nomeEmpresa = document.getElementById("empresa").value.trim();
    const contato = document.getElementById("contato").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const telefone = document.getElementById("telefone").value.trim();
    const categoria = document.getElementById("categoria").value;
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("senha2").value;
    const erro = document.getElementById("erro");
    const clientes = pegarClientes();

    if (clientes.some(c => c.email.toLowerCase() === email)) {
      erro.textContent = "Já existe um cadastro com esse e-mail.";
      return;
    }
    if (senha.length < 6) {
      erro.textContent = "A senha precisa ter pelo menos 6 caracteres.";
      return;
    }
    if (senha !== confirmar) {
      erro.textContent = "As senhas não coincidem.";
      return;
    }

    const novoFornecedor = {
      nome: contato,
      empresa: nomeEmpresa,
      email,
      senha,
      telefone,
      perfil: "fornecedor",
      perfis: ["fornecedor"],
      categoria,
      fornecedorStatus: "pendente",
      criadoEm: new Date().toISOString()
    };

    clientes.push(novoFornecedor);
    salvarClientes(clientes);

    const solicitacoes = JSON.parse(localStorage.getItem("solicitacoesFornecedores")) || [];
    solicitacoes.push({
      email,
      empresa: nomeEmpresa,
      contato,
      categoria,
      telefone,
      status: "pendente",
      criadoEm: new Date().toISOString()
    });
    localStorage.setItem("solicitacoesFornecedores", JSON.stringify(solicitacoes));

    erro.className = "mensagem-sucesso";
    erro.textContent = "Cadastro enviado! Você poderá entrar após a aprovação do administrador.";
    formulario.reset();
  });
}

function aprovarFornecedor(email) {
  const clientes = pegarClientes();
  const fornecedor = clientes.find(c => c.email.toLowerCase() === email.toLowerCase());
  if (!fornecedor || !usuarioTemPerfil(fornecedor, "fornecedor")) return;

  fornecedor.fornecedorStatus = "aprovado";
  salvarClientes(clientes);

  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoesFornecedores")) || [];
  const solicitacao = solicitacoes.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (solicitacao) solicitacao.status = "aprovado";
  localStorage.setItem("solicitacoesFornecedores", JSON.stringify(solicitacoes));

  registrarAuditoria("FORNECEDOR_APROVADO", email);
  alert("Fornecedor aprovado. Ele já pode acessar a área do fornecedor.");
  iniciarAdmin();
}

function atualizarCarrinhoAbandonado(carrinho) {
  const usuario = pegarClienteLogado();
  if (!usuario || usuarioTemPerfil(usuario, "fornecedor") ||
      usuarioTemPerfil(usuario, "admin") || usuarioTemPerfil(usuario, "root")) return;

  const lista = JSON.parse(localStorage.getItem("carrinhosAbandonados")) || [];
  const email = usuario.email.toLowerCase();
  const existente = lista.find(c => c.email.toLowerCase() === email);

  if (!carrinho || carrinho.length === 0) {
    localStorage.setItem("carrinhosAbandonados",
      JSON.stringify(lista.filter(c => c.email.toLowerCase() !== email)));
    return;
  }

  const registro = {
    email,
    cliente: usuario.nome,
    itens: carrinho,
    atualizadoEm: new Date().toISOString()
  };

  if (existente) Object.assign(existente, registro);
  else lista.push(registro);

  localStorage.setItem("carrinhosAbandonados", JSON.stringify(lista));
}

function removerCarrinhoAbandonado(email) {
  if (!email) return;
  const lista = JSON.parse(localStorage.getItem("carrinhosAbandonados")) || [];
  localStorage.setItem("carrinhosAbandonados",
    JSON.stringify(lista.filter(c => c.email.toLowerCase() !== email.toLowerCase())));
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
        clienteEmail: cliente.email.toLowerCase(),
        criadoEm: new Date().toISOString(),
        status: "Recebido",
        entrega: entrega
      };
      localStorage.setItem("ultimoPedido", JSON.stringify(pedido));
      const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];
      pedidosSalvos.push(pedido);
      localStorage.setItem("pedidos", JSON.stringify(pedidosSalvos));
      removerCarrinhoAbandonado(cliente.email);
      registrarAuditoria("PEDIDO_CRIADO", "Pedido nº " + pedido.numero);
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


function iniciarPerfil() {
  const usuario = pegarClienteLogado();

  if (!usuario) {
    window.location.href = "login.html";
    return;
  }

  if (usuarioTemPerfil(usuario, "fornecedor") ||
      usuarioTemPerfil(usuario, "admin") ||
      usuarioTemPerfil(usuario, "root")) {
    window.location.href = "index.html";
    return;
  }

  const areaDados = document.getElementById("dados-cliente");
  const areaHistorico = document.getElementById("historico-pedidos");
  if (!areaDados || !areaHistorico) return;

  areaDados.innerHTML = `
    <div class="perfil-dados-grid">
      <p><strong>Nome:</strong> ${usuario.nome || "—"}</p>
      <p><strong>E-mail:</strong> ${usuario.email || "—"}</p>
      <p><strong>Telefone:</strong> ${usuario.telefone || "—"}</p>
      <p><strong>Endereço:</strong> ${usuario.rua || "—"}, ${usuario.numero || "s/n"}</p>
      <p><strong>Bairro:</strong> ${usuario.bairro || "—"}</p>
      <p><strong>Cidade:</strong> ${usuario.cidade || "—"}</p>
    </div>
  `;

  const todosPedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const emailCliente = (usuario.email || "").toLowerCase();

  // Pedidos novos são vinculados pelo e-mail. Pedidos antigos, criados
  // antes desta atualização, podem ser reconhecidos pelo nome cadastrado.
  const meusPedidos = todosPedidos.filter(p => {
    if (p.clienteEmail) return p.clienteEmail.toLowerCase() === emailCliente;
    return p.cliente && p.cliente.trim().toLowerCase() ===
      (usuario.nome || "").trim().toLowerCase();
  }).sort((a, b) => {
    const dataA = new Date(a.criadoEm || 0).getTime();
    const dataB = new Date(b.criadoEm || 0).getTime();
    return dataB - dataA;
  });

  if (meusPedidos.length === 0) {
    areaHistorico.innerHTML = `
      <div class="historico-vazio">
        <span>🛍️</span>
        <h3>Você ainda não tem pedidos</h3>
        <p>Quando fizer sua primeira compra, ela aparecerá aqui.</p>
        <a class="btn" href="index.html">Ver cardápio</a>
      </div>
    `;
    return;
  }

  areaHistorico.innerHTML = meusPedidos.map(pedido => {
    const itensHtml = (pedido.itens || []).map(item => {
      const produto = buscarProduto(item.id);
      const nome = produto ? produto.nome : "Produto";
      const preco = produto ? produto.preco : 0;
      return `<li>${item.qtd} × ${nome}</li>`;
    }).join("");

    const data = pedido.criadoEm
      ? new Date(pedido.criadoEm).toLocaleString("pt-BR")
      : "Data não registrada";
    const numero = pedido.numero || "—";
    const status = pedido.status || "Recebido";
    const total = Number(pedido.total || 0);

    return `
      <article class="pedido-historico">
        <div class="pedido-historico-topo">
          <div>
            <strong>Pedido #${numero}</strong>
            <span>${data}</span>
          </div>
          <span class="pedido-status">${status}</span>
        </div>
        <ul>${itensHtml}</ul>
        <div class="pedido-historico-total">
          <span>Total do pedido</span>
          <strong>${formatarPreco(total)}</strong>
        </div>
      </article>
    `;
  }).join("");
}

function dataHoraBR(v) { return v ? new Date(v).toLocaleString("pt-BR") : "—"; }
function alterarStatusPedido(numero, status) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const pedido = pedidos.find(p => String(p.numero) === String(numero));
  if (!pedido) return;

  pedido.status = status;
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  const ultimo = JSON.parse(localStorage.getItem("ultimoPedido"));
  if (ultimo && String(ultimo.numero) === String(numero)) {
    ultimo.status = status;
    localStorage.setItem("ultimoPedido", JSON.stringify(ultimo));
  }

  registrarAuditoria("STATUS_PEDIDO_ALTERADO", `Pedido ${numero}: ${status}`);
  iniciarAdmin();
}

function iniciarAdmin() {
  if (!exigirPerfil(["admin", "root"])) return;
  const area = document.getElementById("conteudo-painel");
  if (!area) return;

  const todosUsuarios = pegarClientes();
  const clientes = todosUsuarios.filter(c =>
    !usuarioTemPerfil(c, "admin") &&
    !usuarioTemPerfil(c, "root") &&
    !usuarioTemPerfil(c, "fornecedor")
  );

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const emAndamento = pedidos.filter(p =>
    !["concluído", "concluido", "entregue", "cancelado"].includes(
      String(p.status || "Recebido").toLowerCase()
    )
  );

  const carrinhos = JSON.parse(localStorage.getItem("carrinhosAbandonados")) || [];
  const fornecedoresPendentes = todosUsuarios.filter(c =>
    usuarioTemPerfil(c, "fornecedor") && c.fornecedorStatus === "pendente"
  );

  const linhasPedidos = pedidos.slice().reverse().map(p => `
    <tr>
      <td>#${p.numero || "—"}</td>
      <td>${p.cliente || "—"}</td>
      <td>${formatarPreco(Number(p.total || 0))}</td>
      <td>
        <select class="status-pedido-select" onchange="alterarStatusPedido('${p.numero}', this.value)">
          ${["Recebido", "Em preparo", "Saiu para entrega", "Concluído", "Cancelado"].map(s =>
            `<option value="${s}" ${(p.status || "Recebido") === s ? "selected" : ""}>${s}</option>`
          ).join("")}
        </select>
      </td>
    </tr>
  `).join("");

  const linhasClientes = clientes.map(c => `
    <tr><td>${c.nome || "—"}</td><td>${c.email}</td><td>${c.telefone || "—"}</td></tr>
  `).join("");

  const linhasCarrinhos = carrinhos.map(c => `
    <tr>
      <td>${c.cliente || "—"}</td><td>${c.email}</td>
      <td>${(c.itens || []).map(i => {
        const p = buscarProduto(i.id);
        return `${i.qtd} × ${p ? p.nome : "Produto"}`;
      }).join(", ")}</td>
      <td>${dataHoraBR(c.atualizadoEm)}</td>
    </tr>
  `).join("");

  const linhasFornecedores = fornecedoresPendentes.map(f => `
    <tr>
      <td>${f.empresa || f.nome}</td><td>${f.nome}</td><td>${f.email}</td>
      <td>${f.categoria || "—"}</td>
      <td><button class="btn-mini" onclick="aprovarFornecedor('${f.email}')">Aprovar</button></td>
    </tr>
  `).join("");

  area.innerHTML = `
    <div class="painel-resumo">
      <article class="painel-card"><span>Clientes cadastrados</span><strong>${clientes.length}</strong></article>
      <article class="painel-card"><span>Pedidos feitos</span><strong>${pedidos.length}</strong></article>
      <article class="painel-card"><span>Pedidos em andamento</span><strong>${emAndamento.length}</strong></article>
      <article class="painel-card"><span>Carrinhos abandonados</span><strong>${carrinhos.length}</strong></article>
    </div>

    <section class="painel-secao">
      <h3>📦 Pedidos feitos</h3>
      <div class="tabela-responsiva">
        <table><thead><tr><th>Pedido</th><th>Cliente</th><th>Total</th><th>Status (alterar)</th></tr></thead>
        <tbody>${linhasPedidos || '<tr><td colspan="4">Ainda não há pedidos.</td></tr>'}</tbody></table>
      </div>
    </section>

    <section class="painel-secao">
      <h3>👥 Clientes cadastrados</h3>
      <div class="tabela-responsiva">
        <table><thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th></tr></thead>
        <tbody>${linhasClientes || '<tr><td colspan="3">Ainda não há clientes cadastrados.</td></tr>'}</tbody></table>
      </div>
    </section>

    <section class="painel-secao">
      <h3>🛒 Clientes que abandonaram o carrinho</h3>
      <p class="sub">Clientes identificados que adicionaram produtos, mas ainda não finalizaram o pedido.</p>
      <div class="tabela-responsiva">
        <table><thead><tr><th>Cliente</th><th>E-mail</th><th>Itens no carrinho</th><th>Última atividade</th></tr></thead>
        <tbody>${linhasCarrinhos || '<tr><td colspan="4">Nenhum carrinho abandonado identificado.</td></tr>'}</tbody></table>
      </div>
    </section>

    <section class="painel-secao">
      <h3>🏪 Novos fornecedores aguardando aprovação</h3>
      <div class="tabela-responsiva">
        <table><thead><tr><th>Empresa</th><th>Contato</th><th>E-mail</th><th>Categoria</th><th>Ação</th></tr></thead>
        <tbody>${linhasFornecedores || '<tr><td colspan="5">Nenhuma solicitação pendente.</td></tr>'}</tbody></table>
      </div>
    </section>

    <p class="dica">O Admin pode acompanhar pedidos e aprovar fornecedores, mas não pode alterar ou apagar os registros de auditoria e sessões.</p>
  `;
}
function iniciarRoot() {
  if (!exigirPerfil(["root"])) return;
  const area=document.getElementById("conteudo-painel"); if(!area)return;
  const sessoes=JSON.parse(localStorage.getItem("sessoes"))||[]; const auditoria=JSON.parse(localStorage.getItem("auditoria"))||[]; const usuarios=pegarClientes();
  area.innerHTML=`<div class="painel-resumo"><article class="painel-card"><span>Usuários</span><strong>${usuarios.length}</strong></article><article class="painel-card"><span>Sessões</span><strong>${sessoes.length}</strong></article><article class="painel-card"><span>Eventos de auditoria</span><strong>${auditoria.length}</strong></article></div><section class="painel-secao"><h3>Usuários</h3><div class="tabela-responsiva"><table><thead><tr><th>Nome</th><th>E-mail</th><th>Perfis</th></tr></thead><tbody>${usuarios.map(u=>`<tr><td>${u.nome}</td><td>${u.email}</td><td>${(u.perfis||[u.perfil||"cliente"]).join(", ")}</td></tr>`).join("")}</tbody></table></div></section><section class="painel-secao"><h3>Histórico de sessões</h3><div class="tabela-responsiva"><table><thead><tr><th>Usuário</th><th>Login</th><th>Logout</th><th>Duração</th></tr></thead><tbody>${sessoes.slice().reverse().map(s=>{const fim=s.logout?new Date(s.logout).getTime():Date.now();const min=Math.max(0,Math.floor((fim-new Date(s.login).getTime())/60000));return `<tr><td>${s.email}</td><td>${dataHoraBR(s.login)}</td><td>${dataHoraBR(s.logout)}</td><td>${min} min</td></tr>`}).join("")||"<tr><td colspan=4>Nenhuma sessão.</td></tr>"}</tbody></table></div></section><section class="painel-secao"><h3>Auditoria</h3><div class="tabela-responsiva"><table><thead><tr><th>Data/hora</th><th>Usuário</th><th>Ação</th><th>Detalhes</th></tr></thead><tbody>${auditoria.slice().reverse().map(a=>`<tr><td>${dataHoraBR(a.dataHora)}</td><td>${a.usuario}</td><td>${a.acao}</td><td>${a.detalhes}</td></tr>`).join("")||"<tr><td colspan=4>Nenhum evento.</td></tr>"}</tbody></table></div></section><p class="dica">Registros locais de demonstração. A proteção inviolável exige backend e permissões no banco de dados.</p>`;
}
function pegarEstoqueBebidas() {
  const salvo=localStorage.getItem("estoqueBebidas"); if(salvo)return JSON.parse(salvo);
  const inicial=[{produtoId:41,quantidade:4,minimo:10},{produtoId:42,quantidade:15,minimo:10},{produtoId:43,quantidade:7,minimo:15},{produtoId:44,quantidade:2,minimo:15},{produtoId:45,quantidade:12,minimo:10}];
  localStorage.setItem("estoqueBebidas",JSON.stringify(inicial)); return inicial;
}
function iniciarFornecedor() {
  const usuario = pegarClienteLogado();

  if (!usuario) {
    window.location.href = "fornecedor-login.html";
    return;
  }

  if (!usuarioTemPerfil(usuario, "fornecedor")) {
    alert("Esta área é exclusiva de fornecedores.");
    window.location.href = "index.html";
    return;
  }

  if (usuario.fornecedorStatus && usuario.fornecedorStatus !== "aprovado") {
    alert("Seu cadastro ainda aguarda aprovação.");
    localStorage.removeItem("clienteLogado");
    window.location.href = "fornecedor-login.html";
    return;
  }

  const area = document.getElementById("conteudo-fornecedor");
  if (!area) return;

  const categoria = usuario.categoria || "bebida";
  const bebidas = PRODUTOS.filter(p => p.categoria === categoria);
  const estoque = pegarEstoqueBebidas();

  const linhas = bebidas.map(produto => {
    const registro = estoque.find(e => e.produtoId === produto.id) ||
      { quantidade: 0, minimo: 0 };
    const precisa = registro.quantidade <= registro.minimo;
    return `<tr>
      <td>${produto.icone || "📦"} ${produto.nome}</td>
      <td>${registro.quantidade}</td>
      <td>${registro.minimo}</td>
      <td>${Math.max(0, registro.minimo - registro.quantidade)}</td>
      <td><span class="status-estoque ${precisa ? "status-baixo" : "status-ok"}">
        ${precisa ? "Repor" : "Estoque suficiente"}
      </span></td>
    </tr>`;
  }).join("");

  const pendentes = bebidas.filter(p => {
    const registro = estoque.find(e => e.produtoId === p.id);
    return registro && registro.quantidade <= registro.minimo;
  }).length;

  area.innerHTML = `
    <div class="painel-resumo">
      <article class="painel-card"><span>Empresa</span><strong>${usuario.empresa || usuario.nome}</strong></article>
      <article class="painel-card"><span>Produtos na categoria</span><strong>${bebidas.length}</strong></article>
      <article class="painel-card"><span>Itens para reposição</span><strong>${pendentes}</strong></article>
    </div>
    <section class="painel-secao">
      <h3>Lista de reposição</h3>
      <p class="sub">Categoria: ${categoria}</p>
      <div class="tabela-responsiva">
        <table><thead><tr><th>Produto</th><th>Estoque atual</th><th>Mínimo</th><th>Falta</th><th>Situação</th></tr></thead>
        <tbody>${linhas || '<tr><td colspan="5">Não há produtos cadastrados nesta categoria.</td></tr>'}</tbody></table>
      </div>
    </section>
    <p class="dica">Acesso somente de consulta. Alterações de produtos, preços e estoque são feitas pela administração.</p>
  `;
}


if (document.getElementById("cabecalho")) montarCabecalho();

const paginaAtual = document.body.dataset.pagina;
if (paginaAtual === "cardapio") iniciarCardapio();
if (paginaAtual === "carrinho") iniciarCarrinho();
if (paginaAtual === "login" || paginaAtual === "login-fornecedor" || paginaAtual === "login-admin") iniciarLogin();
if (paginaAtual === "cadastro") iniciarCadastro();
if (paginaAtual === "cadastro-fornecedor") iniciarCadastroFornecedor();
if (paginaAtual === "entrega") iniciarEntrega();
if (paginaAtual === "pagamento") iniciarPagamento();
if (paginaAtual === "sucesso") iniciarSucesso();
if (paginaAtual === "perfil") iniciarPerfil();
if (paginaAtual === "painel-admin") iniciarAdmin();
if (paginaAtual === "painel-root") iniciarRoot();
if (paginaAtual === "fornecedor") iniciarFornecedor();

# 🧡 Coxinhas do Bairro

**Lanchonete online - Peça sua coxinha sem sair de casa!**

🌐 **Site no ar:** https://tamiriskarla.github.io/Coxinhas_do_bairro/

> Projeto da ETE Porto Digital - Técnico em Desenvolvimento de Sistemas
> Disciplinas: Programação em Novas Tecnologias / Engenharia de Software
> Professor: Luiz Carlos Jose da Silva
> Aluna: Tamiris Karla - 2026

---

## 🍗 Como funciona

**Cardápio > Carrinho > Entrega > Pagamento > Pedido Confirmado!**

1. Você escolhe no cardápio
2. Monta seu pedido no carrinho
3. Informa o endereço e calcula o frete
4. Paga com cartão (demonstração)
5. Recebe a confirmação com número do pedido!

---

## 📋 Cardápio

### 🍗 Cardápio de coxinhas
| Produto | Descrição | Preço |
| --- | --- | --- |
| Coxinha de Camarão | Camarão cremoso com catupiry | R$ 22,00 |
| Coxinha de Charque | Charque desfiado e bem temperado | R$ 12,50 |
| Coxinha de Frango | Frango desfiado • Massa crocante | R$ 10,50 |
| Coxinha de Queijo | Queijo derretido por dentro | R$ 12,00 |
| Coxinha de Carne de Sol | Carne de sol com queijo coalho | R$ 18,00 |
| Coxinha Vegetariana | Legumes refogados e ervas | R$ 16,50 |

### 🍰 Sobremesas
| Produto | Descrição | Preço |
| --- | --- | --- |
| Coxinha de Morango com Brigadeiro Tradicional | Morango com brigadeiro de chocolate | R$ 10,00 |
| Coxinha de Morango com Brigadeiro de Leite Ninho | Morango com brigadeiro de leite ninho | R$ 10,00 |
| Coxinha de Doce de Leite com Canela | Doce de leite cremoso e canela | R$ 10,00 |
| Pudim de Leite Tradicional | Fatia com calda de caramelo | R$ 12,00 |

### ✨ Turbine seu pedido - Molhos
| Produto | Descrição | Preço |
| --- | --- | --- |
| Molho de Pimenta | Picante artesanal | R$ 1,50 |
| Maionese Temperada | Alho e ervas | R$ 1,50 |

### 🥤 Bebidas
| Produto | Descrição | Preço |
| --- | --- | --- |
| Suco de Laranja 300ml | Natural, feito na hora | R$ 9,00 |
| Suco de Maracujá 300ml | Natural, feito na hora | R$ 9,00 |
| Refrigerante Cola 350ml | Lata gelada | R$ 9,00 |
| Guaraná 350ml | Lata gelada | R$ 9,00 |
| Água Mineral 500ml | Sem gás | R$ 4,00 |

**Total: 17 produtos**

---

## 🛒 Seu carrinho

- Aumente a quantidade com `+`
- Diminua com `-`
- Remova o item clicando na lixeira 🗑️
- O subtotal atualiza sozinho

---

## [STRIPPED 3 bytes] delivery Entrega

Preencha seu endereço:
- Rua / Avenida
- Número
- Bairro
- Complemento (opcional)
- Distância da loja (km)

### Regra do frete
> **A cada 5 km = R$ 5,00**

- 0 a 5 km = 1 faixa = R$ 5,00
- 5,1 a 10 km = 2 faixas = R$ 10,00
- 10,1 a 15 km = 3 faixas = R$ 15,00

**Exemplo:**
> Distância: 3 km
> 1 faixa de 5 km x R$ 5,00 = **R$ 5,00 de frete**

---

## 💳 Pagamento

- Cartão de crédito / débito (demonstração)
- Número do cartão, nome impresso, validade e CVV
- Escolha as parcelas

> ⚠️ **Não digite um cartão de verdade! Pagamento de demonstração.**

---

## ✅ Pedido Confirmado!

Depois de pagar, você vê:

> ✔️ **Pedido confirmado!**
>
> **Pedido nº 2962**
>
> **Entrega:** 30 a 40 minutos
>
> **Endereço:** Rua das Flores, 123 - Boa Viagem

Botão **Fazer outro pedido** volta para o cardápio.

---

## 🗄️ Banco de Dados

Banco **MySQL** com 4 tabelas:

### `clientes`
```sql
id (PK) - nome - email (UNIQUE) - senha (hash)
telefone - rua - numero - bairro - cidade

### `pedidos`
```sql
id (PK) - cliente_id (FK) - data
subtotal - frete - total - km - parcelas
rua - numero - bairro - complemento

### `itens_pedido`
```sql
id (PK) - pedido_id (FK) - produto_id
nome - preco - quantidade

### `fornecedores`
```sql
id (PK) - nome - cnpj (UNIQUE) - telefone - email
rua - numero - bairro - produto_principal - data_cadastro

# 🧡 Coxinhas do Bairro

**Lanchonete online - Peça sua coxinha sem sair de casa!**

🌐 **Site no ar:** https://tamiriskarla.github.io/Coxinhas_do_bairro/

> Projeto da ETE Porto Digital - Técnico em Desenvolvimento de Sistemas
> Disciplinas: Programação em Novas Tecnologias / Engenharia de Software
> Professora: Luiz Carlos Jose da Silva
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

### Coxinhas Salgadas
| Produto | Preço |
| --- | --- |
| Coxinha de Frango | R$ 8,00 |
| Coxinha de Frango com Catupiry | R$ 10,00 |
| Coxinha de Camarão | R$ 15,00 |
| Coxinha de Queijo | R$ 9,00 |
| Coxinha de Carne Seca | R$ 12,00 |
| Coxinha de Costela | R$ 14,00 |
| Coxinha Vegana | R$ 9,00 |

### Sobremesas
| Produto | Preço |
| --- | --- |
| Coxinha de Brigadeiro | R$ 10,00 |
| Coxinha de Doce de Leite | R$ 10,00 |
| Coxinha de Nutella | R$ 12,00 |
| Coxinha de Paçoca | R$ 10,00 |

### Molhos
| Produto | Preço |
| --- | --- |
| Molho de Alho | R$ 3,00 |
| Molho Barbecue | R$ 3,00 |
| Molho de Pimenta | R$ 3,00 |

### Bebidas
| Produto | Preço |
| --- | --- |
| Refrigerante Lata | R$ 6,00 |
| Suco Natural | R$ 7,00 |
| Água Mineral | R$ 4,00 |

**Total: 17 produtos**

---

## 🛒 Seu carrinho

- Aumente a quantidade com `+`
- Diminua com `-`
- Remova o item clicando na lixeira 🗑️
- O subtotal atualiza sozinho

**Exemplo:**
> 6 itens = Subtotal **R$ 67,00**

---

## � delivery Entrega

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

**Exemplo real do site:**
> Distância: 3 km
> 1 faixa de 5 km x R$ 5,00 = **R$ 5,00 de frete**
>
> Subtotal R$ 67,00 + Taxa R$ 5,00 = **Total R$ 72,00**

---

## 💳 Pagamento

- Cartão de crédito / débito (demonstração)
- Número do cartão, nome impresso, validade e CVV
- Escolha as parcelas

> ⚠️ **Não digite um cartão de verdade! Pagamento de demonstração.**

**Exemplo:**
> 1x de **R$ 72,00** sem juros

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
>
> **Total:** R$ 72,00

Botão **Fazer outro pedido** volta para o cardápio.

---

## 🗄️ Banco de Dados

Banco **MySQL** com 4 tabelas:

### `clientes`
```sql
id (PK) - nome - email (UNIQUE) - senha (hash)
telefone - rua - numero - bairro - cidade

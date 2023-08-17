
class CaixaDaLanchonete {
    static cardapio = {
      cafe: { descricao: 'Café', valor: 3.0 },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
      suco: { descricao: 'Suco Natural', valor: 6.2 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 },
    };

    static formasPagamento = ['dinheiro', 'debito', 'credito'];

    static calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasPagamento.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;

        for (const itemInfo of itens) {
            const info = itemInfo.split(',');
            const codigo = info[0];
            const quantidade = parseInt(info[1]);
            const item = this.cardapio[codigo];

            if (!item) {
                return 'Item inválido!';
            }

            valorTotal += item.valor * quantidade;

            const extras = info.slice(2);
            for (const extra of extras) {
                if (!this.cardapio[extra] || !this.cardapio[extra].descricao.includes('extra')) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
                valorTotal += this.cardapio[extra].valor * quantidade;
            }
        }

        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03;
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
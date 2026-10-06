import DespesaSaida from '../components/despesa/DespesaSaida';

function diasAtras(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function DespesasRecentes() {
  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter(despesa => {
      return despesa.data >= seteDiasAtras && despesa.data <= hoje;
    });
  }

  const DUMMY_DESPESAS = [
    { id: '1', descricao: 'Almoço', valor: 35.5, categoria: 'Alimentação', data: diasAtras(1) },
    { id: '2', descricao: 'Uber', valor: 22.9, categoria: 'Transporte', data: diasAtras(3) },
    { id: '3', descricao: 'Cinema', valor: 48, categoria: 'Lazer', data: diasAtras(6) },
    { id: '4', descricao: 'Conta de luz', valor: 100.99, categoria: 'Contas', data: diasAtras(20) },
  ];

  return (
    <DespesaSaida despesas={filtrarUltimos7Dias(DUMMY_DESPESAS)} periodo={'Últimos 7 dias'} />
  );
}

export default DespesasRecentes;
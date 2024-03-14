import Transactions from "../services/Transactions";
import { TransactionsGrouped } from "../types/transactions-grouped";

function setAmount(amount: number) {
  const field = document.querySelector<HTMLElement>("#total span");

  if (!(field instanceof HTMLElement)) return;

  const value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  field.innerHTML = value;
}

function setTransactionsGrouped(
  divSelector: string,
  data: TransactionsGrouped
) {
  const div = document.querySelector(divSelector);

  if (!(div instanceof HTMLElement)) return;

  Object.keys(data).forEach((key) => {
    div.innerHTML += `
      <p>${key}: ${data[key].length}</p>
    `;
  });
}

function setTheBestDay(day: string | undefined) {
  const div = document.querySelector("#dia span");

  if (!(div instanceof HTMLElement) || typeof day != "string") return;

  div.innerHTML = day;
}

export default function statistcs(transactions: Transactions) {
  setAmount(transactions.amount());
  setTransactionsGrouped("div#pagamento", transactions.groupByPaymentMethod());
  setTransactionsGrouped("div#status", transactions.groupedByStatus());
  setTheBestDay(transactions.bestDay());
}

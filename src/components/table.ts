import { Transaction } from "../interfaces/transaction";

export default function dataInTable(data: Array<Transaction>) {
  const tbody = document.querySelector<HTMLElement>("div#app table tbody");

  if (!(tbody instanceof HTMLElement)) return;

  data.forEach((transaction) => {
    tbody.innerHTML += `
      <tr>
        <td>${transaction.name}</td>
        <td>${transaction.email}</td>
        <td>R$ ${transaction.value}</td>
        <td>${transaction.paymentMethod}</td>
        <td>${transaction.status}</td>
      </tr>
    `;
  });
}

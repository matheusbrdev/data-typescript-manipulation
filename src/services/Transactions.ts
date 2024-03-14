import { Transaction } from "../interfaces/transaction";
import { AbleToGrouped } from "../types/group-by-possibilities";
import { TransactionsGrouped } from "../types/transactions-grouped";

export default class Transactions {
  #transactions: Array<Transaction>;

  constructor(data: unknown) {
    this.#transactions = this.#dataToTransactionObjectArray(data);
  }

  #validateData(data: unknown) {
    if (
      !(
        data &&
        typeof data === "object" &&
        "Status" in data &&
        "ID" in data &&
        "Data" in data &&
        "Nome" in data &&
        "Forma de Pagamento" in data &&
        "Email" in data &&
        "Valor (R$)" in data &&
        "Cliente Novo" in data
      )
    ) {
      return false;
    }

    if (
      !(
        typeof data.Status === "string" &&
        typeof data.ID === "number" &&
        typeof data.Data === "string" &&
        typeof data.Nome === "string" &&
        typeof data["Forma de Pagamento"] === "string" &&
        typeof data.Email === "string" &&
        typeof data["Valor (R$)"] === "string" &&
        typeof data["Cliente Novo"] === "number"
      )
    ) {
      return false;
    }

    return true;
  }

  #dataToTransactionObjectArray(data: unknown): Array<Transaction> {
    if (!Array.isArray(data)) throw Error("Dados num formato inesperado");

    return data.map((item) => {
      if (!this.#validateData(item)) {
        throw Error("Dados num formato inesperado.");
      }

      let date = item.Data.split(" ");

      return {
        status: item.Status,
        id: item.ID,
        date: date[0],
        name: item.Nome,
        paymentMethod: item["Forma de Pagamento"],
        email: item.Email,
        value: item["Valor (R$)"],
        newCustomer: item["Cliente Novo"] === 1 ? true : false,
      };
    });
  }

  getTransactions(): Array<Transaction> {
    return this.#transactions;
  }

  amount() {
    const values = this.#transactions
      .map((transaction) =>
        Number(transaction.value.replace(".", "").replace(",", "."))
      )
      .filter((number) => !isNaN(number));

    return values.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }

  #groupBy(key: AbleToGrouped, transactions = this.getTransactions()) {
    return transactions.reduce(
      (accumulator: TransactionsGrouped, currentValue) => {
        const property = currentValue[key];

        if (!(property in accumulator)) {
          accumulator[property] = [];
        }

        accumulator[property].push(currentValue);

        return accumulator;
      },
      {}
    );
  }

  groupByPaymentMethod() {
    return this.#groupBy("paymentMethod");
  }

  groupedByStatus() {
    return this.#groupBy("status");
  }

  bestDay() {
    const paidGroup = this.#groupBy("status")["Paga"];
    const entries = Object.entries(this.#groupBy("date", paidGroup));
    let lengthOfTheMax = 0;
    let dateOfTheBestDay = "";

    entries.forEach((item) => {
      let itemLength = item[1].length;

      if (lengthOfTheMax < itemLength) {
        lengthOfTheMax = itemLength;

        dateOfTheBestDay = item[0];
      }
    });

    if (!dateOfTheBestDay) return;

    const dateInArray: Array<string> = dateOfTheBestDay.split("/");

    return new Date(
      `${dateInArray[2]}-${dateInArray[1]}-${dateInArray[0]} 00:00:00`
    ).toLocaleDateString("pt-BR", {
      weekday: "long",
    });
  }
}

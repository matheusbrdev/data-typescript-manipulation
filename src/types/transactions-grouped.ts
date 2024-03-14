import { Transaction } from "../interfaces/transaction";

export type TransactionsGrouped = { [key: string]: Array<Transaction> };

import statistcs from "./components/statistics";
import dataInTable from "./components/table";
import Transactions from "./services/Transactions";
import getTransactions from "./services/get-transactions";

const transactions = new Transactions(await getTransactions());

dataInTable(transactions.getTransactions());
statistcs(transactions);

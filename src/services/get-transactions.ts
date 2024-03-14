export default async function getTransactions() {
  const data = await fetch("https://api.origamid.dev/json/transacoes.json");

  return await data.json();
}

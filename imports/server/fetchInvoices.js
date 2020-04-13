import axios from "axios";

export async function fetchInvoices() {
  const url = `https://service.runmyaccounts.com/api/latest/clients/webbutler/invoices/?status=OPEN&api_key=${process.env.RMA_API_KEY}`;
  try {
    const result = await axios.get(url);
    return result;
  } catch (err) {
    return err;
  }
}

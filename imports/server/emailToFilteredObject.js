// get the transaction currency
const getTransactionCurrency = (transaction) => {
  const wbEurRegex = /eur/i; // case insensitive string eur
  const wbChfRegex = /chf/i;
  switch (true) {
    case wbChfRegex.test(transaction):
      return "CHF";
    case wbEurRegex.test(transaction):
      return "EUR";
    default:
      return "no currency match";
  }
};

// get transaction
const getTransaction = (emailText) => {
  const transactionRegex = /(\d+\D\d{2})\D{2,}/;
  const transaction = transactionRegex.exec(emailText)[1];
  return transaction;
};

// get transaction date
const getTransactionDate = (emailText) => {
  const transactionDateRegex = /am\D(\d{2}.\d{2}.\d{4})/;
  const transactionDate = transactionDateRegex.exec(emailText)[1];
  return transactionDate;
};

// get new balane total
const getNewBalance = (emailText) => {
  const newBalanceRegex = /[a-z]\D[A-Z]{3}\D(\d+\D\d{2})/;
  const newBalance = newBalanceRegex.exec(emailText);
  if (newBalance !== null) {
    return newBalance[1];
  } else {
    console.error("****************** :(");
    console.error("newBalance doesn't have [1]", newBalance);
    console.error("emailText to above issue: ", emailText);
    return "unable to fetch new balance";
  }
};

export const emailToFilteredObject = (emailText) => {
  const emailTextWithoutApostrophes = emailText.replace(/'/g, "");
  try {
    const emailObject = {
      transactionDate: getTransactionDate(emailTextWithoutApostrophes),
      transactionCurrency: getTransactionCurrency(emailTextWithoutApostrophes),
      transaction: parseFloat(getTransaction(emailTextWithoutApostrophes)),
      newBalance: parseFloat(getNewBalance(emailTextWithoutApostrophes)),
    };
    return emailObject;
  } catch (err) {
    console.error(err);
    console.error("emailObject: " + emailObject);
    return "Error :(";
  }
};

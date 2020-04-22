// get the email text
const getEmailText = (rawEmail) => {
  const emailLinesArray = rawEmail.split("\n");
  const kontoRegex = /Konto/;
  const containsString = (element) => kontoRegex.test(element);
  const emailTextIndex = emailLinesArray.findIndex(containsString);
  const emailTextLine1 = emailLinesArray[emailTextIndex];
  const emailTextLine2 = emailLinesArray[emailTextIndex + 1];
  const rawEmailText = emailTextLine1.concat(emailTextLine2);
  // remove ' and = from strings
  const apostropheEqualRegex = /[=']/g; // global (no return after first match)
  const emailText = rawEmailText.replace(apostropheEqualRegex, "");
  return emailText;
};

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
  const newBalanceRegex = /(\d+\D\d{2})\D$/;
  const newBalance = newBalanceRegex.exec(emailText);
  if (newBalance !== null) {
    console.log("****************** SUCCESS");
    console.log("newBalance", newBalance);
    console.log("emailText to above success: ", emailText);
    return newBalance[1];
  } else {
    console.log("****************** ISSUE");
    console.log("newBalance doesn't have [1]", newBalance);
    console.log("emailText to above issue: ", emailText);
    return "unable to fetch new balance";
  }
};

export const emailToFilteredObject = (email) => {
  const emailText = getEmailText(email);
  try {
    const emailObject = {
      transactionDate: getTransactionDate(emailText),
      transactionCurrency: getTransactionCurrency(emailText),
      transaction: parseFloat(getTransaction(emailText)),
      newBalance: parseFloat(getNewBalance(emailText)),
    };
    return emailObject;
  } catch (err) {
    console.error(err);
    console.error("emailObject: " + emailObject);
  }
};

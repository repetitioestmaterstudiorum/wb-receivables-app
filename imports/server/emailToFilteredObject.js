const email = `Received: by mx0047p1mdw1.sendgrid.net with SMTP id HD87fe89nV Sun, 19 Apr 2020 12:06:22 +0000 (UTC)
Received: from mail-wr1-f54.google.com (mail-wr1-f54.google.com [209.85.221.54]) by mx0047p1mdw1.sendgrid.net (Postfix) with ESMTPS id 4A2D6A865B5 for <invoice@bank-emails.web-butler.ch>; Sun, 19 Apr 2020 12:06:21 +0000 (UTC)
Received: by mail-wr1-f54.google.com with SMTP id f13so8477756wrm.13 for <invoice@bank-emails.web-butler.ch>; Sun, 19 Apr 2020 05:06:21 -0700 (PDT)
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20161025; h=from:content-transfer-encoding:mime-version:subject:message-id:date :to; bh=LfkLnTkv/op74Z/8jvXdA2wdr1iPjP7nAx+r1CrqAys=; b=gJzWFEQPEGplivXl+kAbF6dV5Sg4Sb3R+UC5b1fPS9O+9uEeGHiFsgDcVmp+qIKUFM SFOVhrutxCsnya933yGK/XIBPAvDaPmrOIBqy4f69AsmN0RbKmt7zyqrAma2z9VBfD2H UCmt/HrkfNoewPeEkhxQ7OdtmcW2zexTcpgexFynR/ifJQRx73LFKGmGXK8WaZE+7KLJ x1udiIXhNwM1tjGXv0MJYIqPReTQUadE+hpL8DBCOqM18sKqXbCK5M3otokNCvpDCYBX Y+C6+aIa7hKABXBGR+Y65K4dvUgz6yxeLOFBcvFxAWoW+82ocHF5fixQwgy7eudafL0n iIxA==
X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:from:content-transfer-encoding:mime-version :subject:message-id:date:to; bh=LfkLnTkv/op74Z/8jvXdA2wdr1iPjP7nAx+r1CrqAys=; b=AOo7X1DGy8S2kQHvEIcAbw7Q+EkmZIw/x+Aq52WDL8ax+1PrlnV4kLAwGz9SlvDZC7 6ZQtlgkPVQEmNBMYWPWpj6muoW8jxuha2VAcg7p4ToUUWwh6114uXMMOPFf0JiDuxTL+ mI/1vAt8aCZNu+t6BlgPEY+cPXuPxK0BxCcP1QYUrHvxXTWpXFvtdg/9R0p2p9ru8fEN GNrRgb5c/jG3bTPtzGSlJojth5h4sXlkeKOaw7iGERy1z9t83WqMRy54sESeZFu3WwGV KGXHLPJptkyMTBtiFyIBMU5Vn5e1P3EEv7C0wb5hHB/wPWotGcLQV3bL1FUYO3CQlXY7 U/0w==
X-Gm-Message-State: AGi0PuZjsKmuYSyxzk3rT9NhNagGb3MfFfrXD7aUyD0a9IuXjSc3FJux IzefWmPhvD8Mi2rSzCeSCK2gOoFk
X-Google-Smtp-Source: APiQypJNLngrbg019nn8l/4XKROBdbfg/TSxhAuwcSWPArhRh3WvA8lEmTPlkZsVlcvgf01EdOUoWA==
X-Received: by 2002:adf:f58e:: with SMTP id f14mr12314070wro.79.1587297980093; Sun, 19 Apr 2020 05:06:20 -0700 (PDT)
Received: from t-mac.fritz.box (200116b8462e620030c1a6b33ebca2af.dip.versatel-1u1.de. [2001:16b8:462e:6200:30c1:a6b3:3ebc:a2af]) by smtp.gmail.com with ESMTPSA id q18sm14706610wmj.11.2020.04.19.05.06.19 for <invoice@bank-emails.web-butler.ch> (version=TLS1_2 cipher=ECDHE-ECDSA-AES128-GCM-SHA256 bits=128/128); Sun, 19 Apr 2020 05:06:19 -0700 (PDT)
From: Thomas Tanner <sunyamare@gmail.com>
Content-Type: text/plain; charset=us-ascii
Content-Transfer-Encoding: quoted-printable
Mime-Version: 1.0 (Mac OS X Mail 13.4 \(3608.80.23.2.2\))
Subject: Belastung
Message-Id: <08686B18-5F59-499B-8B87-3ABF57D91CFC@gmail.com>
Date: Sun, 19 Apr 2020 14:06:19 +0200
To: invoice@bank-emails.web-butler.ch
X-Mailer: Apple Mail (2.3608.80.23.2.2)

Konto 'wB-EUR': EUR 5'000.00 am 17.04.2020 belastet - neuer Saldo EUR 5'909=
.01.


`;

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
  const transaction = parseFloat(transactionRegex.exec(emailText)[1]);
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
  const newBalance = parseFloat(newBalanceRegex.exec(emailText)[1]);
  return newBalance;
};

export const emailToFilteredObject = (email) => {
  const emailText = getEmailText(email);
  const emailObject = {
    transactionDate: getTransactionDate(emailText),
    transactionCurrency: getTransactionCurrency(emailText),
    transaction: getTransaction(emailText),
    newBalance: getNewBalance(emailText),
  };
  return emailObject;
};

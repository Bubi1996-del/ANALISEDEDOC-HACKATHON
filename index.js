const fs = require("fs");
const pdfE = require("pdf-parse");

const caminho = "./balancete.pdf";
let BufferDados = fs.readFileSync(caminho);

pdfE(BufferDados).then(function (data) {
  const textoPDF = data.text;

  main(textoPDF);
});

async function CB(texto, CODE) {
  //padrao dos pdf´s
  const regexCODE = /([0-9]{1}\.[0-9]{1}\.[0-9]{1}\s+)([A-Zá-ù\s]+)/gi;
  let match;
  while ((match = regexCODE.exec(texto)) !== null) {
    const Codigo = match[1];
    //verificação de erro para o codigo sem debug
    if (Codigo == null) {
      console.log("Não possui nenhuma valor essa linha");
    } else {
      CODE.push({ Codigo });
    }
  }
}

async function Desc(texto, DC) {
  const regexDesc = /([0-9]{1}[.][0-9]{1}[.][0-9]{1}[ ])([A-Z á-ù]+)/gi;
  let match;
  while ((match = regexDesc.exec(texto)) !== null) {
    const Descricao = match[2];
    if (Descricao == null) {
      console.log("Não possui nenhuma descrição");
    } else {
      DC.push({ Descricao });
    }
  }
}

async function SA(texto, SaldoA) {
  const regexSaldoA =
    /([0-9]{1}[.][0-9]{1}[.][0-9]{1}\s+)([A-Zá-ù\s]+)([0-9]{1}[,][0-9]{1,}[a-z])/gi;
  let match;
  while ((match = regexSaldoA.exec(texto)) !== null) {
    const SaldoAnterior = match[3];
    if (SaldoAnterior == null) {
      console.log("Nenhum valor encontrado ");
    } else {
      SaldoA.push({ SaldoAnterior });
    }
  }
}

async function DBT(texto, Debito) {
  // Débito com 4 casas decimais 1.111.111,11
  const regexDEBT =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1}\s+)([A-Zá-ù\s]+)([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})?([0-9]{1},[0-9]{1,}[a-z])\s+([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})/gi;

  let match;
  while ((match = regexDEBT.exec(texto)) !== null) {
    const DEBITO = match[5];
    if (DEBITO == null) {
      console.log("Nenhum valor encontrado em debito em debito 0: ");
    } else {
      Debito.push({ DEBITO });
    }
  }
  //DEBITO COM 3 CASAS DECIMAIS 1.111,11
  const regexDEBT1 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1}\s+)([A-Zá-ù\s]+)([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})?([0-9]{1},[0-9]{1,}[a-z])\s+([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})?([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})/gi;
  while ((match = regexDEBT1.exec(texto)) !== null) {
    const DEBITO1 = match[6];
    if (DEBITO1 == null) {
      console.log("Nenhum valor encotrado em debito 1: ");
    } else {
      Debito.push({ DEBITO1 });
    }
  }

  const regexDEBT2 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[,][0-9]{1,})\s+/gi;
  while ((match = regexDEBT2.exec(texto)) !== null) {
    const DEBITO2 = match[4];
    Debito.push({ DEBITO2 });
  }
}

async function CDT(texto, CREDITO) {
  const regexCDT =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+?([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})?/gi;
  while ((match = regexCDT.exec(texto)) !== null) {
    const CREDIT = match[5];
    if (CREDIT == null) {
      console.log("gay do krai");
    } else {
      CREDITO.push({ CREDIT });
    }
  }

  const regexCDT1 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})/gi;
  while ((match = regexCDT1.exec(texto)) !== null) {
    const CREDIT1 = match[5];
    if (CREDIT1 == null) {
      console.log("gay do krai");
    } else {
      CREDITO.push({ CREDIT1 });
    }
  }
  const regexCDT2 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})?/gi;
  while ((match = regexCDT2.exec(texto)) !== null) {
    const CREDIT2 = match[5];
    CREDITO.push({ CREDIT2 });
  }
  const regexCDT3 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})?/gi;
  while ((match = regexCDT3.exec(texto)) !== null) {
    const CREDIT3 = match[5];
    CREDITO.push({ CREDIT3 });
  }
}
async function STT(texto, SaldoAtual) {
  const regexSTT1 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+?([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})?([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})?/gi;
  while ((match = regexSTT1.exec(texto)) !== null) {
    const SALDOATUAL = match[7];
    SaldoAtual.push({ SALDOATUAL });
  }
  const regexSTT2 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})/gi;
  while ((match = regexSTT2.exec(texto)) !== null) {
    const SALDOATUAL2 = match[6];
    SaldoAtual.push({ SALDOATUAL2 });
  }
  const regexSTT3 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})/gi;
  while ((match = regexSTT3.exec(texto)) !== null) {
    const SALDOATUAL3 = match[6];
    SaldoAtual.push({ SALDOATUAL3 });
  }
  const regexSTT4 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[,][0-9]{1,})/gi;
  while ((match = regexSTT4.exec(texto)) !== null) {
    const SALDOATUAL4 = match[6];
    SaldoAtual.push({ SALDOATUAL4 });
  }
  const regexSTT5 =
    /([0-9]{1}\.[0-9]{1}\.[0-9]{1})\s+([A-ZÁ-Ù\s]+)\s+([0-9]{1},[0-9]{1,}[A-Z])\s+([0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})\s+([0-9]{1,}[.][0-9]{1,}[,][0-9]{1,})/gi;
  while ((match = regexSTT5.exec(texto)) !== null) {
    const SALDOATUAL5 = match[6];
    SaldoAtual.push({ SALDOATUAL5 });
  }
}
async function main(textoPDF) {
  const CODE = [];
  const DC = [];
  const SaldoA = [];
  const Debito = [];
  const CREDITO = [];
  const SaldoAtual = [];

  await CB(textoPDF, CODE);
  await Desc(textoPDF, DC);
  await SA(textoPDF, SaldoA);
  await DBT(textoPDF, Debito);
  await CDT(textoPDF, CREDITO);
  await STT(textoPDF, SaldoAtual);

  console.log("-----------BALANCETE--------------");
  CODE.forEach((data) => console.log(data));
  DC.forEach((data) => console.log(data));
  SaldoA.forEach((data) => console.log(data));
  Debito.forEach((data) => console.log(data));
  CREDITO.forEach((data) => console.log(data));
  SaldoAtual.forEach((data) => console.log(data));
  console.log("----------FIM DO BALANCETE--------");
  console.log([CODE, DC, SaldoA, Debito, CREDITO, SaldoAtual]);
}

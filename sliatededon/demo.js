const fs = require("fs");
let encrypter = require("../srepleh/noitpyrcne");

module.exports = {
    dbConnection: encrypter.decrypt(
        "d70b4df1343fe008912dde8702e2d1d51b799f757a7da2c08d640e1cf93b3f72790812797888352aa39d2897a606c3e30dfa10bb7f7afbdb4ae2a3cead5cd759d09beacd2b7dc1b42157618218af024dc51279ac1202829e3a4b1d"
    ),
    //port: encrypter.decrypt("88541ba1"),
    port:23782,
    serverType: "https",
    serverOptions: {
        key: fs.readFileSync("osiztech.key"),
        cert: fs.readFileSync("osiztech.crt"),
    },
    dbPrefix: encrypter.decrypt('d9157c'),
    cryptoKey: encrypter.decrypt('991664de353df142fc76e4882de388f50d7c95546a629cdbbe5645'),
    cryptoIv: encrypter.decrypt('991664de353df142fc76e4882de388f50d7c97476359a3dd9a23'),
    jwtTokenAdmin: encrypter.decrypt('ef366dd1180eb2708f47d4ff0cb3ed85'),
    awsOptions: {
        secretAccessKey: encrypter.decrypt("c00745a71302b45cd365a5a472e4d2853d5dbd5247238096ba69251ed6103072510c0b6b518e003d"),
        accessKeyId: encrypter.decrypt("fb2f6ad76f0ec66beb58a19714cd8ee43a51bd50"),
        Bucket: encrypter.decrypt("c9570ef53437ee53cc73e3a830f494dc0d6d90")
    }
};

var crypto = require('crypto');

const encrypt = (plainText, keyBase64) =>{

    const textBuffer = Buffer.from(plainText);
    const key = Buffer.from(keyBase64, 'base64');
    var iv = Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    var encoded = Buffer.concat([iv,textBuffer]);
    const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
    let encrypted = cipher.update(encoded, 'binary', 'base64')
    encrypted += cipher.final('base64');
    return encrypted;
};

const decrypt =  (messagebase64, keyBase64) =>{

    const key = Buffer.from(keyBase64, 'base64');
    const encoded = Buffer.from(messagebase64, 'base64');
    var iv = encoded.slice(0, 16);
    var decoded = encoded.slice(16,encoded.length);
    const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
    let decrypted = decipher.update(decoded, 'binary','utf-8');
    decrypted += decipher.final();
    return decrypted;
}



const str = "<Request xmlns=\"http://www.kotak.com/schemas/CorpCCPaymentsOTP/CorpCCPaymentsOTP.xsd\" ><username>ENKASH</username><password>Corp@123</password><SrcAppCd>ENKA SH</SrcAppCd><RefNo>Ref1111111111</RefNo><CardNo>4280933990002698</CardNo ><OTP>12345</OTP></Request>";

const key = "e3a74e3c7599f3ab4601d587bd2cc768";

console.log("input:   "+str);
const hash = encrypt(str,key);
console.log("encrypted:::   " + hash);
const text = decrypt(hash,key);
console.log("output:   "+text); 
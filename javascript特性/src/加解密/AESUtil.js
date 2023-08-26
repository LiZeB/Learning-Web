var crypto = require('crypto');
const AESUtil = {
    key: "e3a74e3c7599f3ab4601d587bd2cc768",
    iv: "1234567890123456",

    getAlgorithm: function() {
        switch (this.key.length) {
            case 16:
                return 'aes-128-cbc';
            case 24:
                return 'aes-192-cbc';                                 
            case 32:
                return 'aes-256-cbc';
        }
        throw new Error('Invalid key length: ' + this.key.length);
    },

    encrypt: function(plainText) {
        const textBuffer = Buffer.from(plainText);
        const key = Buffer.from(this.key);
        const iv = Buffer.from(this.iv);
        const cipher = crypto.createCipheriv(this.getAlgorithm(), key, iv);
        let encrypted = cipher.update(textBuffer, 'binary', 'base64')
        encrypted += cipher.final('base64');
        return encrypted;
    },

    decrypt: function(message){
        const keyBytes = Buffer.from(this.key);
        const ivBytes  = Buffer.from(this.iv);
        const decipher = crypto.createDecipheriv(this.getAlgorithm(this.key), keyBytes, ivBytes.slice(0, 16));
        let decrypted  = decipher.update(message, 'base64');
        decrypted += decipher.final();
        return decrypted;
    }
}

const str = "Media@123456";
console.log("input:   "+str);
const hash = AESUtil.encrypt(str);
console.log("encrypted:::   " + hash);
const text = AESUtil.decrypt(hash);
console.log("output:   "+text); 

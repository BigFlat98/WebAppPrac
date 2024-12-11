require('dotenv').config();

const crypto = require('crypto');
const salt = process.env.SALT;
const howManyTimes = process.env.HOW_MANY_TIMES;
const pwLength = process.env.PW_LENGTH;
const hashFunction = process.env.HASH_FUNCTION;
console.log(salt,pwLength,hashFunction,howManyTimes);
const encryption = (password) =>{
    crypto.pbkdf2(password,salt, howManyTimes, pwLength, hashFunction, (err, derivedKey)=>{ //첫번째 파라미터는 비밀번호, 두번째 salt값, 세번째 반복횟수, 네번째 키 길이, 다섯번째 해시 함수, 여섯번째 콜백 함수
        if (err) throw err;
        console.log(derivedKey.toString('hex'));//pbkdf2 함수 성공시 derivedKey에 결과 저장.
    });
}



module.exports = encryption;
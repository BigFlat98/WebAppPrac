const path = require('path');
const envPath = path.join(__dirname, '../../.env');
console.log('현재 디렉토리:', __dirname);
console.log('찾고있는 .env 경로:', envPath);

try {
    require('dotenv').config({ path: envPath });
    console.log('.env 파일 로드 시도 완료');
    
    if (!process.env.SALT) {
        console.log('.env 파일을 찾을 수 없거나 내용이 비어있습니다.');
    }
} catch (error) {
    console.error('.env 파일 로드 중 에러 발생:', error);
}

console.log('SALT:', process.env.SALT);
console.log('HOW_MANY_TIMES:', process.env.HOW_MANY_TIMES);
console.log('PW_LENGTH:', process.env.PW_LENGTH);
console.log('HASH_FUNCTION:', process.env.HASH_FUNCTION);

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
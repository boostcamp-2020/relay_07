### 프로필 이미지 변환 : 썸네일

## Object Storage

버킷을 생성하고 이미지 파일을 저장한다. https://docs.ncloud.com/ko/storage/storage-6-1.html

## imageOptimize

Object Storage의 버킷에 있는 이지미를 썸네일로 변환해준다.(썸네일 url을 받을 수 있다.) https://www.ncloud.com/product/media/imageOptimizer

[![1](https://user-images.githubusercontent.com/45379812/90231355-00313500-de56-11ea-935f-418d77e27447.png)](https://user-images.githubusercontent.com/45379812/90231355-00313500-de56-11ea-935f-418d77e27447.png)

## api 인증키 설정

https://www.ncloud.com/mypage/manage/authkey

[![api인증키](https://user-images.githubusercontent.com/45379812/90231358-01626200-de56-11ea-8e80-8fce584359f3.png)](https://user-images.githubusercontent.com/45379812/90231358-01626200-de56-11ea-8e80-8fce584359f3.png)

## JavaScript로 접근하기 예제

https://docs.ncloud.com/ko/storage/storage-8-4.html

- aws-sdk npm install 및 npm install --save multer

```
npm install --save aws-sdk@2.348.0
npm install --save multer
//영상처리
const AWS = require('aws-sdk');
const fs = require('fs');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const access_key = 'OxzLSiVMnc7XeLWIaPNl'; //본인의 api 액세스 키
const secret_key = '0PjANFs41zpT4NPASu6O75JxhF95i2FXiJCQqq8J'; //본인의 api 시크릿 키

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
      accessKeyId : access_key,
      secretAccessKey: secret_key
  }
});

//imageOptimize을 이용하여 사람을 인식한 뒤 편집 진행
exports.addImage = async (req, res, next) => {
    let url = './uploads/'+req.file.filename;

    const bucket_name = 'relayest';
    const local_file_path = url;


    let object_name = Date.now()  + '.png';
    let saveurl = 'http://heovyegsmorj4951114.cdn.ntruss.com/'+object_name+'?type=f&w=100&h=200&autorotate=false&faceopt=true&ttype=png&anilimit=1';
    console.log(saveurl);
    (async () => {

    // create folder
    await S3.putObject({
        Bucket: bucket_name,
        Key: object_name
    }).promise();

    // upload file
    await S3.putObject({
        Bucket: bucket_name,
        Key: object_name,
        ACL: 'public-read',
        // ACL을 지우면 전체공개가 되지 않습니다.
        Body: fs.createReadStream(local_file_path)
    }).promise();

    })();
};
```
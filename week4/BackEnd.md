# 백엔드

------

# 목표

------

- User 데이터베이스에 썸네일 파일을 저장하는 속성 추가
- 메인페이지에 썸네일 파일을 불러오도록 수정
- 프로필 수정 기능 추가
- 썸네일 URL을 읽어오는 기능 추가

------

- 참여자
  - J128_윤석주 : 팀장, 썸네일 관련 코드 작성
  - J113_양아림 : 프로필 수정 코드 작성
  - J005_강석민 : 영상 녹화, 백엔드 MD 작성

> Visual Studio Code Live Share 을 이용해 진행하였습니다.

# 변경사항

------

1. 프로필 사진을 조작할 수 있다.
   1. 원하는 썸네일의 크기를 입력받는다. (or 사이즈를 입력받지 않고 여러 옵션중에 하나를 선택하는 방식??) → 사이즈를 따로 입력받지 않습니다.
   2. api에 입력받은 scale과 사진을 전달한다. → 사진은 네이버클라우드에 저장이 되고, 해당 사진의 URL을 반환받습니다.
2. 사용자가 선택한 썸네일을 로컬 스토리지에 저장한다. → 네이버 클라우드에 저장하도록 설계하였습니다.

### **세부사항**

1. 회원가입 기능은 구현하지않는다. → 2주차에 구현이 되었습니다.
2. 생성한 유저의 정보는 수정 불가능하다. 단, 썸네일만 수정가능하다. → 유저정보는 이름과 이메일, 썸네일만 변경가능하도록 하였습니다. (학교 변경 불가능)
3. 마이페이지에 해당하는 웹페이지에도 썸네일만 수정 가능하도록 구현한다. → 2번과 같음
4. api는 다음을 권장한다.
   - https://www.ncloud.com/product/media/imageOptimizer
   - https://docs.microsoft.com/ko-kr/azure/cognitive-services/computer-vision/concept-generating-thumbnails

# User DataBase

------

## 전체 코드

```
const Sequelize = require("sequelize");

const {sequelize} = require("../util/database");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    thumbnailURL: {
      type: Sequelize.STRING, // 이미지 URL
      allowNull: true,
    },
    resetToken: Sequelize.STRING,
    resetTokenExpiration: Sequelize.DATE,
  },
);

module.exports = User;
```

------

## 핵심 코드

```
thumbnailURL: {
  type: Sequelize.STRING, // 이미지 URL
  allowNull: true,
},
```

------

- user테이블에 thumbnailURL 정보를 담는 속성을 추가하였습니다.
- 썸네일 이미지 파일은은 네이버클라우드에 저장이 됩니다.
- Type은 String으로 저장되며, 썸네일이 없을 경우가 있기 때문에 NULL이 가능하도록 하였습니다.

# Controllers/User.js

------

### -updateThumbnail

```
exports.updateThumbnail = async (req, res) => {
    let url = './uploads/'+req.file.filename;

    const bucket_name = 'relayest';
    const local_file_path = url;

    let object_name = Date.now()  + '.png';
    let saveurl = 'http://heovyegsmorj4951114.cdn.ntruss.com/'+object_name+'?type=f&w=100&h=200&autorotate=false&faceopt=true&ttype=png&anilimit=1';

    const userId = req.session.user.id;
    const thumbnail = saveurl;
    
    console.log(thumbnail)

    
    try {
        await sequelize.query(`UPDATE users SET thumbnailURL='${thumbnail}' WHERE id=${userId}`);
        console.log("썸네일 변경!");
        
        alert('AI가 작업 중입니다. 혹시 올라가지 않을 시 다시 새로고침 부탁드려요 :\)')
        setTimeout(()=> { 
            res.redirect("/posts");
        },4000)
        // req.session.user.thumbnailURL = thumbnail;
        // req.session.save(err => {
        //     console.log(err);
        // res.redirect("/posts");
    //   });
    } catch (err) {
        console.log(err);
        res.redirect('/posts');
    }

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
    
    
}
```

- 사진을 올릴경우 클라우드로 업로드가 진행됩니다.
- 업로드가 진행되고 난 후 URL을 반환하고, 해당 URL을 데이터베이스에 저장됩니다.
- 클라우드로 업로드 될 때 시간이 걸리므로 settimeout을 사용하였습니다.

# Routes/user.js

------

URL의 위치에 따라 정보를 반환합니다.

## 전체 코드

------

```
const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");
const authMiddleware = require("../middleware/is-auth");

//3주
router.post(
  "/edit-profile",
  upload.single('image'),
  authMiddleware.isLogin,
  userController.updateThumbnail
);

module.exports = router;
```

- 2주차에서 Node.js의 프레임워크인 Express로 진행하여 그대로 사용하였습니다.
- edit-profil URL을 추가하였습니다.

# 이후 구현 사항

------

## **C. 테이블 값 데이터**

게시글을 분석해서 친구 사이를 기록한다. 그래서 친구의 친구이지만 나와는 친구가 아닌 사람을 분석해서 추천을 해준다.

- User 데이터 베이스에 배열 형태로 새로운 속성을 추가합니다. 이후 배열안에 친구ID와 친밀도를 기록합니다.
- 게시글에 댓글을 달거나 대댓글을 달 경우를 분석하여 친밀도를 높이거나 낮춥니다.
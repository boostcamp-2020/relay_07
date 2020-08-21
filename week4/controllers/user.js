const { sequelize } = require("../util/database");
const User = require("../models/user");
const alert = require("alert")

//영상처리
const AWS = require('aws-sdk');
const fs = require('fs');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const access_key = 'API Access Key'; //본인의 api 액세스 키
const secret_key = 'API Secret Key'; //본인의 api 시크릿 키

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
      accessKeyId : access_key,
      secretAccessKey: secret_key
  }
});

exports.getUser = async (req, res, next) => {
    const { userId, name, email, thumbnailURL } = req.body;
    if (userId === null) {
        res.redirect("/");
    } else {
        res.render("/updateUser", { // updateUser를 가입페이지로 변경
            name,
            email,
            thumbnailURL
        });
    }
};

exports.postUpdateUser = async (req, res, next) => {
    const { id, name, email, cur_password, edit_password } = req.body;
    try {
        let user = await User.findByPk(id);
        const isMatch = await bcrypt.compare(cur_password, user.password);
        if (isMatch) {
            const hashedPassword = await bcrypt.hash(cur_password, 12);
            if (edit_password !== undefined) hashedPassword = await bcrypt.hash(edit_password, 12);
            await user.update({
                name: name,
                email: email,
                password: hashedPassword
            });
        } else {
            res.render("mypage/success", {
                success: false
            });
        }
        res.redirect("/posts");
    } catch (err) {
        console.log(err);
        res.redirect("/posts");
    }
};

exports.updateThumbnail = async (req, res) => {
    let url = './uploads/'+req.file.filename;

    const bucket_name = 'relayest';
    const local_file_path = url;


    let object_name = Date.now()  + '.png';
    let naverCloudUrl = 'Naver Cloud CDN' // 네이버 클라우드 버킷 CDN
    let saveurl = naverCloudUrl+object_name+'?type=f&w=100&h=200&autorotate=false&faceopt=true&ttype=png&anilimit=1';

    const userId = req.session.user.id;
    const thumbnail = saveurl;
    
    console.log(thumbnail)

    
    try {
        await sequelize.query(`UPDATE users SET thumbnailURL='${thumbnail}' WHERE id=${userId}`);
        
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

exports.getThumbnail = async (req, res) => {
    const { userId } = req.body;
    try {
        await User.findOne({
            where: {
                id: userId
            }
        }).then(result => {
            return res.json({
                success: true,
                thumbnailURL: result.dataValues.thumbnailURL
            });
        }).catch(err => {
            return res.json({
                success: false,
                message: err
            });
        });
    } catch (e) {
        console.log(e);
        return res.json({ success: false, message: e });
    };
}
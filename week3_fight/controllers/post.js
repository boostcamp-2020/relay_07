const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const FriendScore = require("../models/friendScore");
const axios = require("axios");

const aggressiveEmotion = ["혐오", "분노"];
const positiveEmotion = ["기쁨", "신뢰"];


exports.getPosts = async (req, res, next) => {
  try {
    let page = req.query.page || 0;
    const number_of_posts = 10;
    const { count, rows } = await Post.findAndCountAll({
      include: [{ model: User, attributes: [] }],
      attributes: ["id", "title", "user.name"],
      limit: number_of_posts,
      offset: page * number_of_posts,
      order: [["id", "DESC"]],
      raw: true
    });


    res.render("post/posts", {
      user: req.user,
      pageNumber: page,
      isLogin: req.user,
      posts: rows,
      count,
      topUsers: req.topUsers,
      topSchools: req.topSchools
    });
  } catch (err) {
    console.log(err);
    res.render("404", { isLogin: res.user });
  }
};

exports.getAddPost = (req, res, next) => {
  res.render("post/add-post", {
    user: req.user,
    isLogin: req.user,
    topUsers: req.topUsers,
    topSchools: req.topSchools
  });
};

exports.postAddPost = async (req, res, next) => {
  const { title, content } = req.body;
  const user = req.user;

  try {
    await user.createPost({ title, content });
    const options = {
      method: "get",
      url: "http://api.adams.ai/datamixiApi/omAnalysis",
      params: { key: "6711351156271231323", query: title, type: "1" }
    };
    const {
      data: {
        return_object: { Result: result }
      }
    } = await axios(options);

    for (const [reliable, emotion] of result) {
      if (aggressiveEmotion.includes(emotion) && reliable > 0.5) {
        await user.update({ score: user.score - 3 });
        break;
      }
      if (positiveEmotion.includes(emotion) && reliable > 0.5) {
        await user.update({ score: user.score + 2 });
        break;
      }
    }
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
};

exports.updateThumbnail = async (req, res) => {
  const { userId, newThumbnail } = req.body;
  userId;
  return res.json({ thumbnail: thumbnail });
};
// edit Thumbnail

exports.editThumbnail = async (req, res, next) => {
  const { userId, newThumbnail } = req.body;
  const user = req.user;

  try {
    await user.createPost({ title, content });
    const options = {
      method: "post",
      url: "http://api.adams.ai/updateThumbnail",
      params: { userid: "", thumbnail: "1" }
    };
    const {
      data: {
        return_object: { Result: result }
      }
    } = await axios(options);
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
};

// end edit Thumnnail

exports.getPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId);
    const creator = await User.findByPk(post.userId);
    const comments = await Comment.findAll({where : {post_id : postId}});
    console.log(comments);
    res.render("post/post", {
      post,
      creator,
      user: req.user,
      isLogin: req.user,
      topUsers: req.topUsers,
      topSchools: req.topSchools,
      comments,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
};

exports.postDeletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByPk(postId);

    await post.destroy();

    res.redirect("/posts");
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
};

exports.addCommnet = async(req,res,next)=>{
  const { postId } = req.params;
  const {commentinput } = req.body;
  const name = req.user['dataValues']['name'];
  const friend_id = req.user['dataValues']['id'];
  const post = await Post.findByPk(postId);
  const host_id = post.userId;
  
  // 1. comment table에 insert
  await Comment.create({
    post_id : postId,
    name : name,
    content : commentinput
  })
  
  // 2. friendScore에 존재하는지 확인
  let friendScore;
  friendScore = await FriendScore.findOne({where : {host_id : host_id, friend_id: friend_id}});
  
  if(friendScore) {  //  // 2-1. 존재 - update score++
    await friendScore.update({host_id : host_id, friend_id : friend_id, score : friendScore.score + 1});
    
  } else {  // 2-2. 존재 X - insert score = 1
    await FriendScore.create({
      host_id : host_id,
      friend_id : friend_id,
      score : 1
    })
  }
   res.redirect("/post/postId")
  

}
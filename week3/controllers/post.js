const User = require("../models/user");
const Post = require("../models/post");

const axios= require('axios');

const aggressiveEmotion = ['혐오','분노']
const positiveEmotion   = ['기쁨','신뢰']

exports.getPosts = async (req, res, next) => {
  try {
    let page = req.query.page || 0
    const number_of_posts = 10;
    const {count, rows} = await Post.findAndCountAll({
      include:[{model:User,attributes:[]}],
      attributes:['id','title','user.name'],
      limit:number_of_posts,
      offset:page*number_of_posts,
      order: [["id", "DESC"]],
      raw:true
    })

    res.render("post/posts", {
      user: req.user,
      pageNumber: page,
      isLogin: req.user,
      posts:rows,
      count,
      topUsers: req.topUsers,
      topSchools: req.topSchools,
    });
  } catch (err) {
    console.log(err);
    res.render("404",{isLogin: res.user });
  }
};

exports.getAddPost = (req, res, next) => {
  res.render("post/add-post", {
    user: req.user,
    isLogin: req.user,
    topUsers: req.topUsers,
    topSchools: req.topSchools,
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
      params: { key: "6711351156271231323", query: title, type: "1" },
    };
    const {
      data: {
        return_object: { Result: result },
      },
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

exports.getPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId);
    const creator = await User.findByPk(post.userId);

    res.render("post/post", {
      post,
      creator,
      user: req.user,
      isLogin: req.user,
      topUsers: req.topUsers,
      topSchools: req.topSchools,
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

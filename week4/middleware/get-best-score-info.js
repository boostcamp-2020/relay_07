const User = require("../models/user");
const FriendScore = require("../models/friendScore");
const { sequelize } = require("../util/database");
const School = require("../models/school");

exports.getBestScoreUsers = async (req, res, next) => {
  const topUsers = await User.findAll({
    order: [["score", "DESC"]],
    limit: 3,
  });

  const topSchools = await User.findAll({
    attributes: [
      "schoolId",
      [sequelize.fn("sum", sequelize.col("score")), "totalScore"],
    ],

    group: ["schoolId"],
    order: sequelize.literal("totalScore DESC"),
    limit: 3,
  });

  for (school of topSchools) {
    const eachSchool = await School.findByPk(school.schoolId);
    school.schoolName = eachSchool.name;
    school.schoolType = eachSchool.type;
  }

  const query = `
  SELECT (SELECT name FROM users WHERE id = A.friend_id) friend_name,
          score
  FROM friendScores A
  WHERE A.host_id = :hostId
  ORDER BY score DESC
  LIMIT 3;
  `;

  let topFriends = await sequelize.query(
      query, {
          replacements: { hostId: req.session.user.id },
          type: sequelize.QueryTypes.SELECT,
          raw: true
      }
  );

  req.topUsers = topUsers;
  req.topSchools = topSchools;
  req.topFriends = topFriends;
  next();
};

const User = require("../models/user");
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

  req.topUsers = topUsers;
  req.topSchools = topSchools;
  next();
};

const User = require("./User");
const Post = require("./Post");
const Comment = require('./Comment');

// create associations. linking One user to many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

// creating associations. Linking many post to one user.
Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

// liking users and posts for upvoting 
User.belongsToMany(Post, {
    foreignKey: 'user_id'
  });
  
Post.belongsToMany(User, {
    foreignKey: 'post_id'
  });

  // creating associations 

  Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });
module.exports = { User, Post, Comment };
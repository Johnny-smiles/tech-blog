const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// lining post with user
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// linking post with comment
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// linking comment with user
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comment,
  Post
};


module.exports = { User, Post, Comment };
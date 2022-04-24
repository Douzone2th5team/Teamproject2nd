const Sequelize = require('sequelize');
const Chat = require('./Chat');
const Member = require('./Member');
const Friend = require('./Friend');
const Post = require('./Post');
const Inquiry = require('./Inquiry');
const PostImg = require('./PostImg');
const Reply = require('./Reply');
const Room = require('./Room');
const RoomMem = require('./RoomMem')

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Chat = Chat;
db.Member = Member;
db.Post = Post;
db.Inquiry = Inquiry;
db.PostImg = PostImg;
db.Reply = Reply;
db.Room = Room;
db.RoomMem = RoomMem;
db.Friend = Friend;

Chat.init(sequelize);
Member.init(sequelize);
Inquiry.init(sequelize);
Post.init(sequelize);
PostImg.init(sequelize);
Reply.init(sequelize);
Room.init(sequelize);
RoomMem.init(sequelize);
Friend.init(sequelize);

Chat.associate(db);
Member.associate(db);
Inquiry.associate(db);
Post.associate(db);
PostImg.associate(db);
Reply.associate(db);
Room.associate(db);
RoomMem.associate(db);
Friend.associate(db);


module.exports = db;

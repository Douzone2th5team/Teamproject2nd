const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true
            },
            userPw: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            tel: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            code: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            img: {
                type: Sequelize.STRING(100)
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        }, {
            sequelize,
            timestamps: false,  // createAt, updateAt 자동생성
            underscored: false, // 기본 카멜표기법 true면 카멜표기법 false면 스네이크표기법
            paranoid: false, // deleteAt 자동생성(soft delete)
            modelName: 'Member',
            tableName: 'member',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }

    static associate(db) {
        db.Member.hasMany(db.Post, { foreignKey: 'memberId', sourceKey: 'id' })
        db.Member.hasMany(db.Reply, { foreignKey: 'memberId', sourceKey: 'id' })
        db.Member.hasMany(db.RoomMem, { foreignKey: 'memberId', sourceKey: 'id' })
        db.Member.hasMany(db.Chat, { foreignKey: 'memberId', sourceKey: 'id' })
        db.Member.belongsToMany(db.Member, { as: 'Members', through: 'friend', foreignKey: 'memberId' })
        db.Member.belongsToMany(db.Member, { as: 'Friend', through: 'friend', foreignKey: 'friendId' })
    };
};
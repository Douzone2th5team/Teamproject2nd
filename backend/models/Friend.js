const Sequelize = require('sequelize');

module.exports = class Friend extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
 
        }, {
            sequelize,
            timestamps: false,  // createAt, updateAt 자동생성
            underscored: false, // 기본 카멜표기법 true면 카멜표기법 false면 스네이크표기법
            paranoid: false, // deleteAt 자동생성(soft delete)
            modelName: 'Friend',
            tableName: 'friend',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }

    static associate(db) {
    }
}
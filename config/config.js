module.exports = {
  database: {
    dbName: 'blog_sequelize',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60 * 60
  }
}


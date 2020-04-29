var pass = Sugar306272;


module.exports = {
    mongo: {
        development: {
            connectionString: "mongodb://heroku_gzh2xn82:" + pass + "@ds157276.mlab.com:57276/heroku_gzh2xn82",
        },
        production: {
            connectionString: "mongodb://heroku_gzh2xn82:" + pass + "@ds157276.mlab.com:57276/heroku_gzh2xn82"
        }
    }
};
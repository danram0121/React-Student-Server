var config = {};

config.app = {};
config.server = {};
config.db = {};

// server vars
config.server.port = 5678;

// mongodb+srv://admin:<password>@cluster0.icg3xbj.mongodb.net/?retryWrites=true&w=majority

// MongoDB credentials
config.db.host = "cluster0.icg3xbj.mongodb.net";
config.db.port = 27017;
config.db.user = "admin";
config.db.pass = "KROIKjRZyrGvPNRh";
config.db.name = "studentDB";
config.db.collection = "students";

module.exports = config;

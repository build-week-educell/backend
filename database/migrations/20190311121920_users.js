
exports.up = function(knex) {
    return knex.schema.createTable("users", users => {
      users.increments();
  
      users.string("username", 255).notNullable().unique();
      users.string("name", 255).notNullable();
      users.text("contactInfo", 1500);  
      users.string("password", 255).notNullable();
      users.string("organization", 255).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
  };

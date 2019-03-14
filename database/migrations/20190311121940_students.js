
exports.up = function(knex) {
    return knex.schema.createTable("students", student => {
      student.increments();
  
      student.string("name", 255).notNullable()
      student.integer("grade").notNullable();  
      student.text("background", 1500).notNullable();
      student.string("status", 255).notNullable();
      student.integer("age").notNullable();
      student.boolean("insurance").notNullable();
      student.string("insuranceCardexpires", 255);
      student.boolean("birthCertificate").notNullable();
      student.text("specialNeeds", 1500).notNullable();
      student.string("representative", 255).notNullable();
      student.text("contactInfo", 1500);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("students");
  };

exports.up = function(knex) {
    return knex.schema.createTable("students", student => {
      student.increments();
  
      student
        .string("name", 255)
        .notNullable()
        .unique();
      student.integer("grade").notNullable();  
      student.text("background", 1500).notNullable();
      student.string("statusAtschool", 255).notNullable();
      student.string("age", 255).notNullable();
      student.boolean("insuranceCard");
      student.string("insuranceCardexpires", 255);
      student.string("birthcertificate", 255).notNullable();
      student.string("specialneeds", 255).notNullable();
      student.string("representative", 255).notNullable();
      student.text("contactinfo", 1500);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("students");
  };
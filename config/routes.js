const bcrypt = require("bcryptjs");
const userDb = require("../database/dbConfig.js");


const {authenticate, generateToken } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.post("/api/student",authenticate, student);
  server.get("/api/students",authenticate, students);
  server.get("/api/students/:id",authenticate, studentid);
  server.delete("/api/students/:id",authenticate, studentRemove)
  server.put("/api/students/:id",authenticate, studentUpdate)
};

function register(req, res) {
  // implement user registration
  const { username, name, contactInfo, password, organization } = req.body;
  const hash = bcrypt.hashSync(password, 14);
  const userInfo = {
    username,
    name,
    contactInfo,
    password: hash,
    organization
  };

  userDb("users")
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}

function login(req, res) {
  const { username, password } = req.body;

  userDb("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ you: "shall not pass!!" });
      }
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}

function student(req, res) {
  // implement student registration
  const {
    name,
    grade,
    background,
    status,
    age,
    insurance,
    insuranceExp,
    birthCertificate,
    specialNeeds,
    representative,
    contactInfo
  } = req.body;

  const studentInfo = {
    name,
    grade,
    background,
    status,
    age,
    insurance,
    insuranceExp,
    birthCertificate,
    specialNeeds,
    representative,
    contactInfo
  };
  userDb("students")
    .insert(studentInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}
// get students list
function students(req, res) {
  userDb("students")
    .then(students => {      
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
}

// get student
function studentid(req, res) {
const id =req.params.id
  userDb("students")
  .where({id:id})
  .then(id => {
    res.status(200).json(id);
  })
  .catch(err => res.status(500).json(err));
}


function studentRemove(req,res){
  const id = req.params.id
  userDb('students').where({id:id}).del().then(async () => {
    students = await userDb('students')
    res.status(200).json(students)
  })
}

function studentUpdate(req,res){
  const id  = req.params.id
  const {
    name,
    grade,
    background,
    status,
    age,
    insurance,
    insuranceExp,
    birthCertificate,
    specialNeeds,
    representative,
    contactInfo
  } = req.body;

  const studentInfo = {
    name,
    grade,
    background,
    status,
    age,
    insurance,
    insuranceExp,
    birthCertificate,
    specialNeeds,
    representative,
    contactInfo
  };
  userDb('students').where({id:id}).update(studentInfo).then(async () => {
    students = await userDb('students')
    res.status(200).json(students)
  })
}
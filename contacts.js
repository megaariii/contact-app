const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// Membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const saveContact = (name, email, phone) => {
  const contact = {
    name,
    email,
    phone,
  };
  const file = fs.readFileSync('data/contacts.json', 'utf8');
  const contacts = JSON.parse(file);

  // Duplicate Check
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(
      chalk.red.bold(`The ${chalk.red.inverse.bold('Contact')} is already`)
    );
    return false;
  }

  // Email Validator
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.bold(`Your ${chalk.red.inverse.bold('Email')} is not valid`)
      );
      return false;
    }
  }

  // Phone Check
  if (!validator.isMobilePhone(phone, 'id-ID')) {
    console.log(
      chalk.red.bold(
        `Your ${chalk.red.inverse.bold('Phone Number')} is not valid`
      )
    );
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold('Thank you, the data is confirmed!'));
};

module.exports = { saveContact };

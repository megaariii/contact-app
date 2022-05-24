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

const loadContact = () => {
  const file = fs.readFileSync('data/contacts.json', 'utf8');
  const contacts = JSON.parse(file);
  return contacts;
};

const saveContact = (name, email, phone) => {
  const contact = {
    name,
    email,
    phone,
  };

  const contacts = loadContact();

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

const getContact = () => {
  const contacts = loadContact();
  console.log(chalk.yellow.inverse.bold('Contacts List: '));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phone}`);
  });
};

const getContactByName = (name) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.bold(`${chalk.red.inverse.bold(name)} is undefined`));

    return false;
  }

  console.log(chalk.yellow.inverse.bold(contact.name));
  console.log(contact.phone);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContactByName = (name) => {
  const contacts = loadContact();

  const newContact = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  if (contacts.length === newContact.length) {
    console.log(chalk.red.bold(`${chalk.red.inverse.bold(name)} is undefined`));

    return false;
  }

  fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));

  console.log(chalk.green.inverse.bold('Thank you, the data is deleted'));
};

module.exports = {
  saveContact,
  getContact,
  getContactByName,
  deleteContactByName,
};

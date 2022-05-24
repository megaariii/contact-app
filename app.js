const yargs = require('yargs');
const { saveContact, getContact, getContactByName } = require('./contacts');

yargs
  .command({
    command: 'add',
    describe: 'Add new contact',
    builder: {
      name: {
        describe: 'Full Name',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Email',
        demandOption: false,
        type: 'string',
      },
      phone: {
        describe: 'Phone',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      saveContact(argv.name, argv.email, argv.phone);
    },
  })
  .demandCommand();

// Get Contacts List
yargs.command({
  command: 'list',
  describe: 'Get contacts list',
  handler() {
    getContact();
  },
});

// Get Detailed Contact
yargs.command({
  command: 'detail',
  describe: 'Get detail of a contact',
  builder: {
    name: {
      describe: 'Full Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    getContactByName(argv.name);
  },
});

yargs.parse();

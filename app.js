const yargs = require('yargs');
const { saveContact } = require('./contacts');

yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
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
});

yargs.parse();

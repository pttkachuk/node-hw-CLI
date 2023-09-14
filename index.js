const contacts = require("./contacts");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "getAll":
            const allContacts = await contacts.listContacts();
            console.table(allContacts);
            break;
        case "getById":
            const oneContact = await contacts.getContactById(id);
            console.table(oneContact);
            break;
        case "addContact":
            const newContact = await contacts.addContact({ name, email, phone });
            console.table(newContact);
            break;
        case "removeContact":
            const removedContact = await contacts.removeContact(id);
            console.table(removedContact);
            break;
        default:
            console.log("Unknown action");
    }
};

program
    .option("-a, --action <type>", 'choose action')
    .option("-i, --id <type>", 'user id')
    .option("-n, --name <type>", 'user name')
    .option("-e, --email <type>", 'user email')
    .option("-p, --phone <type>", 'user phone');

program.parse();
const options = program.opts();
console.log(options);
invokeAction(options);

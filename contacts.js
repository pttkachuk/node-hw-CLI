const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

//get all contacts
const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        console.log(error.message);
    }
};

//get contact by ID
const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const result = contacts.find((item) => item.id === contactId);
        return result || null;
    } catch (error) {
        console.log(error.message);
    }
};

//add new contact
const addContact = async ({ name, email, phone }) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await updContacts(contacts);
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

//remove contact
const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(item => item.id === contactId);
        if (index === -1) return null;
        const [result] = contacts.splice(index, 1);
        await updContacts(contacts);
        return result;
    } catch (error) {
        console.log(error.message);
    }
};

const updContacts = async (contacts) => { await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)) };

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};

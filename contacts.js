const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  console.table(contacts);
  return contacts;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const contact = contacts.find(contact => contact.id === contactId);

  if (!contact) {
    console.log(`null`);
    return null;
  }
  console.table(contact);
  return contact;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  const index = contacts.findIndex(
    contact => contact.id === contactId
  );
  if (index === -1) {
    console.log(`null`);
    return null;
  }

  const removedContact = contacts.splice(index, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(`Contact with id ${contactId} removed.`);
  console.log(removedContact);
  return removedContact;
}

const addContact = async (name, email, phone) => {
  const newContact = { name, email, phone };
  const existingData = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(existingData);
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(`Contact ${name} added successfully!`);
  console.log(newContact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

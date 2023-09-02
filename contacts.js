const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact || null;
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
  return removedContact;
}

async function addContact(name, email, phone) {
  const newContact = { name, email, phone };
  const existingData = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(existingData);
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateContact(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    console.log(`null`);
    return null;
  }

  const updatedContact = { id, ...data };
  contacts[index] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

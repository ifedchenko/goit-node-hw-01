const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error);
  }
}

// listContacts();

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contact = contacts.find(
      contact => contact.id === contactId
    );
    if (!contact) {
      console.log(`null`);
      return null;
    }
    console.log(contact);
  } catch (error) {
    console.error("Error reading contacts:", error);
  }
}

// getContactById("AeHIrLTr6JkxGE6SN-0Rw");

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const index = contacts.findIndex(
      contact => contact.id === contactId
    );
    if (index === -1) {
      return null;
    }

    const removedContact = contacts.splice(index, 1)[0];
    // await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`Contact with id ${contactId} removed.`);
    console.log(removedContact);
    return removedContact;
  } catch (error) {
    console.error("Error removing contact:", error);
    return null;
  }
}

// removeContact("AeHIrLTr6JkxGE6SN-0Rw");

const addContact = async (name, email, phone) => {
  const newContact = { name, email, phone };
  try {
    const existingData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(existingData);
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`Contact ${name} added successfully!`);
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

// addContact("John Doe", "john@example.com", "1234567890");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

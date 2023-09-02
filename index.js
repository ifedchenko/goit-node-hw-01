const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

// listContacts();
// getContactById("AeHIrLTr6JkxGE6SN-0Rw");
// removeContact("AeHIrLTr6JkxGE6SN-0Rw");
// addContact("John Doe", "john@example.com", "1234567890");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;
    case "get":
      getContactById(id);
      break;
    case "add":
      addContact(name, email, phone);
      break;
    case "remove":
      removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);

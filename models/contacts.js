import fs from "fs/promises";
import path from "path";
import { nanoid } from 'nanoid'

const contactsPath = path.resolve("models", "contacts.json");

// TODO: задокументувати кожну функцію
export const getListContacts = async () => {
    // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};
// console.log(getListContacts);

export const getContactById = async (id) => {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await getListContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
};
// console.log(getContactById);

export const removeContact = async (id) => {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await getListContacts();
    const indexContact = contacts.findIndex(item => item.id === id);
    if (indexContact === -1) {
        return null;
    }
    const [result] = contacts.splice(indexContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};

export const addContact = async (name, email, phone) => {
    // ...твій код. Повертає об'єкт доданого контакту.
    const contacts = await getListContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

export const updateContactById = async (id, name, email, phone) => {
    const contacts = await getListContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}
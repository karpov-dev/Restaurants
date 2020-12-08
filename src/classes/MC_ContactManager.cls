public without sharing class MC_ContactManager {
    public static Contact insertContact(Contact contact) {
        if (contact == null) return new Contact();

        try {
            insert contact;
            return contact;
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, e.getMessage());
            return new Contact();
        }
    }

    public static List<Contact> getContactsByEmail(String email) {
        if (String.isBlank(email)) new List<Contact>();

        try {
            return [
                    SELECT Id
                    FROM Contact
                    WHERE Email =:email
            ];
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, e.getMessage());
            return new List<Contact>();
        }
    }

    public static Contact getContactById(Id contactId, List<String> fieldsToReturn) {
        if (String.isBlank(contactId) || fieldsToReturn == null || fieldsToReturn.isEmpty()) {
            throw new MC_Exception('Can not return contact. Contact Id or fields to return is empty');
        }

        List<Contact> contacts = (List<Contact>) Database.query(SC_Utility.getSoqlRequest(contactId, 'Contact', fieldsToReturn));

        if (contacts.isEmpty()) return null;
        return contacts[0];
    }

    public static Contact getContactByEmailAndPassword(String email, String password) {
        if (String.isBlank(email) || String.isBlank(password)) return new Contact();

        try {
            return [
                    SELECT Id
                    FROM Contact
                    WHERE Email =:email
                    AND Password__c = :password
                    LIMIT 1
            ];
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, e.getMessage());
            return new Contact();
        }
    }
}
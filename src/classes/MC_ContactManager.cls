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
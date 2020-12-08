public without sharing class SC_AuthenticationService {
    @AuraEnabled
    public static Id createContact(String jsonData) {
        if (String.isBlank(jsonData)) return '';

        RegistrationWrapper contactWrapper = (RegistrationWrapper) SC_Utility.deserialize(jsonData, RegistrationWrapper.class);

        Contact contact = new Contact(
                FirstName = contactWrapper.firstName,
                LastName = contactWrapper.lastName,
                Email = contactWrapper.email,
                Username__c = contactWrapper.userName,
                Password__c = contactWrapper.password,
                Phone = contactWrapper.phone
        );
        MC_ContactManager.insertContact(contact);

        return contact.Id;
    }

    @AuraEnabled
    public static Id authorization(String jsonData) {
        if (String.isBlank(jsonData)) return '';

        AuthWrapper contactWrapper = (AuthWrapper) SC_Utility.deserialize(jsonData, AuthWrapper.class);
        Contact userContact = MC_ContactManager.getContactByEmailAndPassword(contactWrapper.email, contactWrapper.password);

        return userContact.Id;
    }

    @AuraEnabled
    public static Boolean emailIsAvailable(String contactEmail) {
        if (String.isBlank(contactEmail)) return false;

        List<Contact> contacts = MC_ContactManager.getContactsByEmail(contactEmail);
        if(contacts.size() > 0) return false;

        return true;
    }

    public class RegistrationWrapper {
        public String firstName;
        public String lastName;
        public String userName;
        public String password;
        public String email;
        public String phone;
    }

    public class AuthWrapper {
        public String email;
        public String password;
    }
}
public without sharing class SC_UserService {
    @AuraEnabled
    public static Contact getUserById(Id userId, List<String> fieldsToRetrieve) {
        if (String.isBlank(userId) || fieldsToRetrieve == null || fieldsToRetrieve.isEmpty()) {
            throw new SC_Exception('Can not find user. User Id or fields to retrieve is empty');
        }

        return MC_ContactManager.getContactById(userId, fieldsToRetrieve);
    }
}
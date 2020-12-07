public without sharing class SC_AttachmentService {
    @AuraEnabled
    public static List<String> getImageIds(Id ownerId) {
        if (String.isBlank(ownerId)) {
            throw new SC_Exception('Owner can not be empty');
        }

        List<String> imageIds = SC_Utility.getIds([SELECT Id FROM Attachment WHERE ParentId = :ownerId]);

        System.debug(LoggingLevel.INFO, 'Images: ' + imageIds);
        return imageIds;
    }
}
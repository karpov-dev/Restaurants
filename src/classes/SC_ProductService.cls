public without sharing class SC_ProductService {
    @AuraEnabled
    public static List<Product2> getProductsByFilters(String JSONData, List<String> fields) {
        return SC_soqlUtility.getObjectsByFilters('Product2', JSONData, fields);
    }

    @AuraEnabled
    public static Product2 getProductById(Id productId, List<String> fieldsToRetrieve) {
        if (String.isBlank(productId) || fieldsToRetrieve == null || fieldsToRetrieve.isEmpty()) {
            throw new SC_Exception('Can not find Product. Product Id or Product to retrieve is empty');
        }

        return MC_ProductManager.getProductById(productId, fieldsToRetrieve);
    }

    @AuraEnabled
    public static Boolean timeToRentIsAvailable(Id productId, Datetime startDateTime, Datetime endDateTime) {
        if (startDateTime == null || endDateTime == null || String.isBlank(productId)) {
            throw new SC_Exception('Start time, end time or product id is empty');
        }

        List<Opportunity> opportunities = MC_OpportunityManager.getOpportunityByTime(productId, startDateTime, endDateTime);

        if (opportunities.isEmpty()) return true;
        return false;
    }
}
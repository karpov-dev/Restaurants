public without sharing class SC_RestaurantsService {
    @AuraEnabled
    public static List<Restaurant__c> getRestaurantsByFilters(String JSONData, List<String> fields) {
        return SC_soqlUtility.getObjectsByFilters('Restaurant__c', JSONData, fields);
    }

    @AuraEnabled
    public static Restaurant__c getRestaurantById(Id restaurantId, List<String> fields) {
        if (fields == null || fields.isEmpty()) {
            throw new SC_Exception('Fields == null or empty' + fields);
        }

        return MC_RestaurantManager.getRestaurantById(restaurantId, fields);
    }
}
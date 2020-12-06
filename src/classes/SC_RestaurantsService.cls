public without sharing class SC_RestaurantsService {
    @AuraEnabled
    public static List<Restaurant__c> getRestaurantsByFilters(String JSONData, List<String> fields) {
        if (String.isBlank(JSONData)) return new List<Restaurant__c>();

        List<QS_QueryFilter> filters = (List<QS_QueryFilter>) SC_Utility.deserialize(JSONData, List<QS_QueryFilter>.class);
        System.debug(LoggingLevel.INFO, 'Filters: ' + filters);

        QS_QuerySearcher searcher = new QS_QuerySearcher('Restaurant__c', fields, filters);
        searcher.generateSOQLString();

        List<Restaurant__c> restaurants = (List<Restaurant__c>) searcher.getRecords(searcher.soqlRequest);
        System.debug(LoggingLevel.INFO, 'Amount returned restaurants: ' + restaurants.size());

        return restaurants;
    }

    @AuraEnabled
    public static Restaurant__c getRestaurantById(Id restaurantId, List<String> fields) {
        if (fields == null || fields.isEmpty()) {
            throw new SC_Exception('Fields == null or empty' + fields);
        }

        return MC_RestaurantManager.getRestaurantById(restaurantId, fields);
    }
}
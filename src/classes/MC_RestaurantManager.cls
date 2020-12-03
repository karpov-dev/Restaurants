public without sharing class MC_RestaurantManager {
    public static Restaurant__c getRestaurantById(Id restaurantId, List<String> fieldsToReturn) {
        if (String.isBlank(restaurantId) || fieldsToReturn == null || fieldsToReturn.isEmpty()) {
            throw new MC_Exception('Restaurant ID or fields list is empty: ' + restaurantId + ' : ' + fieldsToReturn);
        }

        String soqlRequest = 'SELECT ' + String.join(fieldsToReturn, ',') + ' ' +
                             'FROM Restaurant__c ' +
                             'WHERE Id = ' + '\'' + restaurantId + '\'';
        List<Restaurant__c> result = (List<Restaurant__c>) Database.query(soqlRequest);

        if (!result.isEmpty()) {
            return result[0];
        }
        else {
            return null;
        }
    }
}
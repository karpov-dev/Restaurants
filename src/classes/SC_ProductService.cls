public without sharing class SC_ProductService {
    @AuraEnabled
    public static List<Product2> getProductsByFilters(String JSONData, List<String> fields) {
        return SC_soqlUtility.getObjectsByFilters('Product2', JSONData, fields);
    }
}
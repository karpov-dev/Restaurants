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
}
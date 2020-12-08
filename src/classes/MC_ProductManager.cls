public without sharing class MC_ProductManager {
    public static Product2 getProductById(Id productId, List<String> fieldsToReturn) {
        if (String.isBlank(productId) || fieldsToReturn == null || fieldsToReturn.isEmpty()) {
            throw new MC_Exception('Can not return product. Product Id or fields to return is empty');
        }

        List<Product2> products = (List<Product2>) Database.query(SC_Utility.getSoqlRequest(productId, 'Product2', fieldsToReturn));

        if (products.isEmpty()) return null;
        return products[0];
    }
}
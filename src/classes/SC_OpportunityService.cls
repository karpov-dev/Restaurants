public without sharing class SC_OpportunityService {
    @AuraEnabled
    public static List<Opportunity> getOpportunitiesByFilters(String JSONFilters, List<String> fieldsToRetrieve) {
        return SC_soqlUtility.getObjectsByFilters('Opportunity', JSONFilters, fieldsToRetrieve);
    }

    @AuraEnabled
    public static Opportunity createOrder(Opportunity opportunity) {
        insert opportunity;

        return opportunity;
    }
}
public without sharing class SC_OpportunityService {
    @AuraEnabled
    public static List<Opportunity> getOpportunitiesByFilters(String JSONFilters, List<String> fieldsToRetrieve) {
        return SC_soqlUtility.getObjectsByFilters('Opportunity', JSONFilters, fieldsToRetrieve);
    }

    @AuraEnabled
    public static Opportunity createOrder(Opportunity opportunity) {
        if (opportunity == null) {
            throw new SC_Exception('Can not create order. Order is null');
        }

        insert opportunity;
        return opportunity;
    }

    @AuraEnabled
    public static void changeStageOrder(String orderId, String stage) {
        if (String.isBlank(orderId) || String.isBlank(stage)) {
            throw new SC_Exception('Can not delete order. Order Id or stage is empty');
        }

        Opportunity opp = new Opportunity(Id = orderId);
        switch on stage {
            when 'Open Rent' {
                opp.StageName = 'Closed Lost';
                update opp;
            }
            when 'Closed Lost' {
                delete opp;
            }
            when 'Closed Won' {
                delete opp;
            }
        }
    }
}
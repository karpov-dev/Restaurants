public without sharing class MC_OpportunityManager {
    public static List<Opportunity> getOpportunityByTime(Id productId, Datetime startDate, Datetime endDate) {
        if (startDate == null || endDate == null || String.isBlank(productId)) {
            throw new MC_Exception('Start date or endDate is empty');
        }

        List<Opportunity> opportunities = [
                SELECT Id
                FROM Opportunity
                WHERE ((Start_Rent__c <= :startDate AND End_Rent__c >= :startDate)
                OR (Start_Rent__c <= :endDate AND End_Rent__c >= :endDate)
                OR (Start_Rent__c >= :startDate AND End_Rent__c <= :endDate))
                AND Product__c = :productId
                AND StageName = 'Open Rent'
        ];

        return opportunities;
    }
}
public without sharing class SC_soqlUtility {
    public static List<SObject> getObjectsByFilters(String objectName, String JSONData, List<String> fields) {
        if (String.isBlank(objectName)) return new List<SObject>();

        List<QS_QueryFilter> filters = (List<QS_QueryFilter>) SC_Utility.deserialize(JSONData, List<QS_QueryFilter>.class);

        QS_QuerySearcher searcher = new QS_QuerySearcher(objectName, fields, filters);
        searcher.generateSOQLString();

        List<SObject> sObjects = (List<SObject>) searcher.getRecords(searcher.soqlRequest);
        System.debug(LoggingLevel.INFO, 'Amount returned objects: ' + sObjects.size());

        return sObjects;
    }
}
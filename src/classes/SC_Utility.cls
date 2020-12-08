public without sharing class SC_Utility {
    public static Object deserialize(String jsonData, System.Type toClass) {
        if (String.isBlank(jsonData) || toClass == null) return null;

        Object result;
        try {
            result = JSON.deserialize(jsonData, toClass);
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, e.getMessage());
            result = null;
        }

        return result;
    }

    public static List<Id> getIds(List<SObject> objs) {
        if (objs == null || objs.isEmpty()) return new List<Id>();

        List<Id> ids = new List<Id>();
        for (SObject obj : objs) {
            if (obj == null || String.isBlank(obj.Id)) continue;

            ids.add(obj.Id);
        }

        return ids;
    }

    public static String getSoqlRequest(Id objId, String objName, List<String> fieldsToReturn) {
        if (String.isBlank(objId) || fieldsToReturn == null || fieldsToReturn.isEmpty() || String.isBlank(objName)) {
            throw new SC_Exception('Can not return contact. Contact Id or fields to return is empty');
        }

        return 'SELECT ' + String.join(fieldsToReturn, ',') + ' ' +
                'FROM ' + objName + ' ' +
                'WHERE Id = ' + '\'' + objId + '\'';
    }
}
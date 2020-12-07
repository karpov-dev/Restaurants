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
}
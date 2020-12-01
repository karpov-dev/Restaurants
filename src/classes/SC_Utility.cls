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
}
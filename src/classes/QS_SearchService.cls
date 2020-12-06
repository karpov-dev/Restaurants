public class QS_SearchService {
    @AuraEnabled
    public static List<String> getAvailableOperators(String type) {
        if (String.isBlank(type)) {
            throw new QS_QueryException('Empty type');
        }

        return QS_QueryConstants.AVAILABLE_OPERATORS.get(type);
    }
}
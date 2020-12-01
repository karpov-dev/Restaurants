public class QS_QueryFilter {
    public String type {get; private set;}
    public String field {get; private set;}
    public String value {get; private set;}
    public String operator {get; private set;}

    public QS_QueryFilter(String type, String field, String operator, String value) {
        if (String.isBlank(type) || String.isBlank(field)) throw new QS_QueryException('Field type or field name is Empty.');
        if (String.isBlank(operator)) operator = QS_QueryConstants.NONE;

        this.type = type;
        this.field = field;
        this.operator = operator;
        this.value = value;
    }

    public QS_QueryFilter(String type, String field) {
        if (String.isBlank(type) || String.isBlank(field)) throw new QS_QueryException('Field type or field name is Empty.');

        this.type = type;
        this.field = field;
        this.operator = QS_QueryConstants.NONE;
        this.field = '';
    }

    public List<String> availableOperators {
        get {
            return QS_QueryConstants.AVAILABLE_OPERATORS.get(type);
        }
    }
}
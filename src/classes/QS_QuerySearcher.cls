public class QS_QuerySearcher {
    public String objectName { get; private set; }
    public List<String> fields { get; private set; }
    public List<QS_QueryFilter> filters { get; private set; }
    public String soqlRequest { get; private set; }
    public String soqlWithoutLimits { get; private set; }
    public Integer resultSize { get; private set; }

    private QS_QuerySearcher() {
        fields = new List<String>();
        filters = new List<QS_QueryFilter>();
    }

    public QS_QuerySearcher(String objectName) {
        this();

        if (String.isBlank(objectName)) {
            throw new QS_QueryException('Empty query object name');
        }
        this.objectName = objectName;
    }

    public QS_QuerySearcher(String objectName, List<String> fields) {
        this(objectName);
        setFields(fields);
    }

    public QS_QuerySearcher(String objectName, List<String> fields, List<QS_QueryFilter> filters) {
        this(objectName, fields);
        setFilters(filters);
    }

    public Boolean setFields(List<String> fields) {
        if (fields == null || fields.isEmpty()) {
            throw new QS_QueryException('List of fields is empty');
        }
        this.fields.clear();

        for (String field : fields) {
            if (String.isBlank(field)) continue;
            this.fields.add(field);
        }

        return true;
    }

    public Boolean setFilters(List<QS_QueryFilter> filters) {
        if (filters == null) {
            filters = new List<QS_QueryFilter>();
        }
        this.filters.clear();

        for (QS_QueryFilter filter : filters) {
            Boolean isValueBlank = String.isBlank(filter.value);
            Boolean isNoneOperator = filter.operator == QS_QueryConstants.NONE;

            if (isValueBlank || isNoneOperator) continue;
            this.filters.add(filter);
        }

        return true;
    }

    public String generateSOQLString() {
        if (fields.isEmpty()) {
            throw new QS_QueryException('Filters or Fields is empty');
        }

        soqlRequest = QS_QueryConstants.SELECT_SOQL + ' ';
        soqlRequest += String.join(fields, ',') + ' ';
        soqlRequest += QS_QueryConstants.FROM_SOQL + ' ' + objectName + ' ';

        List<QS_QueryFilter> expressions = new List<QS_QueryFilter>();
        Map<String, QS_QueryFilter> specifyElements = new Map<String, QS_QueryFilter>();
        separateFilters(filters, expressions, specifyElements);

        System.debug(specifyElements);

        if (!expressions.isEmpty()) {
            soqlRequest += QS_QueryConstants.WHERE_SOQL + ' ';
        }

        for (QS_QueryFilter filter : expressions) {
            String type = filter.type;
            String operator = filter.operator;
            String value = filter.value;
            String field = filter.field;
            if (type == QS_QueryConstants.STRING_TYPE) {
                if (operator == QS_QueryConstants.CONTAINS || operator == QS_QueryConstants.DOES_NOT_CONTAIN) {
                    value = '%' + value + '%';
                }
                value = '\'' + value + '\'';
                if (operator == QS_QueryConstants.DOES_NOT_CONTAIN) {
                    soqlRequest += QS_QueryConstants.NOT_SOQL + ' ( ' + field + ' ' + QS_QueryConstants.LIKE_SOQL + ' ' + value + ' ) ';
                }
                if (operator == QS_QueryConstants.CONTAINS) {
                    soqlRequest += field + QS_QueryConstants.OPERATORS_SOQL.get(operator) + value + ' ';
                }
                if (operator == QS_QueryConstants.EQUAL) {
                    soqlRequest += field + QS_QueryConstants.OPERATORS_SOQL.get(operator) + ' ' + value + ' ';
                }
            }
            if (type == QS_QueryConstants.DATA_TYPE) {
                soqlRequest += field + QS_QueryConstants.OPERATORS_SOQL.get(operator) + value;
            }
            if (type == QS_QueryConstants.DATE_TYPE) {
                //TODO - add code for date format
            }
            soqlRequest += QS_QueryConstants.AND_SOQL + ' ';
        }

        soqlRequest = soqlRequest.removeEnd(QS_QueryConstants.AND_SOQL + ' ');
        soqlWithoutLimits = soqlRequest;

        if (specifyElements.containsKey(QS_QueryConstants.ORDER_BY)) {
            soqlRequest += ' ' + QS_QueryConstants.ORDER_BY + ' ' + specifyElements.get(QS_QueryConstants.ORDER_BY).value;
            QS_QueryFilter element = specifyElements.get(QS_QueryConstants.ORDER_BY);
            if (!String.isBlank(element.additionalOperator)) {
                soqlRequest += ' ' + element.additionalOperator;
            }
        }
        if (specifyElements.containsKey(QS_QueryConstants.LIMIT_SOQL)) {
            soqlRequest += ' ' + QS_QueryConstants.LIMIT_SOQL + ' ' + specifyElements.get(QS_QueryConstants.LIMIT_SOQL).value;
        }
        if (specifyElements.containsKey(QS_QueryConstants.OFFSET_SOQL)) {
            soqlRequest += ' ' + QS_QueryConstants.OFFSET_SOQL + ' ' + specifyElements.get(QS_QueryConstants.OFFSET_SOQL).value;
        }

        System.debug(soqlRequest);
        return soqlRequest;
    }

    public List<SObject> getRecords(String soql) {
        try {
            return Database.query(soql);
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, e.getMessage());
            return new List<SObject>();
        }
    }

    private void separateFilters(List<QS_QueryFilter> filters, List<QS_QueryFilter> expressions, Map<String, QS_QueryFilter> specifyElements) {
        for (QS_QueryFilter filter : filters) {
            if (QS_QueryConstants.ALL_OPERATORS_SOQL.contains(filter.operator)) {
                expressions.add(filter);
            } else {
                specifyElements.put(filter.operator, filter);
            }
        }
    }

    private Integer soqlResultSize(String soql) {
        try {
            return Database.query(soql).size();
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, e.getMessage());
            return 0;
        }
    }
}
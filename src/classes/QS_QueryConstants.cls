public with sharing class QS_QueryConstants {
    //SOQL searcher work modes
    public static final String STRING_TYPE = 'string';
    public static final String DATA_TYPE = 'data';
    public static final String DATE_TYPE = 'date';

    //SOQL elements
    public static final String SELECT_SOQL = 'SELECT';
    public static final String FROM_SOQL = 'FROM';
    public static final String WHERE_SOQL = 'WHERE';
    public static final String LIMIT_SOQL = 'LIMIT';
    public static final String OFFSET_SOQL = 'OFFSET';
    public static final String ORDER_BY = 'ORDER BY';
    public static final String AND_SOQL = 'AND';
    public static final String NOT_SOQL = 'NOT';
    public static final String LIKE_SOQL = 'LIKE';

    //SOQL operators
    public static final String NONE = 'none';
    public static final String EQUAL = 'equal';
    public static final String NOT_EQUAL_TO = 'not equal to';
    public static final String CONTAINS = 'contains';
    public static final String DOES_NOT_CONTAIN = 'does not contain';
    public static final String LESS_THAN = 'less than';
    public static final String GREATER_THAN = 'greater than';
    public static final String LESS_OR_EQUAL = 'less or equal';
    public static final String GREATER_OR_EQUAL = 'greater or equal';
    public static final String EXIST = 'exist';
    public static final String NOT_EXIST = 'not exist';

    //settings to search
    public static final Map<String, String> OPERATORS_SOQL = new Map<String, String>{
            EQUAL => ' = ',
            NOT_EQUAL_TO => ' != ',
            CONTAINS => ' LIKE ',
            LESS_THAN => ' < ',
            GREATER_THAN => ' > ',
            LESS_OR_EQUAL => ' <= ',
            GREATER_OR_EQUAL => ' >= ',
            EXIST => ' IN ',
            NOT_EXIST => ' NOT IN '
    };

    public static final List<String> ALL_OPERATORS_SOQL = new List<String>{
            NONE, EQUAL, NOT_EQUAL_TO, CONTAINS, DOES_NOT_CONTAIN, LESS_THAN,
            GREATER_THAN, LESS_OR_EQUAL, GREATER_OR_EQUAL, EXIST, NOT_EXIST
    };

    public static final Map<String, List<String>> AVAILABLE_OPERATORS = new Map<String, List<String>>{
            STRING_TYPE => new List<String>{
                    NONE, EQUAL, NOT_EQUAL_TO, CONTAINS
            },
            DATA_TYPE => new List<String>{
                    NONE, EQUAL, NOT_EQUAL_TO, LESS_THAN,
                    GREATER_THAN, LESS_OR_EQUAL, GREATER_OR_EQUAL
            },
            DATE_TYPE => new List<String>{
                    NONE, EQUAL, NOT_EQUAL_TO, LESS_THAN,
                    GREATER_THAN, LESS_OR_EQUAL, GREATER_OR_EQUAL
            }
    };
}
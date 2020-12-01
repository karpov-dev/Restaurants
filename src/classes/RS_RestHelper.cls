public with sharing class RS_RestHelper {
    private static final String SYMBOL_CODDING = 'UTF-8';
    private static final String CONTENT_TYPE = 'application/json';
    private static final Integer REQUEST_TIMEOUT = 12000;

    public enum HttpHeader {
        CONTENT_TYPE, AUTHORIZATION
    }

    public enum HttpMethod {
        HTTP_GET, HTTP_HEAD, HTTP_POST, HTTP_PUT, HTTP_DELETE,
        HTTP_CONNECT, HTTP_OPTIONS, HTTP_TRACE, HTTP_PATCH
    }

    public static String buildUrl(String endPoint, String entity, String options) {
        if (options == null) options = '';
        if (String.isBlank(endPoint) || String.isBlank(entity)) {
            throw new RS_RestException('End Point or Entity is blank');
        }

        return endPoint + entity + options;
    }

    public static String buildOptions(Map<String, String> options) {
        if (options == null || options.isEmpty()) {
            System.debug('Options is empty');
            return '';
        }

        String optionsString = '';

        for (String key : options.keySet()) {
            String value = options.get(key);
            if (String.isBlank(value) || String.isBlank(key)) {
                throw new RS_RestException('Key or value is empty');
            }

            optionsString += key + '=' + EncodingUtil.urlEncode(value, SYMBOL_CODDING) + '&';
        }
        optionsString = '?' + optionsString.removeEnd('&');

        return optionsString;
    }

    public static HttpRequest buildRequest(String endPoint, HttpMethod method, String body) {
        HttpRequest request = buildRequest(endPoint, method);
        request.setBody(body);

        return request;
    }

    public static HttpRequest buildRequest(String endPoint, HttpMethod method) {
        if (String.isBlank(endPoint) || method == null) {
            throw new RS_RestException('End Point or Http Method is null');
        }

        HttpRequest request = new HttpRequest();
        request.setTimeout(REQUEST_TIMEOUT);
        request.setEndpoint(endPoint);
        request.setMethod(getMethodByEnum(method));
        request.setHeader(getHeaderByEnum(HttpHeader.CONTENT_TYPE), CONTENT_TYPE);

        return request;
    }

    public static String getMethodByEnum(HttpMethod method) {
        switch on method {
            when HTTP_GET { return 'GET';}
            when HTTP_PUT { return 'PUT';}
            when HTTP_HEAD { return 'HEAD';}
            when HTTP_POST { return 'POST';}
            when HTTP_PATCH { return 'PATCH';}
            when HTTP_TRACE { return 'TRACE';}
            when HTTP_DELETE { return 'DELETE';}
            when HTTP_OPTIONS { return 'OPTIONS';}
            when HTTP_CONNECT { return 'CONNECT';}
        }

        throw new RS_RestException('HTTP method not found. Method = ');
    }

    public static String getHeaderByEnum(HttpHeader header) {
        switch on header {
            when CONTENT_TYPE { return 'Content-Type';}
            when AUTHORIZATION { return 'Authorization';}
        }

        throw new RS_RestException('HTTP header not found. Header = ');
    }
}
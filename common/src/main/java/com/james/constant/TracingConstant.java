package com.james.constant;

public class TracingConstant {

  public static final String SERVER_TRACING = "SERVER_TRACING";
  public static final String METHOD_TRACING = "METHOD_TRACING";
  public static final String PROTOCOL_TRACING = "PROTOCOL_TRACING";

  public static final String MDC_SPAN_ID = "MDC_SPAN_ID";
  public static final String MDC_TRACE_ID = "MDC_TRACE_ID";

  public static enum Protocol {
    HTTP("http"),
    HTTPS("https"),
    MESSAGE_QUEUE("message-queue");

    private final String value;

    Protocol(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }
  }
}

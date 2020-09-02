package tr.com.obss.jss.week.filter;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Component
public class RequestInFilter extends CommonsRequestLoggingFilter{
	private static final Logger LOGGER = LoggerFactory.getLogger(RequestInFilter.class);
	
	@Override 
	protected boolean shouldLog(HttpServletRequest request) {
		String pathInfo = request.getRequestURI();
		return pathInfo.contains("/api");
		
	}
	
	@Override 
	protected void beforeRequest(HttpServletRequest request, String message ) {
		LOGGER.info("Request {}, {}", request.getRequestURI(),request.getMethod());
	}
	
	@Override 
	protected void afterRequest(HttpServletRequest request, String message ) {
		LOGGER.info("Request {}, {}", request.getRequestURI(),request.getMethod());
	}
}

package tr.com.obss.jss.week.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import tr.com.obss.jss.week.filter.RequestInFilter;

@Component
public class RequestInInterceptor implements HandlerInterceptor{

	private static final Logger LOGGER = LoggerFactory.getLogger(RequestInInterceptor.class);
	
	
	@Override 
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		LOGGER.info("Request interceptor basladi: {} {}", request.getRequestURI(), request.getMethod());
		return true; 
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
		LOGGER.info("Request interceptor bitti: {} {}", request.getRequestURI(), request.getMethod());
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
		
	}
}

package tr.com.obss.jss.week.cache;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import tr.com.obss.jss.week.interceptor.RequestInInterceptor;
import tr.com.obss.jss.week.model.UserDTO;

@Component("singletonCache")
@Scope("singleton")
public class UserCacheSingleton implements UserCache{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(RequestInInterceptor.class);
	public Map<String,UserDTO> users;
	
	@PostConstruct
	public void init() {
		LOGGER.info("Singleton bean olustu");
		users = new HashMap<>();
	}
	
	@Override
	public void put(UserDTO user) {
		users.put(user.getUsername(),user);
		
	}

	@Override
	public Map<String, UserDTO> getMap() {
		return users;
	}
	
}

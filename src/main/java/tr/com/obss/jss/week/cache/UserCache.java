package tr.com.obss.jss.week.cache;

import java.util.Map;

import tr.com.obss.jss.week.model.UserDTO;

public interface UserCache {

	void put(UserDTO user);
	Map<String, UserDTO> getMap();
}

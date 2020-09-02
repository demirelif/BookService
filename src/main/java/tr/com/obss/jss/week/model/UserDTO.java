package tr.com.obss.jss.week.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserDTO {
	
	@NotBlank
	@Size(max= 255, min=3, message = "Lutfen gecerli bir kullanici adi girin")
	@Email
	private String username;
	
	@NotBlank
	@Size(max= 255, min=3, message = "Lutfen gecerli bir kullanici adi girin")
	private String password; 
	
	// GETTERS & SETTERS
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}

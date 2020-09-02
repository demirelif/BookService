package tr.com.obss.jss.week.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="ROLE")

public class Role extends EntityBase{
	
	@Column(name = "NAME", length = 255, unique = true )
	private String name; 

	@ManyToMany(mappedBy = "roles")
	@JsonBackReference
	private List<User> users;
	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
}

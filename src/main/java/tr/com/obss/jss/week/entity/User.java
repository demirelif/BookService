package tr.com.obss.jss.week.entity;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.JoinColumn;

@Entity
@Table(name = "USER")

public class User extends EntityBase{

	
	@Column(name="USERNAME", length=255, unique=true)
	private String username;
	
	@Column(name="PASSWORD", length=255)
	private String password;
	
	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER )
	@JoinTable(name="USERS_ROLE", joinColumns = {@JoinColumn( name = "USER_ID", referencedColumnName = "ID") },
								  inverseJoinColumns = {@JoinColumn( name = "ROLE_ID", referencedColumnName = "ID")})
	@JsonManagedReference
	private List<Role> roles;
	
	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY )
	@JoinTable(name="USERS_FAV_BOOK", joinColumns = {@JoinColumn( name = "USER_ID", referencedColumnName = "ID") },
								  inverseJoinColumns = {@JoinColumn( name = "BOOK_ID", referencedColumnName = "ID")})
	@JsonManagedReference
	private List<Book> favBooks;
	

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY )
	@JoinTable(name="USERS_READ_LIST_BOOK", joinColumns = {@JoinColumn( name = "USER_ID", referencedColumnName = "ID") },
								  inverseJoinColumns = {@JoinColumn( name = "BOOK_ID", referencedColumnName = "ID")})
	@JsonManagedReference
	private List<Book> readListBooks;

	// Getters & Setters
	
	public List<Role> getRoles() {
		return roles;
	}
	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public String getUsername(){
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
	
	public List<Book> getFavBooks() {
		return favBooks;
	}
	public void setFavBooks(List<Book> favBooks) {
		this.favBooks = favBooks;
	}
	
	public List<Book> getReadListBooks() {
		return readListBooks;
	}
	public void setReadListBooks(List<Book> readListBooks) {
		this.readListBooks = readListBooks;
	}
}

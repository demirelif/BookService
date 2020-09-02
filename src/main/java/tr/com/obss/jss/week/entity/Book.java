package tr.com.obss.jss.week.entity;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.JoinColumn;

@Entity
@Table(name = "BOOK")

public class Book extends EntityBase {
	
	@Column(name="BOOKNAME", length=255)
	private String bookname;
	
	@Column(name="AUTHOR", length=255)
	private String author;

	@ManyToMany(mappedBy = "favBooks")
	@JsonBackReference
	private List<User> usersFavBooksList;
	
	@ManyToMany(mappedBy = "readListBooks")
	@JsonBackReference
	private List<User> usersReadBooksList;
	
	// GETTERS AND SETTERS 
	
	public List<User> getUsersFavBooksList() {
		return usersFavBooksList;
	}

	public void setUsersFavBooksList(List<User> usersFavBooksList) {
		this.usersFavBooksList = usersFavBooksList;
	}
	

	public List<User> getUsersReadBooksList() {
		return usersReadBooksList;
	}

	public void setUsersReadBooksList(List<User> usersReadBooksList) {
		this.usersReadBooksList = usersReadBooksList;
	}
	
	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}
	
	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}
		
}

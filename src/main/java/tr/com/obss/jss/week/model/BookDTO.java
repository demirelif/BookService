package tr.com.obss.jss.week.model;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class BookDTO {
	
	@NotBlank
	@Size(max= 255, min=0, message = "")
	private String bookname;
	
	@NotBlank
	@Size(max= 255, min=3, message = "")
	private String author; 
	
	// GETTERS & SETTERS
	
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

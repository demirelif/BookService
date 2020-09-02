package tr.com.obss.jss.week.controller1;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import tr.com.obss.jss.week.entity.Book;
import tr.com.obss.jss.week.entity.User;
import tr.com.obss.jss.week.model.BookDTO;
import tr.com.obss.jss.week.model.BookUpdateDTO;
import tr.com.obss.jss.week.model.UserDTO;
import tr.com.obss.jss.week.service.BookService;

@RestController
@RequestMapping("/api/book")

public class BookController {
	@Autowired
	private BookService bookService; 
	
	@Autowired
	public BookController(BookService bookService) {
		this.bookService = bookService;
	}
	
	//private static final Logger LOGGER = LoggerFactory.getLogger(RequestInInterceptor.class);
	
	/*
	@GetMapping("")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> get( @RequestParam(name="pageSize", defaultValue = "2") int pageSize, 
								  @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){
		return ResponseEntity.ok(bookService.findAll(pageSize,pageNumber));
	}
	*/
	
	@GetMapping("")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> get( @RequestParam(name="pageSize", defaultValue = "2") int pageSize, 
								  @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){
		return ResponseEntity.ok(bookService.findAll(pageSize,pageNumber));
	}
	
	@GetMapping("/all")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> findInActive( @RequestParam(name="pageSize", defaultValue = "2") int pageSize, 
								  @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){
		return ResponseEntity.ok(bookService.findInactive(pageSize,pageNumber));
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public ResponseEntity<?> get(@PathVariable long id){
		Optional<Book> bookOptional = bookService.findByBookId(id);
		if ( bookOptional.isPresent() ) {
			return ResponseEntity.ok(bookOptional.get());
		}
		throw new IllegalArgumentException("Kitap bulunamadi");
	}
	
	@GetMapping("/searchBook")
	@ResponseBody
	public ResponseEntity<?> get(@RequestParam(name="bookname", defaultValue="") String bookname) {
		List<Book> bookList = bookService.getByBookName(bookname);
		return ResponseEntity.ok(bookList);
	}
	
	
	@PutMapping("/{id}")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> update(@PathVariable long id, @Valid @RequestBody BookUpdateDTO bookDTO){		
		Book book = bookService.update(id, bookDTO);
		return ResponseEntity.ok(book);
	}
	
	@DeleteMapping("/{id}")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> delete(@PathVariable long id){
		Book book = bookService.delete(id); 
		return ResponseEntity.ok(book);
	}
	
	@PostMapping("/postBook")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> post(@Valid @RequestBody BookDTO bookDTO){
	    Book book = bookService.save(bookDTO); 
		return ResponseEntity.ok(book);
	}
	
	// get all books from the database 
	@GetMapping("/seeBooks")
	@ResponseBody
	public ResponseEntity<?> get(){
		return ResponseEntity.ok(bookService.getAll());
	}
	
	@PutMapping("/deleteBook")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> deleteBook( @RequestParam(name="id") long id ){
		Book book = bookService.deleteBook(id);
		return ResponseEntity.ok(book);
	}
	
	@PutMapping("/makeActiveBook")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> makeActiveBook( @RequestParam(name="id") long id ){
		Book book = bookService.makeActiveBook(id);
		return ResponseEntity.ok(book);
	}
	
	@PutMapping("/addBook")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> addBook( @RequestParam(name="bookname") String bookname, 
			@RequestParam(name="authorname") String authorname){
		BookDTO bookDTO = new BookDTO();
		bookDTO.setAuthor(authorname);
		bookDTO.setBookname(bookname);
		
		Book book = bookService.save(bookDTO);
		return ResponseEntity.ok(book);
	}
	

}

package tr.com.obss.jss.week.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import tr.com.obss.jss.week.entity.Book;
import tr.com.obss.jss.week.entity.User;
import tr.com.obss.jss.week.model.BookDTO;
import tr.com.obss.jss.week.model.BookUpdateDTO;
import tr.com.obss.jss.week.model.UserDTO;
import tr.com.obss.jss.week.repo.BookRepository;

@Service 
public class BookService {
	
	@Autowired
	private BookRepository bookRepository;
	
	
	public Book save(BookDTO bookDTO) {
		Book book = new Book();
		book.setBookname(bookDTO.getBookname());
		book.setAuthor(bookDTO.getAuthor());
		Book savedBook = bookRepository.save(book);
		return savedBook;
	}
	
	/*
	public Page<Book> findAll( int pageSize, int pageNumber){
		Pageable paged = PageRequest.of(pageNumber, pageSize);
		return bookRepository.findAll(paged);
	}
	*/

	public Page<Book> findAll( int pageSize, int pageNumber){
		Pageable paged = PageRequest.of(pageNumber, pageSize);
		return bookRepository.getActives(paged);
	}
	
	public Page<Book> findInactive( int pageSize, int pageNumber){
		Pageable paged = PageRequest.of(pageNumber, pageSize);
		return bookRepository.findAll(paged);
	}
	
	public List<Book> getByBookName(String name){
		return bookRepository.getByBookName(name);
	}
	
	public Optional<Book> findByBookId( long id ){
		return bookRepository.getByBookId(id);
	}
	

	public Book update( long id, BookUpdateDTO dto ) {
		Optional<Book> byId = bookRepository.findById(id);
		
		if ( byId.isPresent() ) {
			Book book = byId.get();
			book.setAuthor( dto.getAuthor() );
			book.setBookname( dto.getBookname() );
			return bookRepository.save( book );
		}
		throw new IllegalArgumentException("Kitap bulunamadi."); 
	}
	
	public Book delete(long id) {
		Optional<Book> byId = bookRepository.findById(id);
		if(byId.isPresent()) {
			Book book = byId.get();
			book.setActive(!book.isActive());
			return bookRepository.save(book);
		}
		throw new IllegalArgumentException("Kitap bulunamadi.");
	}

	public List<Book> getAll() {
		return bookRepository.getAll();
	}
	
	
	public Book deleteBook(long id) {
		bookRepository.deleteBook(id);
		return null;
	}

	public Book makeActiveBook(long id) {
		bookRepository.makeActiveBook(id);
		return null;
	}
	
	public Book addBook(String bookname, String authorname) {
		return bookRepository.addBook(bookname, authorname);
	}
	
}

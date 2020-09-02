package tr.com.obss.jss.week.repo;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;

import tr.com.obss.jss.week.entity.Book;
import tr.com.obss.jss.week.entity.User;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{
	
	@Query("select u from Book u where u.bookname= :bookname")
	List<Book> getByBookName(String bookname);
	
	//List<Book> findByFavs_NameIn(List<String> favBooks);
	//List<Book> findByReads_NameIn(List<String> readListBooks);
	
	@Query(value = "select * from Book u where u.id = :id", nativeQuery = true)
	Optional<Book> getByBookIdNative(long id);
	
	@Query("select u from Book u where u.id = :id")
	Optional<Book> getByBookId(long id);

	
	@Query(value = "select * from Book u where u.active = 1", nativeQuery = true)
	List<Book> getAll();
	
	
	@Query(value = "select * from Book u where u.active = 1", 
			countQuery = "select count(*) from Book u where u.active = 1",
			nativeQuery = true)
	Page<Book> getActives(Pageable pageable);
	
	@Query(value = "select distinct * from Book t1, users_fav_book t2 where t1.id = t2.book_id and t2.user_id = :id", nativeQuery = true)
	List<Book> getFav(long id);
	
	//@Query(value = "select distinct * from Book t1 left join (select u.book_id from users_read_list_book u where u.user_id = :id) t2 on t1.id = t2.book_id", nativeQuery = true)
	@Query(value = "select distinct * from Book t1, users_read_list_book t2 where t1.id = t2.book_id and t2.user_id = :id", nativeQuery = true)
	List<Book> getRead(long id);
	
	@Transactional
	@Modifying
	@Query(value = "update Book u set u.active = 0 where u.id = :id",nativeQuery=true)
	void deleteBook(long id);
	
	@Transactional
	@Modifying
	@Query(value = "update Book u set u.active = 1 where u.id = :id",nativeQuery=true)
	void makeActiveBook(long id);

	@Modifying
	@Query(value = "insert into Book (bookname,authorname) VALUES (:bookname,:authorname) ", nativeQuery=true)
	Book addBook(String bookname, String authorname);

}

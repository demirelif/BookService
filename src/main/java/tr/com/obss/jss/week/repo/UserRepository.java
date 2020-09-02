package tr.com.obss.jss.week.repo;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tr.com.obss.jss.week.entity.Book;
import tr.com.obss.jss.week.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
	

	Optional<User> findByUsername(String username);
	
	List<User> findByUsernameStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(String username);

	List<User> findByRoles_NameIn(List<String> roles);
	
	@Query("select u from User u where u.id = :id")
	Optional<User> getById(long id);
	
	@Query(value = "select * from User u where u.id = :id", nativeQuery = true)
	Optional<User> getByIdNative(long id);

	@Query(value = "select * from User u where u.active = 1", nativeQuery = true)
	List<User> getAll();

	@Transactional
	@Modifying
	@Query(value = "insert into users_fav_book (user_id,book_id) VALUES (:userId,:id) ", nativeQuery=true)
	void addFav(long id, long userId);
	
	@Transactional
	@Modifying
	@Query(value = "insert into users_read_list_book (user_id,book_id) VALUES (:userId,:id) ", nativeQuery=true)
	void addRead(long id, long userId);

	@Transactional
	@Modifying
	@Query(value = "delete from users_fav_book u where u.user_id = :userId and u.book_id = :id",nativeQuery=true)
	void deleteFav(long id, long userId);
	
	@Transactional
	@Modifying
	@Query(value = "delete from users_read_list_book u where u.user_id = :userId and u.book_id = :id",nativeQuery=true)
	void deleteRead(long id, long userId);
	
	@Transactional
	@Modifying
	@Query(value = "update User u set u.active = 0 where u.id = :id",nativeQuery=true)
	void deleteUser(long id);
	
	@Transactional
	@Modifying
	@Query(value = "update User u set u.active = 1 where u.id = :id",nativeQuery=true)
	void activeUser(long id);

	@Query(value = "select * from User u where u.username = :username", nativeQuery = true)
	List<User> findUsers(String username);
	
	@Transactional
	@Query(value = "select * from User u where u.id = :id", nativeQuery = true)
	//@Query(value = "select * from users_role u where u.user_id = :id and u.role_id = 1", nativeQuery = true)
	User getRole(long id);
	
	@Query(value = "select * from User u where u.active = 1", 
			countQuery = "select count(*) from User u where u.active = 1",
			nativeQuery = true)
	Page<User> getAll(Pageable pageable);
	
}

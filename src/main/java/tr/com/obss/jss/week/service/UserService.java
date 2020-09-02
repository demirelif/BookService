package tr.com.obss.jss.week.service;

import java.util.Arrays;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import tr.com.obss.jss.week.entity.Book;
import tr.com.obss.jss.week.entity.User;
import tr.com.obss.jss.week.model.MyUserDetails;
import tr.com.obss.jss.week.model.UserDTO;
import tr.com.obss.jss.week.model.UserUpdateDTO;
import tr.com.obss.jss.week.repo.BookRepository;
import tr.com.obss.jss.week.repo.RoleRepository;
import tr.com.obss.jss.week.repo.UserRepository;

@Service 
public class UserService implements UserDetailsService{
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	public User save(UserDTO userDTO) {
		User user = new User();
		user.setUsername(userDTO.getUsername());
		user.setPassword( encoder.encode(userDTO.getPassword()) );
		user.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER")));
		User savedUser = userRepository.save(user); 
		return savedUser;
	}
	
	public Page<User> findAll( int pageSize, int pageNumber ){
		Pageable paged = PageRequest.of(pageNumber,pageSize);
		return userRepository.findAll(paged); 
		
	}
	
	public Page<User> getAll( int pageSize, int pageNumber ){
		Pageable paged = PageRequest.of(pageNumber,pageSize);
		return userRepository.getAll(paged); 
		
	}


	public Optional<User> findById( long id ){
		return userRepository.getByIdNative(id);
	}
	
	public Optional<User> findByUsername( String name ){
		return userRepository.findByUsername(name);
	}
	
	public List<User> findByRoles( List<String> roles ){
		return userRepository.findByRoles_NameIn(roles);
	}

	public User update(long id, UserUpdateDTO dto) {
		Optional<User> byId = userRepository.findById(id);
		if(byId.isPresent()) {
			User user = byId.get();
			user.setPassword( encoder.encode( dto.getPassword() ) );
			return userRepository.save(user);
		}
		throw new IllegalArgumentException("Kullanici bulunamadi.");
		
	}

	public User delete(long id) {
		Optional<User> byId = userRepository.findById(id);
		if(byId.isPresent()) {
			User user = byId.get();
			user.setActive(!user.isActive());
			return userRepository.save(user);
		}
		throw new IllegalArgumentException("Kullanici bulunamadi.");
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> byUsername = userRepository.findByUsername(username);
		if ( byUsername.isPresent() ) {
			return new MyUserDetails(byUsername.get()); 
		}
		throw new UsernameNotFoundException("Kullanici bulunamadi"); 
	}

	public List<User> getAll() {
		return userRepository.getAll();
	}

	public User addFav(long id, long userId) {
		// TODO Auto-generated method stub
		userRepository.addFav(id,userId); 
		return null;
	}
	
	public User addRead(long id, long userId) {
		// TODO Auto-generated method stub
		userRepository.addRead(id,userId); 
		return null;
	}

	public List<Book> getFav(long id) {
		return bookRepository.getFav(id);
	}

	public List<Book> getRead(long id) {
		return bookRepository.getRead(id);
	}

	public User deleteFav(int id, long userId) {
		userRepository.deleteFav(id,userId); 
		return null;
	}
	
	public User deleteRead(int id, long userId) {
		userRepository.deleteRead(id,userId); 
		return null;
	}
	
	public User deleteUser(long id) {
		userRepository.deleteUser(id);
		return null;
	}
	
	public User activeUser(long id) {
		userRepository.activeUser(id);
		return null;
	}

	public List<User> findUsers(String username) {
		return userRepository.findUsers(username);
	}

	public User getRole(long id) {
		return userRepository.getRole(id);
		}
}

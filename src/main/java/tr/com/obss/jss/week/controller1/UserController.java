package tr.com.obss.jss.week.controller1;

import java.security.*;
import java.util.*;

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
import tr.com.obss.jss.week.model.UserDTO;
import tr.com.obss.jss.week.model.UserUpdateDTO;
import tr.com.obss.jss.week.service.UserService;

@RestController
@RequestMapping("/api/user")

public class UserController {
	@Autowired
	private UserService userService; 
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	//private static final Logger LOGGER = LoggerFactory.getLogger(RequestInInterceptor.class);
	
	@GetMapping("")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> get( @RequestParam(name="pageSize", defaultValue = "2") int pageSize, 
								  @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){
		return ResponseEntity.ok(userService.findAll(pageSize,pageNumber));
	}
	
	@GetMapping("/all")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getAll( @RequestParam(name="pageSize", defaultValue = "2") int pageSize, 
								  @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){
		return ResponseEntity.ok(userService.getAll(pageSize,pageNumber));
	}
	

	@GetMapping("/{id}")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> get(@PathVariable long id){
		Optional<User> userOptional = userService.findById(id);
		if ( userOptional.isPresent() ) {
			return ResponseEntity.ok(userOptional.get());
		}
		throw new IllegalArgumentException("Kullanici bulunamadi");
	}
	
	@GetMapping("/seeUsers")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> get(){
		List<User> allUsers = userService.getAll();
		return ResponseEntity.ok(allUsers);
	}
	
	@GetMapping("/getRole")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getRole( Principal p ){	
		String name = p.getName();
		System.out.println("name is " + name );
		Optional<User> user = userService.findByUsername(name);
		System.out.println("name is " + user.get().getId() );
		System.out.println("name is " + user.get().getUsername() );
	
		System.out.println("========================");
		User userRole = userService.getRole(user.get().getId());
		System.out.println("========================");
		System.out.println("role is " + userRole.getRoles().get(0).getName() );
		return ResponseEntity.ok(userRole.getRoles());
	}
	
	@GetMapping("/search")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> get(@RequestParam(name="username", defaultValue="") String username) {
		Optional<User> userList = userService.findByUsername(username);
		return ResponseEntity.ok(userList);
	}
	
	@GetMapping("/has-role-user")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> findByRoles() {
		List<User> userList = userService.findByRoles(Arrays.asList("ROLE_USER"));
		return ResponseEntity.ok(userList);
	}
	
	@PutMapping("/{id}")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> update(@PathVariable long id, @Valid @RequestBody UserUpdateDTO userDTO){
		User user = userService.update(id,userDTO); 
		return ResponseEntity.ok(user);
	}
	
	@PostMapping("")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> post(@Valid @RequestBody UserDTO userDTO){
		User user = userService.save(userDTO); 
		return ResponseEntity.ok(user);
	}
	
	// add books as favorite books
	@PutMapping("/addFav")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> addFav( @RequestParam(name="id") int id, 
			  Principal p){
		String name = p.getName();
		Optional<User> user1 = userService.findByUsername(name);
		User user = userService.addFav(id, user1.get().getId());
		return ResponseEntity.ok(user);
	}
	
	@DeleteMapping("/deleteFav")
	@ResponseBody
	public ResponseEntity<?> deleteFav( @RequestParam(name="id") int id, 
			  Principal p){
		String name = p.getName();
		Optional<User> user1 = userService.findByUsername(name);
		User user = userService.deleteFav(id, user1.get().getId());
		return ResponseEntity.ok(user);
	}
	
	@DeleteMapping("/deleteRead")
	@ResponseBody
	public ResponseEntity<?> deleteRead( @RequestParam(name="id") int id, 
			  Principal p){
		String name = p.getName();
		Optional<User> user1 = userService.findByUsername(name);
		User user = userService.deleteRead(id, user1.get().getId());
		return ResponseEntity.ok(user);
	}
	
	// add books as to reading list
	@PutMapping("/addRead")
	@ResponseBody
	//@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> addRead( @RequestParam(name="id") int id, 
			  Principal p){
		String name = p.getName();
		Optional<User> user1 = userService.findByUsername(name);
		User user = userService.addRead(id,user1.get().getId());
		return ResponseEntity.ok(user);
	}
	
	// see favorite list
	@GetMapping("/seeFav")
	@ResponseBody
	public ResponseEntity<?> getFav( Principal p ){
		String name = p.getName();
		Optional<User> user = userService.findByUsername(name);
		List<Book> allBooks = userService.getFav(user.get().getId());
		return ResponseEntity.ok(allBooks);
	}
	
	
	@GetMapping("/who-am-i")
	@ResponseBody
	public ResponseEntity<?> who(Principal p){
		Map<String,Object> resultMap = new HashMap<>();
		resultMap.put("userName", p.getName());
		return ResponseEntity.ok(resultMap);
	}
	
	
	// see read list
	@GetMapping("/seeRead")
	@ResponseBody
	public ResponseEntity<?> getRead( Principal p ){
		String name = p.getName();
		Optional<User> user = userService.findByUsername(name);
		List<Book> allBook = userService.getRead(user.get().getId());
		return ResponseEntity.ok(allBook);
	}
	
	@PutMapping("/deleteUser")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> deleteUser( @RequestParam(name="id") long id ){
		User user = userService.deleteUser(id);
		return ResponseEntity.ok(user);
	}	
	
	@PutMapping("/activeUser")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> activeUser( @RequestParam(name="id") long id ){
		User user = userService.activeUser(id);
		return ResponseEntity.ok(user);
	}	

	@GetMapping("/searchUser")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getUser(@RequestParam(name="username", defaultValue="") String username) {
		List<User> userList = userService.findUsers(username);
		return ResponseEntity.ok(userList);
	}
}

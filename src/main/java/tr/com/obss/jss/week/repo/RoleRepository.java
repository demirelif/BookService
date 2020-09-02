package tr.com.obss.jss.week.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tr.com.obss.jss.week.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{
	
	boolean existsByName(String name);
	
	Role findByName(String name);
}

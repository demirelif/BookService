package tr.com.obss.jss.week.repo;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import tr.com.obss.jss.week.entity.Book;

@Repository
public class BookDAO {
	@Autowired
	private EntityManager entityManager;
	
	public List<Book> get(int pageSize, int pageNumber){
		
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Book> criteriaQuery = criteriaBuilder.createQuery(Book.class);
		Root<Book> from = criteriaQuery.from(Book.class);

		
		CriteriaQuery<Book> select = criteriaQuery.select(from);
		TypedQuery typedQuery = entityManager.createQuery(select);
		typedQuery.setFirstResult(pageNumber*pageSize);
		typedQuery.setMaxResults(pageSize);
		
		List resultList = typedQuery.getResultList();
		return resultList;
	}
}
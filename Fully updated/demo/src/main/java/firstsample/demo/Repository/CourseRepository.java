package firstsample.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import firstsample.demo.Model.CourseModel;

public interface CourseRepository extends JpaRepository<CourseModel, Integer> {

}

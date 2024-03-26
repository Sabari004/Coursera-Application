package firstsample.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import firstsample.demo.Model.CourseModel;
import firstsample.demo.Model.EnrolledCourse;
import firstsample.demo.Model.UserModel;

public interface EnrolledRepository extends JpaRepository<EnrolledCourse, Integer> {

    Optional<EnrolledCourse> findByCourseAndUserModel(Optional<CourseModel> course, Optional<UserModel> user);

}

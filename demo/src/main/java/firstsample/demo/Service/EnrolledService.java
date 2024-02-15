package firstsample.demo.Service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import firstsample.demo.Model.CoursesModel;
import firstsample.demo.Model.EnrolledcourseModel;
import firstsample.demo.Model.UserModel;
import firstsample.demo.Repository.CourseRepository;
import firstsample.demo.Repository.EnrolledRepository;
import firstsample.demo.Repository.UserDetailRepository;
import jakarta.persistence.EntityExistsException;
import java.util.List;
import java.util.Optional;

@Service
public class EnrolledService {
    @Autowired
    private EnrolledRepository enrolledRepository;
    // @Autowired
    // private UserDetailRepository userDetailRepository;

    public EnrolledcourseModel saveEnrolledDetails(EnrolledcourseModel enrolled) {

        // Optional<UserModel> userModel =
        // userDetailRepository.findById((long)(enrolled.getUser().getUser_id()));
        List<Object[]> courses = enrolledRepository.getByCourseId((int) enrolled.getCourses().getCourse_id()); // Assuming
                                                                                                               // 1 is
                                                                                                               // the
                                                                                                               // course
                                                                                                               // ID you
                                                                                                               // want
                                                                                                               // to
                                                                                                               // query
                                                                                                               // for
        if (courses.isEmpty()) {
            throw new RuntimeException("No course found for the given course ID");
        }
        return enrolledRepository.save(enrolled);
    }

    public EnrolledcourseModel updateEnrolledDetails(int id, EnrolledcourseModel updatedEnrolled) {
        Optional<EnrolledcourseModel> existingEnrolledOptional = enrolledRepository.findById((long) id);
        if (existingEnrolledOptional.isPresent()) {
            return enrolledRepository.save(updatedEnrolled);
        } else {
            throw new EntityExistsException("Enrolled course not found with ID: " + id);
        }
    }

    public List<EnrolledcourseModel> findEnrolledById(int enrolledId) {
        List<EnrolledcourseModel> enroll = enrolledRepository.selectByUserId(enrolledId);
        if (enroll != null) {
            return enroll;
        } else {
            throw new EntityExistsException("Enrolled course not found ");
        }
    }

    public List<EnrolledcourseModel> findAllEnrolledDetails() {
        return (List<EnrolledcourseModel>) enrolledRepository.findAll();
    }

    public List<EnrolledcourseModel> findEnrolledByUser(int id) {
        return (List<EnrolledcourseModel>) enrolledRepository.findByUserId(id);
    }

    public List<EnrolledcourseModel> findEnrolledByUserAndCourse(int id, int cid) {
        return (List<EnrolledcourseModel>) enrolledRepository.findByUserIdAndCourseId(id, cid);
    }

    public List<EnrolledcourseModel> findEnrolledCourse(int cid) {
        return (List<EnrolledcourseModel>) enrolledRepository.findByCourseId(cid);
    }

    public void deleteEnrolledDetails(int enrolledId) {
        enrolledRepository.deleteByEnrolledId(enrolledId);
    }
}

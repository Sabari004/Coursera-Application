package firstsample.demo.Service;

import org.springframework.stereotype.Service;

import java.util.Optional;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import firstsample.demo.Model.CourseModel;
import firstsample.demo.Model.EnquiryModel;
import firstsample.demo.Model.EnrolledCourse;
import firstsample.demo.Model.UserModel;
import firstsample.demo.Repository.CourseRepository;
import firstsample.demo.Repository.EnquiryRepository;
import firstsample.demo.Repository.EnrolledRepository;
import firstsample.demo.Repository.UserDetailRepository;

@Service
public class UserService {
	@Autowired
	EnquiryRepository enquiryRepo;
	@Autowired
	UserDetailRepository userModelRepo;
	@Autowired
	CourseRepository courseRepo;
	@Autowired
	EnrolledRepository enrolledRepo;

	public Optional<UserModel> getUserByEmail(String email) {
		return userModelRepo.findByEmail(email);
	}

	public String updateUser(String email, UserModel user_d) {
		Optional<UserModel> user = userModelRepo.findByEmail(email);
		UserModel u = user.get();
		u.setCollege(user_d.getCollege());
		u.setDOB(user_d.getDOB());
		u.setPhone(user_d.getPhone());
		userModelRepo.save(u);
		return "User Updated";
	}

	public String addEnquiry(String email, EnquiryModel enquiryModel, int course_id) {
		Optional<UserModel> userModel = userModelRepo.findByEmail(email);
		Optional<CourseModel> courseModel = courseRepo.findById(course_id);
		if (userModel.isEmpty()) {
			return "User not found";
		}
		enquiryModel.setUserModel(userModel.get());
		enquiryModel.setCourseModel(courseModel.get());
		enquiryRepo.save(enquiryModel);
		return "Enquiry Added Successfully";
	}

	public String addEnrolled(String email, int id, EnrolledCourse enrolledCourse) {
		Optional<UserModel> userModel = userModelRepo.findByEmail(email);
		Optional<CourseModel> courseModel = courseRepo.findById(id);
		if (userModel.isEmpty()) {
			return "User not found";
		}
		enrolledCourse.setUserModel(userModel.get());
		enrolledCourse.setCourse(courseModel.get());
		enrolledRepo.save(enrolledCourse);
		return "Enrolled Successfully";
	}

	public List<EnquiryModel> getEnquiryEmail(String email) {
		Optional<UserModel> userModel = userModelRepo.findByEmail(email);
		UserModel user = userModel.get();

		return user.getEnquiry();
	}

	public List<EnquiryModel> getAllEnquiry() {

		return enquiryRepo.findAll();
	}

	public List<CourseModel> getCourses() {

		return courseRepo.findAll();
	}

	public Optional<CourseModel> getCourseId(int id) {

		return courseRepo.findById(id);
	}

	public String putCourse(CourseModel course) {
		courseRepo.save(course);
		return "Course Added Successfully";
	}

	public String updateEnquiry(int id, String reply) {
		Optional<EnquiryModel> enquiryModel = enquiryRepo.findById(id);
		EnquiryModel enquiryModel2 = enquiryModel.get();
		enquiryModel2.setReply(reply);
		enquiryRepo.save(enquiryModel2);

		return "Enquiry Updated";
	}

	public List<EnrolledCourse> getEnrolled() {

		return enrolledRepo.findAll();
	}

	public List<EnrolledCourse> getEnrollByCourse(int course_id) {
		Optional<CourseModel> course = courseRepo.findById(course_id);
		CourseModel courses = course.get();
		return courses.getEnrolled();
	}

	public String deleteEnquiry(int enq_id) {
		enquiryRepo.deleteById(enq_id);
		return "Enquiry Delelted";
	}

	public String deleteCourse(int course_id) {
		courseRepo.deleteById(course_id);
		return "Course Delelted";
	}

	public List<EnrolledCourse> getEnrollByUser(String email) {
		Optional<UserModel> user = userModelRepo.findByEmail(email);

		return user.get().getEnrolled();
	}

	public List<UserModel> getAllUsers() {

		return userModelRepo.findAll();
	}

	public String putEnroll(int id, String status) {
		Optional<EnrolledCourse> enroll = enrolledRepo.findById(id);
		EnrolledCourse en = enroll.get();
		en.setStatus(status);
		enrolledRepo.save(en);
		return "Status Updated";
	}

	public Optional<EnrolledCourse> getCourseByIdAndEmail(int course_id, String email) {
		Optional<UserModel> user = userModelRepo.findByEmail(email);
		Optional<CourseModel> course = courseRepo.findById(course_id);
		Optional<EnrolledCourse> enroll = enrolledRepo.findByCourseAndUserModel(course, user);

		return enroll;
	}
}
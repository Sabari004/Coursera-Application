package firstsample.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import firstsample.demo.Model.CoursesModel;
import firstsample.demo.Model.EnrolledcourseModel;
import firstsample.demo.Service.CoursesService;
import firstsample.demo.Service.EnrolledService;

// import com.example.edu_aid.Model.EnquiryModel;
// import com.example.edu_aid.Service.EnquiryService;

// import com.example.edu_aid.Model.CoursesModel;
// import com.example.edu_aid.Service.CoursesService;

@RestController
@CrossOrigin("*")
// @RequestMapping("")
public class EnrolledController {
	@Autowired
	public EnrolledService ServiceImp;

	@PostMapping("/user/postEnroll")
	public EnrolledcourseModel saveEnrolledDetails(@RequestBody EnrolledcourseModel sign) {
		ServiceImp.saveEnrolledDetails(sign);
		return sign;
	}

	@GetMapping("/getEnroll")
	public List<EnrolledcourseModel> findStudent(@RequestParam int id) {
		return ServiceImp.findEnrolledById(id);
	}

	@GetMapping("/getEnrollUser/{id}")
	public List<EnrolledcourseModel> findStudentEnroll(@PathVariable int id) {
		return ServiceImp.findEnrolledByUser(id);
	}

	@GetMapping("/getEnrollUser/{id}/{cid}")
	public List<EnrolledcourseModel> findStudentEnrollByCourseAndUser(@PathVariable int id, @PathVariable int cid) {
		return ServiceImp.findEnrolledByUserAndCourse(id, cid);
	}

	@GetMapping("/getEnrollCourse/{cid}")
	public List<EnrolledcourseModel> findStudentEnrollByCourse(@PathVariable int cid) {
		return ServiceImp.findEnrolledCourse(cid);
	}

	@GetMapping("/getAllEnrolls")
	public List<EnrolledcourseModel> findAllEnrolledDetails() {
		return ServiceImp.findAllEnrolledDetails();
	}

	@PutMapping("/user/updateEnroll/{id}")
	public EnrolledcourseModel updateEnrolledDetails(@PathVariable int id, @RequestBody EnrolledcourseModel sign) {
		return ServiceImp.updateEnrolledDetails(id, sign);
	}

	@DeleteMapping("/user/deleteEnroll")
	public String deleteEnrolledDetails(@RequestParam int id) {

		ServiceImp.deleteEnrolledDetails(id);
		return "Enrolled Details Deleted !";
	}

}
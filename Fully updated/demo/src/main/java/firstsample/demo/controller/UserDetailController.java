package firstsample.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import firstsample.demo.Model.CourseModel;
import firstsample.demo.Model.EnquiryModel;
import firstsample.demo.Model.EnrolledCourse;
import firstsample.demo.Model.UserModel;
import firstsample.demo.Repository.UserDetailRepository;
import firstsample.demo.Service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

// import com.example.edu_aid.Model.EnquiryModel;
// import com.example.edu_aid.Service.EnquiryService;

// import com.example.edu_aid.Model.CoursesModel;
// import com.example.edu_aid.Service.CoursesService;

@RestController
@CrossOrigin("*")
public class UserDetailController {
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Autowired
    UserService userService;

    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
    // @PostMapping("/user")
    // public String saveSiteDetails(@RequestBody UserModel sign) {
    // ServiceImp.save(sign);
    // return "Success";
    // }

    // @GetMapping("/getUser/{id}")
    // public Optional<UserModel> findUsersById(@PathVariable int id) {
    // return ServiceImp.findById(id);
    // }

    // @GetMapping("/")
    // public String getMethodName(@RequestHeader("Authorization") String token) {
    // // String jwtToken = token.substring(7);
    // // Claims claims =
    // // Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
    // // System.out.print(claims);
    // return new String("Hello");
    // }
    @PostMapping("/postEnquiry/{course_id}")
    public String postEnquiry(@RequestBody EnquiryModel enquiry, @RequestHeader("Authorization") String token,
            @PathVariable int course_id) {
        String jwtToken = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
        String email = claims.getSubject();
        return userService.addEnquiry(email, enquiry, course_id);
    }

    @GetMapping("/getEnquiryByEmail")
    public List<EnquiryModel> getEnquiryByEmail(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
        String email = claims.getSubject();
        return userService.getEnquiryEmail(email);
    }

    @GetMapping("/getEnquiry")
    public List<EnquiryModel> getEnquiry() {

        return userService.getAllEnquiry();
    }

    @PostMapping("/updateEnquiry/{id}/{reply}")
    public String updateEnquiryById(@PathVariable int id, @PathVariable String reply) {

        return userService.updateEnquiry(id, reply);
    }

    @PostMapping("/addCourse")
    public String addCourse(@RequestBody CourseModel course) {

        return userService.putCourse(course);
    }

    @GetMapping("/getCourse")
    public List<CourseModel> getAllCourse() {

        return userService.getCourses();
    }

    @GetMapping("/getEnrollByCourse/{course_id}")
    public List<EnrolledCourse> getEnrollCourse(@PathVariable int course_id) {

        return userService.getEnrollByCourse(course_id);
    }

    @GetMapping("/getCourseById/{id}")
    public Optional<CourseModel> getACourse(@PathVariable int id) {

        return userService.getCourseId(id);
    }

    @GetMapping("/getUsers")
    public ResponseEntity<?> getUsers(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
        if (claims.get("role").equals("ADMIN")) {
            return ResponseEntity.ok(userService.getAllUsers());
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ErrorResponse("User doesn't have access to this resource"));

    }

    @GetMapping("/getUserByEmail")
    public Optional<UserModel> getUsersEmail(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
        String email = claims.getSubject();
        return userService.getUserByEmail(email);
    }

    @PostMapping("/updateuser")
    public String UpdateUser(@RequestBody UserModel user, @RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
        String email = claims.getSubject();
        return userService.updateUser(email, user);
    }

    @PostMapping("/addEnroll/{course_id}")
    public String postEnroll(@RequestBody EnrolledCourse enroll, @RequestHeader("Authorization") String token,
            @PathVariable int course_id) {
        String jwtToken = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
        String email = claims.getSubject();
        return userService.addEnrolled(email, course_id, enroll);
    }

    @GetMapping("/getAllEnroll")
    public List<EnrolledCourse> getAllEnroll() {

        return userService.getEnrolled();
    }

    @GetMapping("/getEnrollIdAndEmail/{course_id}")
    public Optional<EnrolledCourse> getEnrollIdEmail(@RequestHeader("Authorization") String token,
            @PathVariable int course_id) {
        String jwtToken = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
        String email = claims.getSubject();

        return userService.getCourseByIdAndEmail(course_id, email);
    }

    @GetMapping("/getEnrollUser")
    public List<EnrolledCourse> getEnrollUser(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
        String email = claims.getSubject();

        return userService.getEnrollByUser(email);
    }

    @DeleteMapping("/deleteEnquiry/{enq_id}")
    public String deleteEnq(@PathVariable int enq_id) {

        return userService.deleteEnquiry(enq_id);
    }

    @DeleteMapping("/deleteCourse/{course_id}")
    public String deleteCour(@PathVariable int course_id) {

        return userService.deleteCourse(course_id);
    }

    @PostMapping("/putEnroll/{enroll_id}/{status}")
    public String updateEnroll(@PathVariable String status, @PathVariable int enroll_id) {

        return userService.putEnroll(enroll_id, status);
    }

}
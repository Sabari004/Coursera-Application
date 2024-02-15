package firstsample.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import firstsample.demo.Model.CoursesModel;
import firstsample.demo.Model.User;
import firstsample.demo.Repository.UserRepository;
import firstsample.demo.Service.AuthenticationService;
import firstsample.demo.dto.request.AuthenticationRequest;
import firstsample.demo.dto.request.RegisterRequest;
import firstsample.demo.dto.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserAuthenticationController {

    private final AuthenticationService authenticationService;
    @Autowired
    UserRepository userservice;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/getuser/{email}")
    public Optional<User> findUserEmail(@PathVariable String email) {
        return userservice.findByEmail(email);
    }

    @GetMapping("/getAllUser")
    public List<User> findAllUser() {
        return userservice.findAll();
    }
}

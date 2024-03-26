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

import firstsample.demo.Model.Site;
import firstsample.demo.Model.User;
import firstsample.demo.Model.UserModel;
import firstsample.demo.Repository.SiteRepository;
import firstsample.demo.Repository.UserDetailRepository;
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
    public SiteRepository ServiceImp;
    @Autowired
    UserDetailRepository userservice;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
        // return "Hi";
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.print(request);
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/site")
    public String saveSiteDetails(@RequestBody Site sign) {
        ServiceImp.save(sign);
        return "Success";
    }

    @GetMapping("/getSite")
    public List<Site> findSite() {
        return ServiceImp.findAll();
    }

    @GetMapping("/getSite/{id}")
    public Optional<Site> findSiteById(@PathVariable int id) {
        return ServiceImp.findById(id);
    }

    @GetMapping("/isUser/{email}")
    public Optional<UserModel> isUser(@PathVariable String email) {
        return userservice.findByEmail(email);
    }

}

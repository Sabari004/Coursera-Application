package firstsample.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import firstsample.demo.Model.UserModel;

// import firstsample.demo.Model.UserModel;

public interface UserDetailRepository extends JpaRepository<UserModel, Integer> {

    Optional<UserModel> findByEmail(String email);

    // Optional<UserModel> findByEmail(String email);

}

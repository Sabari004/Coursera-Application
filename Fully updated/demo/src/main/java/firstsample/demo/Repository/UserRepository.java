package firstsample.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import firstsample.demo.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findById(int id);
}

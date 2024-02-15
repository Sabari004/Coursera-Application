package firstsample.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import firstsample.demo.Model.UserModel;

// import firstsample.demo.Model.UserModel;

public interface UserDetailRepository extends JpaRepository<UserModel, Integer> {

}

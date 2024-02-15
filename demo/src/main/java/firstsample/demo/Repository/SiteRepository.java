package firstsample.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import firstsample.demo.Model.Site;
// import firstsample.demo.Model.UserModel;

public interface SiteRepository extends JpaRepository<Site, Integer> {

}
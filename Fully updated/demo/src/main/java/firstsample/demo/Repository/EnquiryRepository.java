package firstsample.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import firstsample.demo.Model.EnquiryModel;

public interface EnquiryRepository extends JpaRepository<EnquiryModel, Integer> {

}

package firstsample.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class EnquiryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "enquiry_id")
    public int enquiry_id;
    public String description;
    public String reply;
    @ManyToOne
    public UserModel userModel;
    @ManyToOne
    public CourseModel courseModel;

}
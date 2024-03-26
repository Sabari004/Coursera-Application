package firstsample.demo.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CourseModel {
    @Id
    @Column(name = "course_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int course_id;
    public String course_name;
    public String description;
    public String duration;
    public long fees;
    public String level;
    public String instructor;
    public String img_url;
    @OneToMany(mappedBy = "course")
    @JsonIgnore
    public List<EnrolledCourse> enrolled;
    @OneToMany(mappedBy = "courseModel")
    @JsonIgnore
    public List<EnquiryModel> enquiry;

}

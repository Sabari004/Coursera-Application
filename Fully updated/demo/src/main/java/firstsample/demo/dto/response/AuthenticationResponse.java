package firstsample.demo.dto.response;

import javax.management.relation.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private String name;
    private Long id;
    private String token;
    private String role;
}

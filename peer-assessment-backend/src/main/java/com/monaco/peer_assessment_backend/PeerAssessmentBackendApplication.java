package com.monaco.peer_assessment_backend;

import com.monaco.peer_assessment_backend.service.impl.StorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableConfigurationProperties(StorageProperties.class)
public class PeerAssessmentBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PeerAssessmentBackendApplication.class, args);
	}

}

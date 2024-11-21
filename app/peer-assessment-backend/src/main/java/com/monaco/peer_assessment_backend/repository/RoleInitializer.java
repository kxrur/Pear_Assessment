package com.monaco.peer_assessment_backend.repository;

import com.monaco.peer_assessment_backend.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * A class that populates the role database with existing roles for users
 */
@Component
public class RoleInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(RoleInitializer.class);

    private final RoleRepository roleRepository;

    @Autowired
    public RoleInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findByName("PROFESSOR").isEmpty()) {
            Role professorRole = new Role();
            professorRole.setName("PROFESSOR");
            roleRepository.save(professorRole);
            logger.info("PROFESSOR role added.");
        }

        if (roleRepository.findByName("STUDENT").isEmpty()) {
            Role studentRole = new Role();
            studentRole.setName("STUDENT");
            roleRepository.save(studentRole);
            logger.info("STUDENT role added.");
        }
    }
}

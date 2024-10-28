package com.monaco.peer_assessment_backend.service.impl;


import org.springframework.boot.context.properties.ConfigurationProperties;

import java.nio.file.Path;
import java.nio.file.Paths;

@ConfigurationProperties("storage")
public class StorageProperties {

    /**
     * Folder location for storing files
     */
    // private String location = "src/main/resources/studentFiles";
    private String location = String.valueOf(getResourcePath("studentFiles"));

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    public static Path getResourcePath(String folderName) {
        Path path = Paths.get("peer-assessment-backend/src/main/resources", folderName);

        // If path doesn't exist, try the alternative path
        if (!path.toFile().exists()) {
            path = Paths.get("src/main/resources", folderName);
        }
        return path;
    }

}
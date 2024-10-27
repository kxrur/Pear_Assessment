package com.monaco.peer_assessment_backend.service.impl;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class StorageProperties {

  /**
   * Folder location for storing files
   */
  private String location = "src/main/resources/studentFiles";

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

}

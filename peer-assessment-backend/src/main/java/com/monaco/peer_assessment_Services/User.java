package com.monaco.peer_assessment_Services;

import org.hibernate.query.sql.internal.ParameterRecognizerImpl;

public class User {
    private int id;
    private String firstName;
    private String Lastname;
    private String password;

    public  User(){
    }
    public User(int id, String firstName, String lastname) {
        this.id = id;
        this.firstName = firstName;
        Lastname = lastname;
        this.password = "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastname() {
        return Lastname;
    }

    public void setLastname(String lastname) {
        Lastname = lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

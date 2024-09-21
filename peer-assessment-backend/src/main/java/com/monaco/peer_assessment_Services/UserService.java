package com.monaco.peer_assessment_Services;

import java.util.List;

public interface UserService {
    public User createUser(User  newUser);
    public User getUserById(int id);
    public List<User> getAllUsers();
    public User updateUser(int id, User newUser);
    public User deleteUser(int id);
}
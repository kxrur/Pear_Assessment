package com.monaco.peer_assessment_backend.controller;


import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.monaco.peer_assessment_backend.dto.StudentDTO;
import com.monaco.peer_assessment_backend.service.impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.monaco.peer_assessment_backend.exception.StorageFileNotFoundException;
import com.monaco.peer_assessment_backend.service.StorageService;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")

public class FileController {
    private final StorageService storageService;

    @GetMapping("/upload/a")
    public String listUploadedFiles(Model model) throws IOException {

        model.addAttribute("files", storageService.loadAll().map(
                        path -> MvcUriComponentsBuilder.fromMethodName(FileController.class,
                                "serveFile", path.getFileName().toString()).build().toUri().toString())
                .collect(Collectors.toList()));

        return "uploadForm";
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);

        if (file == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
    /*
    case 0 -> new ResponseEntity<>("No users have been added", HttpStatus.resolve(401));
    case 1 -> new ResponseEntity<>("All users have been added", HttpStatus.resolve(201));
    case 2 -> new ResponseEntity<>("Some users have been added", HttpStatus.resolve(203));
    default -> new ResponseEntity<>("Error adding users", HttpStatus.BAD_REQUEST);
     */
    @PostMapping("/upload/students")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file,
                                              RedirectAttributes redirectAttributes) {
        storageService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");
        validStudentsEntity uploadEntity = parseStudents(file.getOriginalFilename());
        return switch (uploadEntity.getAnswer()) {
            case 0 -> new ResponseEntity<>(uploadEntity.getAddedStudents(), HttpStatus.valueOf(401));
            case 1 -> new ResponseEntity<>(uploadEntity.getAddedStudents(), HttpStatus.valueOf(201));
            case 2 -> new ResponseEntity<>(uploadEntity.getAddedStudents(), HttpStatus.valueOf(203));
            default -> new ResponseEntity<>(uploadEntity.getAddedStudents(), HttpStatus.BAD_REQUEST);
        };
    }

    private UserServiceImpl userService;

    public validStudentsEntity parseStudents(String fileName) {
        Path fileToCheck = storageService.load(fileName);
        int nbCorrect = 0, nbErrors = 0;
        List<StudentDTO> validStudents = new ArrayList<>();
        List<StudentDTO> addedStudents = new ArrayList<>();


        try (BufferedReader reader = Files.newBufferedReader(fileToCheck)) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");

                if (fields.length != 3) {
                    // Skip this line as it's not properly formatted
                    nbErrors++;
                    continue;
                }

                String firstName = fields[0].trim();
                String lastName = fields[1].trim();
                int studentId;

                try {
                    studentId = Integer.parseInt(fields[2].trim());

                    // Validate that studentId is not negative
                    if (studentId < 0) {
                        nbErrors++;
                        continue;  // Skip invalid entry
                    }
                    // If all checks pass, create a Student object
                    StudentDTO studentToAdd = new StudentDTO(0L,firstName,lastName, Collections.singleton("STUDENT"),true, studentId);
                    validStudents.add(studentToAdd);
                    nbCorrect++;

                } catch (NumberFormatException e) {
                    // If studentId is not a valid integer, skip
                    nbErrors++;
                }
            }

            // Save all valid students to the database in one go
            for (StudentDTO tempStudent : validStudents) {
                try {
                 StudentDTO newStudent = userService.registerStudent(tempStudent);
                 addedStudents.add(newStudent);
                    System.out.println("adding"+ newStudent);
                }
                catch(Exception e){
                    nbErrors++;
                    e.printStackTrace();
                }

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        if (nbCorrect == 0)
            return new validStudentsEntity(addedStudents,0);
        if (nbErrors == 0)
            return new validStudentsEntity(addedStudents,1);

        return new validStudentsEntity(addedStudents,2);
    }


    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
}
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
class validStudentsEntity{
    List<StudentDTO> addedStudents;
    int answer;

}

package com.mycompany.myapp.domain.own;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "professors")
@Getter
@Setter
@ToString
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private String title;
    @ManyToMany(mappedBy = "professorSet")
    private Set<Student> studentSet;

    public Professor() {
    }

    public Professor(String name, String surname, String title) {
        this.name = name;
        this.surname = surname;
        this.title = title;
    }
}

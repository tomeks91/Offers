package com.mycompany.myapp.domain.own;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "students")
@Getter
@Setter
@ToString
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private String groupNumber;
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Professor> professorSet;

    @OneToOne
    private Backpack backpack;

    public Student() {
    }

    public Student(String name, String surname, String groupNumber) {
        this.name = name;
        this.surname = surname;
        this.groupNumber = groupNumber;
    }
}

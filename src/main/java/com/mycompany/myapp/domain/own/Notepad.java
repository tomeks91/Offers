package com.mycompany.myapp.domain.own;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "notepads")
@Getter
@Setter
@ToString
public class Notepad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @ManyToOne
    private Backpack backpack;


    public Notepad() {
    }

    public Notepad(String title) {
        this.title = title;
    }
}

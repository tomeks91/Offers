package com.mycompany.myapp.domain.own;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "backpacks")
@Getter
@Setter
@ToString
public class Backpack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mark;

    @OneToMany(mappedBy = "backpack")
    private Set<Notepad> notepadSet;

    @OneToOne(mappedBy = "backpack")
    private Student student;

    public Backpack() {
    }

    public Backpack(String mark) {
        this.mark = mark;
    }

    public void addNotepad(Notepad notepad){
        if(notepadSet == null){
            notepadSet = new HashSet<>();
        }
        notepadSet.add(notepad);
        notepad.setBackpack(this);
    }
}

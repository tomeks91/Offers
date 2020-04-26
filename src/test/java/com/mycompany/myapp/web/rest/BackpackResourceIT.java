package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.FirstJhippsterApp;
import com.mycompany.myapp.domain.Backpack;
import com.mycompany.myapp.repository.BackpackRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BackpackResource} REST controller.
 */
@SpringBootTest(classes = FirstJhippsterApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class BackpackResourceIT {

    private static final String DEFAULT_MARK = "AAAAAAAAAA";
    private static final String UPDATED_MARK = "BBBBBBBBBB";

    @Autowired
    private BackpackRepository backpackRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBackpackMockMvc;

    private Backpack backpack;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Backpack createEntity(EntityManager em) {
        Backpack backpack = new Backpack()
            .mark(DEFAULT_MARK);
        return backpack;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Backpack createUpdatedEntity(EntityManager em) {
        Backpack backpack = new Backpack()
            .mark(UPDATED_MARK);
        return backpack;
    }

    @BeforeEach
    public void initTest() {
        backpack = createEntity(em);
    }

    @Test
    @Transactional
    public void createBackpack() throws Exception {
        int databaseSizeBeforeCreate = backpackRepository.findAll().size();

        // Create the Backpack
        restBackpackMockMvc.perform(post("/api/backpacks").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(backpack)))
            .andExpect(status().isCreated());

        // Validate the Backpack in the database
        List<Backpack> backpackList = backpackRepository.findAll();
        assertThat(backpackList).hasSize(databaseSizeBeforeCreate + 1);
        Backpack testBackpack = backpackList.get(backpackList.size() - 1);
        assertThat(testBackpack.getMark()).isEqualTo(DEFAULT_MARK);
    }

    @Test
    @Transactional
    public void createBackpackWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = backpackRepository.findAll().size();

        // Create the Backpack with an existing ID
        backpack.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBackpackMockMvc.perform(post("/api/backpacks").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(backpack)))
            .andExpect(status().isBadRequest());

        // Validate the Backpack in the database
        List<Backpack> backpackList = backpackRepository.findAll();
        assertThat(backpackList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBackpacks() throws Exception {
        // Initialize the database
        backpackRepository.saveAndFlush(backpack);

        // Get all the backpackList
        restBackpackMockMvc.perform(get("/api/backpacks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(backpack.getId().intValue())))
            .andExpect(jsonPath("$.[*].mark").value(hasItem(DEFAULT_MARK)));
    }
    
    @Test
    @Transactional
    public void getBackpack() throws Exception {
        // Initialize the database
        backpackRepository.saveAndFlush(backpack);

        // Get the backpack
        restBackpackMockMvc.perform(get("/api/backpacks/{id}", backpack.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(backpack.getId().intValue()))
            .andExpect(jsonPath("$.mark").value(DEFAULT_MARK));
    }

    @Test
    @Transactional
    public void getNonExistingBackpack() throws Exception {
        // Get the backpack
        restBackpackMockMvc.perform(get("/api/backpacks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBackpack() throws Exception {
        // Initialize the database
        backpackRepository.saveAndFlush(backpack);

        int databaseSizeBeforeUpdate = backpackRepository.findAll().size();

        // Update the backpack
        Backpack updatedBackpack = backpackRepository.findById(backpack.getId()).get();
        // Disconnect from session so that the updates on updatedBackpack are not directly saved in db
        em.detach(updatedBackpack);
        updatedBackpack
            .mark(UPDATED_MARK);

        restBackpackMockMvc.perform(put("/api/backpacks").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBackpack)))
            .andExpect(status().isOk());

        // Validate the Backpack in the database
        List<Backpack> backpackList = backpackRepository.findAll();
        assertThat(backpackList).hasSize(databaseSizeBeforeUpdate);
        Backpack testBackpack = backpackList.get(backpackList.size() - 1);
        assertThat(testBackpack.getMark()).isEqualTo(UPDATED_MARK);
    }

    @Test
    @Transactional
    public void updateNonExistingBackpack() throws Exception {
        int databaseSizeBeforeUpdate = backpackRepository.findAll().size();

        // Create the Backpack

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBackpackMockMvc.perform(put("/api/backpacks").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(backpack)))
            .andExpect(status().isBadRequest());

        // Validate the Backpack in the database
        List<Backpack> backpackList = backpackRepository.findAll();
        assertThat(backpackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBackpack() throws Exception {
        // Initialize the database
        backpackRepository.saveAndFlush(backpack);

        int databaseSizeBeforeDelete = backpackRepository.findAll().size();

        // Delete the backpack
        restBackpackMockMvc.perform(delete("/api/backpacks/{id}", backpack.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Backpack> backpackList = backpackRepository.findAll();
        assertThat(backpackList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

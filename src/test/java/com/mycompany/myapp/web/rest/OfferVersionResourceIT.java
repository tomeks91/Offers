package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.FirstJhippsterApp;
import com.mycompany.myapp.domain.OfferVersion;
import com.mycompany.myapp.repository.OfferVersionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OfferVersionResource} REST controller.
 */
@SpringBootTest(classes = FirstJhippsterApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class OfferVersionResourceIT {

    private static final Boolean DEFAULT_READ = false;
    private static final Boolean UPDATED_READ = true;

    private static final Boolean DEFAULT_FAVORITE = false;
    private static final Boolean UPDATED_FAVORITE = true;

    private static final Boolean DEFAULT_AVAILABLE = false;
    private static final Boolean UPDATED_AVAILABLE = true;

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_DETAILS_HTML = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS_HTML = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private OfferVersionRepository offerVersionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOfferVersionMockMvc;

    private OfferVersion offerVersion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OfferVersion createEntity(EntityManager em) {
        OfferVersion offerVersion = new OfferVersion()
            .read(DEFAULT_READ)
            .favorite(DEFAULT_FAVORITE)
            .available(DEFAULT_AVAILABLE)
            .link(DEFAULT_LINK)
            .detailsHtml(DEFAULT_DETAILS_HTML)
            .description(DEFAULT_DESCRIPTION);
        return offerVersion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OfferVersion createUpdatedEntity(EntityManager em) {
        OfferVersion offerVersion = new OfferVersion()
            .read(UPDATED_READ)
            .favorite(UPDATED_FAVORITE)
            .available(UPDATED_AVAILABLE)
            .link(UPDATED_LINK)
            .detailsHtml(UPDATED_DETAILS_HTML)
            .description(UPDATED_DESCRIPTION);
        return offerVersion;
    }

    @BeforeEach
    public void initTest() {
        offerVersion = createEntity(em);
    }

    @Test
    @Transactional
    public void createOfferVersion() throws Exception {
        int databaseSizeBeforeCreate = offerVersionRepository.findAll().size();

        // Create the OfferVersion
        restOfferVersionMockMvc.perform(post("/api/offer-versions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(offerVersion)))
            .andExpect(status().isCreated());

        // Validate the OfferVersion in the database
        List<OfferVersion> offerVersionList = offerVersionRepository.findAll();
        assertThat(offerVersionList).hasSize(databaseSizeBeforeCreate + 1);
        OfferVersion testOfferVersion = offerVersionList.get(offerVersionList.size() - 1);
        assertThat(testOfferVersion.isRead()).isEqualTo(DEFAULT_READ);
        assertThat(testOfferVersion.isFavorite()).isEqualTo(DEFAULT_FAVORITE);
        assertThat(testOfferVersion.isAvailable()).isEqualTo(DEFAULT_AVAILABLE);
        assertThat(testOfferVersion.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testOfferVersion.getDetailsHtml()).isEqualTo(DEFAULT_DETAILS_HTML);
        assertThat(testOfferVersion.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createOfferVersionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = offerVersionRepository.findAll().size();

        // Create the OfferVersion with an existing ID
        offerVersion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfferVersionMockMvc.perform(post("/api/offer-versions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(offerVersion)))
            .andExpect(status().isBadRequest());

        // Validate the OfferVersion in the database
        List<OfferVersion> offerVersionList = offerVersionRepository.findAll();
        assertThat(offerVersionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOfferVersions() throws Exception {
        // Initialize the database
        offerVersionRepository.saveAndFlush(offerVersion);

        // Get all the offerVersionList
        restOfferVersionMockMvc.perform(get("/api/offer-versions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offerVersion.getId().intValue())))
            .andExpect(jsonPath("$.[*].read").value(hasItem(DEFAULT_READ.booleanValue())))
            .andExpect(jsonPath("$.[*].favorite").value(hasItem(DEFAULT_FAVORITE.booleanValue())))
            .andExpect(jsonPath("$.[*].available").value(hasItem(DEFAULT_AVAILABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK)))
            .andExpect(jsonPath("$.[*].detailsHtml").value(hasItem(DEFAULT_DETAILS_HTML.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getOfferVersion() throws Exception {
        // Initialize the database
        offerVersionRepository.saveAndFlush(offerVersion);

        // Get the offerVersion
        restOfferVersionMockMvc.perform(get("/api/offer-versions/{id}", offerVersion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(offerVersion.getId().intValue()))
            .andExpect(jsonPath("$.read").value(DEFAULT_READ.booleanValue()))
            .andExpect(jsonPath("$.favorite").value(DEFAULT_FAVORITE.booleanValue()))
            .andExpect(jsonPath("$.available").value(DEFAULT_AVAILABLE.booleanValue()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK))
            .andExpect(jsonPath("$.detailsHtml").value(DEFAULT_DETAILS_HTML.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOfferVersion() throws Exception {
        // Get the offerVersion
        restOfferVersionMockMvc.perform(get("/api/offer-versions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOfferVersion() throws Exception {
        // Initialize the database
        offerVersionRepository.saveAndFlush(offerVersion);

        int databaseSizeBeforeUpdate = offerVersionRepository.findAll().size();

        // Update the offerVersion
        OfferVersion updatedOfferVersion = offerVersionRepository.findById(offerVersion.getId()).get();
        // Disconnect from session so that the updates on updatedOfferVersion are not directly saved in db
        em.detach(updatedOfferVersion);
        updatedOfferVersion
            .read(UPDATED_READ)
            .favorite(UPDATED_FAVORITE)
            .available(UPDATED_AVAILABLE)
            .link(UPDATED_LINK)
            .detailsHtml(UPDATED_DETAILS_HTML)
            .description(UPDATED_DESCRIPTION);

        restOfferVersionMockMvc.perform(put("/api/offer-versions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOfferVersion)))
            .andExpect(status().isOk());

        // Validate the OfferVersion in the database
        List<OfferVersion> offerVersionList = offerVersionRepository.findAll();
        assertThat(offerVersionList).hasSize(databaseSizeBeforeUpdate);
        OfferVersion testOfferVersion = offerVersionList.get(offerVersionList.size() - 1);
        assertThat(testOfferVersion.isRead()).isEqualTo(UPDATED_READ);
        assertThat(testOfferVersion.isFavorite()).isEqualTo(UPDATED_FAVORITE);
        assertThat(testOfferVersion.isAvailable()).isEqualTo(UPDATED_AVAILABLE);
        assertThat(testOfferVersion.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testOfferVersion.getDetailsHtml()).isEqualTo(UPDATED_DETAILS_HTML);
        assertThat(testOfferVersion.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingOfferVersion() throws Exception {
        int databaseSizeBeforeUpdate = offerVersionRepository.findAll().size();

        // Create the OfferVersion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOfferVersionMockMvc.perform(put("/api/offer-versions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(offerVersion)))
            .andExpect(status().isBadRequest());

        // Validate the OfferVersion in the database
        List<OfferVersion> offerVersionList = offerVersionRepository.findAll();
        assertThat(offerVersionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOfferVersion() throws Exception {
        // Initialize the database
        offerVersionRepository.saveAndFlush(offerVersion);

        int databaseSizeBeforeDelete = offerVersionRepository.findAll().size();

        // Delete the offerVersion
        restOfferVersionMockMvc.perform(delete("/api/offer-versions/{id}", offerVersion.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OfferVersion> offerVersionList = offerVersionRepository.findAll();
        assertThat(offerVersionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

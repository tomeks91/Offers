package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.OfferVersion;
import com.mycompany.myapp.repository.OfferVersionRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.OfferVersion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OfferVersionResource {

    private final Logger log = LoggerFactory.getLogger(OfferVersionResource.class);

    private static final String ENTITY_NAME = "offerVersion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OfferVersionRepository offerVersionRepository;

    public OfferVersionResource(OfferVersionRepository offerVersionRepository) {
        this.offerVersionRepository = offerVersionRepository;
    }

    /**
     * {@code POST  /offer-versions} : Create a new offerVersion.
     *
     * @param offerVersion the offerVersion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new offerVersion, or with status {@code 400 (Bad Request)} if the offerVersion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/offer-versions")
    public ResponseEntity<OfferVersion> createOfferVersion(@RequestBody OfferVersion offerVersion) throws URISyntaxException {
        log.debug("REST request to save OfferVersion : {}", offerVersion);
        if (offerVersion.getId() != null) {
            throw new BadRequestAlertException("A new offerVersion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OfferVersion result = offerVersionRepository.save(offerVersion);
        return ResponseEntity.created(new URI("/api/offer-versions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /offer-versions} : Updates an existing offerVersion.
     *
     * @param offerVersion the offerVersion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated offerVersion,
     * or with status {@code 400 (Bad Request)} if the offerVersion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the offerVersion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/offer-versions")
    public ResponseEntity<OfferVersion> updateOfferVersion(@RequestBody OfferVersion offerVersion) throws URISyntaxException {
        log.debug("REST request to update OfferVersion : {}", offerVersion);
        if (offerVersion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OfferVersion result = offerVersionRepository.save(offerVersion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, offerVersion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /offer-versions} : get all the offerVersions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of offerVersions in body.
     */
    @GetMapping("/offer-versions")
    public List<OfferVersion> getAllOfferVersions() {
        log.debug("REST request to get all OfferVersions");
        return offerVersionRepository.findAll();
    }

    /**
     * {@code GET  /offer-versions/:id} : get the "id" offerVersion.
     *
     * @param id the id of the offerVersion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the offerVersion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/offer-versions/{id}")
    public ResponseEntity<OfferVersion> getOfferVersion(@PathVariable Long id) {
        log.debug("REST request to get OfferVersion : {}", id);
        Optional<OfferVersion> offerVersion = offerVersionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(offerVersion);
    }

    /**
     * {@code DELETE  /offer-versions/:id} : delete the "id" offerVersion.
     *
     * @param id the id of the offerVersion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/offer-versions/{id}")
    public ResponseEntity<Void> deleteOfferVersion(@PathVariable Long id) {
        log.debug("REST request to delete OfferVersion : {}", id);
        offerVersionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code GET  /offer-versions} : get all the offerVersions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of offerVersions in body.
     */
    @GetMapping("/offer-versions-interesting")
    public List<OfferVersion> getAllOfferVersionsInteresting() {
        log.debug("REST request to get all OfferVersions");
        return offerVersionRepository.findByFavoriteTrueAndAvailableTrue();
    }

    /**
     * {@code GET  /offer-versions} : get all the offerVersions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of offerVersions in body.
     */
    @GetMapping("/offer-versions-interesting-not-active")
    public List<OfferVersion> getAllOfferVersionsInterestingNotActive() {
        log.debug("REST request to get all OfferVersions");
        return offerVersionRepository.findByFavoriteTrueAndAvailableFalse();
    }

    /**
     * {@code GET  /offer-versions} : get all the offerVersions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of offerVersions in body.
     */
    @GetMapping("/offer-versions-not-interesting")
    public List<OfferVersion> getAllOfferVersionsNotInteresting() {
        log.debug("REST request to get all OfferVersions");
        return offerVersionRepository.findByFavoriteFalseAndReadTrueAndAvailableTrue();
    }

    /**
     * {@code GET  /offer-versions} : get all the offerVersions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of offerVersions in body.
     */
    @GetMapping("/offer-versions-not-interesting-not-active")
    public List<OfferVersion> getAllOfferVersionsNotInterestingNotActive() {
        log.debug("REST request to get all OfferVersions");
        return offerVersionRepository.findByFavoriteFalseAndReadTrueAndAvailableFalse();
    }

    /**
     * {@code GET  /offer-versions} : get all the offerVersions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of offerVersions in body.
     */
    @GetMapping("/offer-versions-not-read")
    public List<OfferVersion> getAllOfferVersionsNotRead() {
        log.debug("REST request to get all OfferVersions");
        return offerVersionRepository.findByFavoriteFalseAndReadFalseAndAvailableTrue();
    }

    /**
     * {@code GET  /offer-versions} : get all the offerVersions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of offerVersions in body.
     */
    @GetMapping("/offer-versions-not-read-not-active")
    public List<OfferVersion> getAllOfferVersionsNotReadNotActive() {
        log.debug("REST request to get all OfferVersions");
        return offerVersionRepository.findByFavoriteFalseAndReadFalseAndAvailableFalse();
    }
}

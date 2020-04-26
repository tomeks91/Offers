package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Backpack;
import com.mycompany.myapp.repository.BackpackRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Backpack}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BackpackResource {

    private final Logger log = LoggerFactory.getLogger(BackpackResource.class);

    private static final String ENTITY_NAME = "backpack";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BackpackRepository backpackRepository;

    public BackpackResource(BackpackRepository backpackRepository) {
        this.backpackRepository = backpackRepository;
    }

    /**
     * {@code POST  /backpacks} : Create a new backpack.
     *
     * @param backpack the backpack to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new backpack, or with status {@code 400 (Bad Request)} if the backpack has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/backpacks")
    public ResponseEntity<Backpack> createBackpack(@RequestBody Backpack backpack) throws URISyntaxException {
        log.debug("REST request to save Backpack : {}", backpack);
        if (backpack.getId() != null) {
            throw new BadRequestAlertException("A new backpack cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Backpack result = backpackRepository.save(backpack);
        return ResponseEntity.created(new URI("/api/backpacks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /backpacks} : Updates an existing backpack.
     *
     * @param backpack the backpack to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated backpack,
     * or with status {@code 400 (Bad Request)} if the backpack is not valid,
     * or with status {@code 500 (Internal Server Error)} if the backpack couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/backpacks")
    public ResponseEntity<Backpack> updateBackpack(@RequestBody Backpack backpack) throws URISyntaxException {
        log.debug("REST request to update Backpack : {}", backpack);
        if (backpack.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Backpack result = backpackRepository.save(backpack);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, backpack.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /backpacks} : get all the backpacks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of backpacks in body.
     */
    @GetMapping("/backpacks")
    public List<Backpack> getAllBackpacks() {
        log.debug("REST request to get all Backpacks");
        return backpackRepository.findAll();
    }

    /**
     * {@code GET  /backpacks/:id} : get the "id" backpack.
     *
     * @param id the id of the backpack to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the backpack, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/backpacks/{id}")
    public ResponseEntity<Backpack> getBackpack(@PathVariable Long id) {
        log.debug("REST request to get Backpack : {}", id);
        Optional<Backpack> backpack = backpackRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(backpack);
    }

    /**
     * {@code DELETE  /backpacks/:id} : delete the "id" backpack.
     *
     * @param id the id of the backpack to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/backpacks/{id}")
    public ResponseEntity<Void> deleteBackpack(@PathVariable Long id) {
        log.debug("REST request to delete Backpack : {}", id);
        backpackRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

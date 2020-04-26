package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Backpack;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Backpack entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BackpackRepository extends JpaRepository<Backpack, Long> {
}

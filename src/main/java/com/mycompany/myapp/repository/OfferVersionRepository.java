package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OfferVersion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the OfferVersion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferVersionRepository extends JpaRepository<OfferVersion, Long> {
    List<OfferVersion> findByFavoriteTrueAndAvailableTrue();
    List<OfferVersion> findByFavoriteTrueAndAvailableFalse();
    List<OfferVersion> findByFavoriteFalseAndReadFalseAndAvailableTrue();
    List<OfferVersion> findByFavoriteFalseAndReadFalseAndAvailableFalse();
    List<OfferVersion> findByFavoriteFalseAndReadTrueAndAvailableTrue();
    List<OfferVersion> findByFavoriteFalseAndReadTrueAndAvailableFalse();
}

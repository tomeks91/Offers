package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Offer.
 */
@Entity
@Table(name = "offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "unique_id")
    private String uniqueId;

    @OneToMany(mappedBy = "offer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OfferVersion> versions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Offer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public Offer uniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
        return this;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public Set<OfferVersion> getVersions() {
        return versions;
    }

    public Offer versions(Set<OfferVersion> offerVersions) {
        this.versions = offerVersions;
        return this;
    }

    public Offer addVersions(OfferVersion offerVersion) {
        this.versions.add(offerVersion);
        offerVersion.setOffer(this);
        return this;
    }

    public Offer removeVersions(OfferVersion offerVersion) {
        this.versions.remove(offerVersion);
        offerVersion.setOffer(null);
        return this;
    }

    public void setVersions(Set<OfferVersion> offerVersions) {
        this.versions = offerVersions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Offer)) {
            return false;
        }
        return id != null && id.equals(((Offer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Offer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", uniqueId='" + getUniqueId() + "'" +
            "}";
    }
}

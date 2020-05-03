package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.*;
import org.hibernate.annotations.Cache;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A OfferVersion.
 */
@Entity
@Table(name = "offer_version")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OfferVersion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "read")
    private Boolean read;

    @Column(name = "favorite")
    private Boolean favorite;

    @Column(name = "available")
    private Boolean available;

    @Column(name = "link")
    private String link;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "details_html")
    private String detailsHtml;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description")
    private String description;

    @OneToOne(mappedBy = "versions")
    @JsonIgnoreProperties("versions")
    private Offer offer;

    @OneToMany(mappedBy = "offerVersion", fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @NotFound(action = NotFoundAction.IGNORE)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isRead() {
        return read;
    }

    public OfferVersion read(Boolean read) {
        this.read = read;
        return this;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public Boolean isFavorite() {
        return favorite;
    }

    public OfferVersion favorite(Boolean favorite) {
        this.favorite = favorite;
        return this;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public Boolean isAvailable() {
        return available;
    }

    public OfferVersion available(Boolean available) {
        this.available = available;
        return this;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getLink() {
        return link;
    }

    public OfferVersion link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDetailsHtml() {
        return detailsHtml;
    }

    public OfferVersion detailsHtml(String detailsHtml) {
        this.detailsHtml = detailsHtml;
        return this;
    }

    public void setDetailsHtml(String detailsHtml) {
        this.detailsHtml = detailsHtml;
    }

    public String getDescription() {
        return description;
    }

    public OfferVersion description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Image> getImages() {
        return images;
    }

    public OfferVersion images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public OfferVersion addImages(Image image) {
        this.images.add(image);
        image.setOfferVersion(this);
        return this;
    }

    public OfferVersion removeImages(Image image) {
        this.images.remove(image);
        image.setOfferVersion(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Offer getOffer() {
        return offer;
    }

    public OfferVersion offer(Offer offer) {
        this.offer = offer;
        return this;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OfferVersion)) {
            return false;
        }
        return id != null && id.equals(((OfferVersion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OfferVersion{" +
            "id=" + getId() +
            ", read='" + isRead() + "'" +
            ", favorite='" + isFavorite() + "'" +
            ", available='" + isAvailable() + "'" +
            ", link='" + getLink() + "'" +
            ", detailsHtml='" + getDetailsHtml() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}

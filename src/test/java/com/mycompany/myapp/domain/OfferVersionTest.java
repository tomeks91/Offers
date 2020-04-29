package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class OfferVersionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OfferVersion.class);
        OfferVersion offerVersion1 = new OfferVersion();
        offerVersion1.setId(1L);
        OfferVersion offerVersion2 = new OfferVersion();
        offerVersion2.setId(offerVersion1.getId());
        assertThat(offerVersion1).isEqualTo(offerVersion2);
        offerVersion2.setId(2L);
        assertThat(offerVersion1).isNotEqualTo(offerVersion2);
        offerVersion1.setId(null);
        assertThat(offerVersion1).isNotEqualTo(offerVersion2);
    }
}

package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class BackpackTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Backpack.class);
        Backpack backpack1 = new Backpack();
        backpack1.setId(1L);
        Backpack backpack2 = new Backpack();
        backpack2.setId(backpack1.getId());
        assertThat(backpack1).isEqualTo(backpack2);
        backpack2.setId(2L);
        assertThat(backpack1).isNotEqualTo(backpack2);
        backpack1.setId(null);
        assertThat(backpack1).isNotEqualTo(backpack2);
    }
}

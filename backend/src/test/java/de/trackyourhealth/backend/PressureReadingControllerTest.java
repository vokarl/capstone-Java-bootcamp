package de.trackyourhealth.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@SpringBootTest
@AutoConfigureMockMvc
class PressureReadingControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    PressureReadingRepository pressureReadingRepository;
    @DirtiesContext
    @Test
    void getAllReadings() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/blood-pressure"))

                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            []
                        """));
    }
    @Test
    @DirtiesContext
    void addNewPressureReading() throws Exception {
        //GIVEN

        //WHEN
        mockMvc.perform(post("/api/blood-pressure")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
       {
            "date": "21.12.2023",
            "time": "12:30",
            "systolic": 130,
            "diastolic": 80,
            "bpm": 70
       }
       """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.date").value("21.12.2023"))
                .andExpect(jsonPath("$.time").value("12:30"))
                .andExpect(jsonPath("$.systolic").value(130))
                .andExpect(jsonPath("$.diastolic").value("80"))
                .andExpect(jsonPath("$.bpm").value("70"));
    }


}
package de.trackyourhealth.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoUnit;

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
    void getAllReadings_ShouldReturnAllAvailableReadings() throws Exception {
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
    void addNewPressureReading_ShouldReturnCreatedReading() throws Exception {
        // GIVEN
        Instant now = Instant.now();
        String dateTimeString = DateTimeFormatter.ISO_INSTANT.format(now);

        // WHEN
        mockMvc.perform(post("/api/blood-pressure")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.format("""
       {
            "dateTime": "%s",
            "systolic": 130,
            "diastolic": 80,
            "bpm": 70
       }
       """, dateTimeString)))
                // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.dateTime").value(dateTimeString))
                .andExpect(jsonPath("$.systolic").value(130))
                .andExpect(jsonPath("$.diastolic").value(80))
                .andExpect(jsonPath("$.bpm").value(70));
    }
    @Test
    @DirtiesContext
    void getPressureReadingById_ShouldReturnReadingWithId() throws Exception {
        // GIVEN
        Instant now = Instant.now().truncatedTo(ChronoUnit.MILLIS);
        PressureReading newPressureReading = new PressureReading("1", now, 120, 80, 77);
        pressureReadingRepository.save(newPressureReading);

        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .append(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
                .appendLiteral("Z")
                .toFormatter()
                .withZone(ZoneOffset.UTC);

        String formattedDateTime = formatter.format(now);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/blood-pressure/1"))
                // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.dateTime").value(formattedDateTime))
                .andExpect(jsonPath("$.systolic").value(120))
                .andExpect(jsonPath("$.diastolic").value(80))
                .andExpect(jsonPath("$.bpm").value(77));
    }

    @DirtiesContext
    @Test
    void deletePressureReading_shouldReturnHttpNoContent_whenDeleteExistingPressureReading() throws Exception {
     //GIVEN WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/blood-pressure")
                        .contentType("application/json")
                        .content("""
                        {
                            "id": "2024-001",
                            "systolic": 120,
                            "diastolic": 80,
                            "timestamp": "2024-09-09T12:00:00"
                        }
                        """))
                .andExpect(MockMvcResultMatchers.status().isOk());
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/blood-pressure/2024-001")
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @DirtiesContext
    @Test
    void updatePressureReading_shouldUpdateReading_whenOldReadingIsUpdated() throws Exception {
        //GIVEN
        Instant now = Instant.now();
        PressureReading existingPressureReading = new PressureReading("1", now, 120, 80, 77);
        pressureReadingRepository.save(existingPressureReading);

        String nowToString = now.toString();
        String updatedPressureReadingJson = """
            {
             
                "dateTime": "%s",
                "systolic": 125,
                "diastolic": 85,
                "bpm": 75
            }
            """.formatted(nowToString);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/blood-pressure/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedPressureReadingJson))
                //THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.dateTime").value(nowToString))
                .andExpect(jsonPath("$.systolic").value(125))
                .andExpect(jsonPath("$.diastolic").value(85))
                .andExpect(jsonPath("$.bpm").value(75));
    }


}
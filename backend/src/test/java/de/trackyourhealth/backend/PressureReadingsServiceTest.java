package de.trackyourhealth.backend;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import java.util.List;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PressureReadingsServiceTest {
    PressureReadingsRepository pressureReadingsRepository = mock(PressureReadingsRepository.class);
    PressureReadingsService pressureReadingsService = new PressureReadingsService(pressureReadingsRepository);

    @Test
    void findAllReadings() {
        // GIVEN
        LocalDateTime now = LocalDateTime.now();
        PressureReadings r1 = new PressureReadings( now, 120, 70, 80);
        PressureReadings r2 = new PressureReadings( now.plusHours(1), 130, 80, 85);
        PressureReadings r3 = new PressureReadings( now.plusHours(2), 140, 90, 90);
        List<PressureReadings> pressureReadings = List.of(r1, r2, r3);

        when(pressureReadingsRepository.findAll()).thenReturn(pressureReadings);
        //WHEN
        List<PressureReadings> actual = pressureReadingsService.findAllReadings();
        //THEN
        verify(pressureReadingsRepository).findAll();
        assertEquals(pressureReadings, actual);
    }
}
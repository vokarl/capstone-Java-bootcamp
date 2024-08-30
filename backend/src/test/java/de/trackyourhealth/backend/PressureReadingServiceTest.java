package de.trackyourhealth.backend;

import org.junit.jupiter.api.Test;
import java.util.List;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PressureReadingServiceTest {
    IdService idService = mock(IdService.class);
    PressureReadingRepository pressureReadingRepository = mock(PressureReadingRepository.class);
    PressureReadingService pressureReadingService = new PressureReadingService(pressureReadingRepository, idService);


    @Test
    void findAllReadings() {
        // GIVEN

        PressureReading r1 = new PressureReading( idService.randomId(),"8-6-23","12:30", 70, 80, 60);
        PressureReading r2 = new PressureReading( idService.randomId(),"5-3-24" , "11:34", 80, 85, 67);
        PressureReading r3 = new PressureReading( idService.randomId(),"15-3-24" , "10:34", 80, 85, 67);
        List<PressureReading> pressureReadings = List.of(r1, r2, r3);

        when(pressureReadingRepository.findAll()).thenReturn(pressureReadings);
        //WHEN
        List<PressureReading> actual = pressureReadingService.findAllReadings();
        //THEN
        verify(pressureReadingRepository).findAll();
        List<PressureReading> expected = List.of(new PressureReading( idService.randomId(),"8-6-23","12:30", 70, 80, 60), new PressureReading( idService.randomId(),"5-3-24" , "11:34", 80, 85, 67), new PressureReading( idService.randomId(),"15-3-24" , "10:34", 80, 85, 67));
        assertEquals(expected, actual);
    }
}
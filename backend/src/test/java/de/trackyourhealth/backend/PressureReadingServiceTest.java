package de.trackyourhealth.backend;

import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PressureReadingServiceTest {

    PressureReadingRepository pressureReadingRepository = mock(PressureReadingRepository.class);
    PressureReadingService pressureReadingService = new PressureReadingService(pressureReadingRepository);


    @Test
    void findAllReadings() {
        // GIVEN

        PressureReading r1 = new PressureReading( "1","8-6-23","12:30", 70, 80, 60);
        PressureReading r2 = new PressureReading( "2","5-3-24" , "11:34", 80, 85, 67);
        PressureReading r3 = new PressureReading( "3","15-3-24" , "10:34", 80, 85, 67);
        List<PressureReading> pressureReadings = List.of(r1, r2, r3);

        when(pressureReadingRepository.findAll()).thenReturn(pressureReadings);
        //WHEN
        List<PressureReading> actual = pressureReadingService.findAllReadings();
        //THEN
        verify(pressureReadingRepository).findAll();
        List<PressureReading> expected = List.of(new PressureReading( "1","8-6-23","12:30", 70, 80, 60), new PressureReading( "2","5-3-24" , "11:34", 80, 85, 67), new PressureReading( "3","15-3-24" , "10:34", 80, 85, 67));
        assertEquals(expected, actual);
    }
    @Test
    void addPressureReading(){
        // GIVEN
        PressureReading newPressureReading = new PressureReading("1435", "22.1.23","11:10",  130,70,56);
        when(pressureReadingRepository.save(newPressureReading)).thenReturn(newPressureReading);
        //WHEN
        PressureReading actual = pressureReadingService.savePressureReading(newPressureReading);
        //THEN
        verify(pressureReadingRepository).save(newPressureReading);
        assertEquals(newPressureReading, actual);
    }
    @Test
    void findPressureReadingById(){
        //GIVEN
        String id = "1";
        PressureReading pressureReading = new PressureReading("1","22.1.12", "12:20", 120,70,77);
        //WHEN
        when(pressureReadingRepository.findById(id)).thenReturn(Optional.of(pressureReading));
        PressureReading actual = pressureReadingService.findPressureReadingById(id);
        //THEN
        verify(pressureReadingRepository).findById(id);
        assertEquals(pressureReading, actual);
    }
    @Test
    void deleteById() {
        // GIVEN
        String idToDelete = "1";
        // WHEN
        pressureReadingService.deleteById(idToDelete);
        // THEN
        verify(pressureReadingRepository).deleteById(idToDelete);
    }



    @Test
    void updateReading_ShouldUpdateExistingReading() {
        //GIVEN
        String id = "1";
        PressureReading existingReading = new PressureReading(id, "21.12.2023", "12:30", 130, 80, 70);
        PressureDTO updatedDTO = new PressureDTO("22.12.2023", "14:00", 135, 85, 72);

        when(pressureReadingRepository.findById(id)).thenReturn(Optional.of(existingReading));
        when(pressureReadingRepository.save(any(PressureReading.class))).thenReturn(
                new PressureReading(id, "22.12.2023", "14:00", 135, 85, 72)
        );

        //WHEN
        PressureReading updatedReading = pressureReadingService.updateReading(updatedDTO, id);

        //THEN
        verify(pressureReadingRepository).findById(id);
        verify(pressureReadingRepository).save(any(PressureReading.class));

        assertNotNull(updatedReading);
        assertEquals("22.12.2023", updatedReading.date());
        assertEquals("14:00", updatedReading.time());
        assertEquals(135, updatedReading.systolic());
        assertEquals(85, updatedReading.diastolic());
        assertEquals(72, updatedReading.bpm());
    }
    @Test
    void updateReading_ShouldThrowException_WhenReadingNotFound() {
        //GIVEN
        String id = "999";
        PressureDTO updatedDTO = new PressureDTO("22.12.2023", "14:00", 135, 85, 72);

        when(pressureReadingRepository.findById(id)).thenReturn(Optional.empty());

        //WHEN + THEN
        NoSuchElementException exception = assertThrows(NoSuchElementException.class, () -> pressureReadingService.updateReading(updatedDTO, id));

        assertEquals("No reading with id: 999", exception.getMessage());
        verify(pressureReadingRepository).findById(id);
        verify(pressureReadingRepository, never()).save(any(PressureReading.class));
    }

}
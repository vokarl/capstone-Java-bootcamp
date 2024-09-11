package de.trackyourhealth.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class PressureReadingService {

    private final PressureReadingRepository pressureReadingRepository;

    public List<PressureReading> findAllReadings() {
        return pressureReadingRepository.findAll();
    }
    public PressureReading savePressureReading(PressureReading pressureReading) {
        return pressureReadingRepository.save(pressureReading);
    }

    public PressureReading findPressureReadingById(String id) {
        return pressureReadingRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException("Pressure reading with id " + id + " not found!"));
    }
    public void deleteById(String id){
        pressureReadingRepository.deleteById(id);
    }


    public PressureReading updateReading(PressureDTO pressureDTO, String id) {
        PressureReading pressureReading = pressureReadingRepository.findById(id).orElseThrow(()
                    -> new NoSuchElementException(("No reading with id: " + id)))
                .withDate(pressureDTO.date())
                .withTime(pressureDTO.time())
                .withSystolic(pressureDTO.systolic())
                .withDiastolic(pressureDTO.diastolic())
                .withBpm(pressureDTO.bpm());
            return pressureReadingRepository.save(pressureReading);
    }

}

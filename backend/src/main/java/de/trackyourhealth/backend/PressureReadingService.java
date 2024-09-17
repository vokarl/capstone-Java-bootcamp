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

    public PressureReading savePressureReading(PressureDTO pressureDTO) {

        PressureReading pressureReading = new PressureReading(
               null,
                pressureDTO.dateTime(),
                pressureDTO.systolic(),
                pressureDTO.diastolic(),
                pressureDTO.bpm()
        );
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
        PressureReading pressureReading = pressureReadingRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No reading with id: " + id))
                .withDateTime(pressureDTO.dateTime())
                .withSystolic(pressureDTO.systolic())
                .withDiastolic(pressureDTO.diastolic())
                .withBpm(pressureDTO.bpm());
        return pressureReadingRepository.save(pressureReading);
    }

}

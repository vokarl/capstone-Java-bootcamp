package de.trackyourhealth.backend.bloodpressure;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("api/blood-pressure")
public class PressureReadingController {
    private final PressureReadingService pressureReadingService;



    @GetMapping
    List<PressureReading> getAllReadings(){
        return pressureReadingService.findAllReadings();
    }
    @GetMapping("{id}")
    public PressureReading getPressureReadingById(@PathVariable String id){
        return pressureReadingService.findPressureReadingById(id);
    }

    @PostMapping
    public PressureReading addPressureReading(@RequestBody PressureDTO pressureDTO){
        return pressureReadingService.savePressureReading(pressureDTO);
    }
    @DeleteMapping("{id}")
        void delete(@PathVariable String id){
            pressureReadingService.deleteById(id);
    }
    @PutMapping("{id}")
    public PressureReading updatePressureReading(@PathVariable String id, @RequestBody PressureDTO pressureDTO) {
        return pressureReadingService.updateReading(pressureDTO, id);
    }

}

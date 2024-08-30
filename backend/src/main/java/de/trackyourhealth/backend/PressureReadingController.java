package de.trackyourhealth.backend;

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

    @PostMapping
    public PressureReading addPressureReading(@RequestBody NewPressureReading newPressureReading){
        return pressureReadingService.savePressureReading(newPressureReading);
    }

}

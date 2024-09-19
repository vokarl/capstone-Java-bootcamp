package de.trackyourhealth.backend.bloodwork;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/blood-work")
public class BloodWorkController {
    private final BloodWorkService bloodWorkService;

    @GetMapping
    List<BloodWork> getAllValues(){
        return bloodWorkService.findAllValues();
    }
    @GetMapping("{id}")
    public BloodWork getValuesById(@PathVariable String id){
        return bloodWorkService.findValuesById(id);
    }
    @PostMapping
    public BloodWork addBloodValue(@RequestBody BloodWorkDTO bloodWorkDTO){
        return bloodWorkService.saveBloodWork(bloodWorkDTO);
    }
    @DeleteMapping("{id}")
    void delete(@PathVariable String id){
        bloodWorkService.deleteById(id);
        }

    @PutMapping("{id}")
        public BloodWork updateValues(@PathVariable String id, @RequestBody BloodWorkDTO bloodWorkDTO){
            return bloodWorkService.updateValues(bloodWorkDTO, id);

    }
}


package de.trackyourhealth.backend.bloodwork;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class BloodWorkService {
    private final BloodWorkRepository bloodWorkRepository;

    public List<BloodWork> findAllValues(){
        return bloodWorkRepository.findAll();
    }
    public BloodWork findValuesById(String id){
        return bloodWorkRepository.findById(id).orElseThrow(()-> new NoSuchElementException("No Blood values found"));

    }
    public BloodWork saveBloodWork(BloodWorkDTO bloodWorkDTO){
        BloodWork bloodWork = new BloodWork(
                null,
                bloodWorkDTO.dateTime(),
                bloodWorkDTO.gfr(),
                bloodWorkDTO.crp()
        );
        return bloodWorkRepository.save(bloodWork);
    }
    public void deleteById(String id){
        bloodWorkRepository.deleteById(id);
    }
    public BloodWork updateValues (BloodWorkDTO bloodWorkDTO, String id){
        BloodWork bloodWork = bloodWorkRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException("No Value found with id: " + id))
                .withDateTime(bloodWorkDTO.dateTime())
                .withGfr(bloodWorkDTO.gfr())
                .withCrp(bloodWorkDTO.crp());
        return bloodWorkRepository.save(bloodWork);
    }

}

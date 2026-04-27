import EligibilityCard from "./cards/EligibilityCard";
import SuggestionCard from "./cards/SuggestionCard";
import PlannerCard from "./cards/PlannerCard";
import TravelCard from "./cards/TravelCard";

export default function ResultSection({ result }) {

  
  return (
    <>
      {result && (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <EligibilityCard data={result.eligibility} />
          <SuggestionCard data={result.suggestion} />
          <TravelCard data={result.travel} />
          <PlannerCard
            data={result.planner}
            eligibility={result.rawEligibility} // ✅ MUST be this
          />
          
        </div>
        
      )}
     
    </>
  );
}